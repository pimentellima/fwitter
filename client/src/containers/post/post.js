import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import 'moment/locale/pt-br';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserImg from '../../components/img/userImg';
import UserInfo from '../../components/userInfo';
import { AuthContext } from '../../contexts/authContext';
import { deletePost, getPostById } from '../../services/singleService';
import { getUserById } from '../../services/userService';
import { baseURL } from '../../utils/constants';
import PostActions from "./postActions";

const Post = ({ postObj, type }) => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { 
        id,
        user_id, 
        parent_id,
        ingredients,
        description,
        date, 
        title, 
        file,
        share_user_id
    } = postObj;

    const { data: user, isFetched: isFetchedUser } = useQuery(
        ['postUser', { id }], () => getUserById(user_id)
    );

    const { data: parentUser, isFetched: isFetchedParentUser} = useQuery(
        ['postUser', { id: parent_id }], () => 
        getPostById(parent_id).then(post => 
            getUserById(post.user_id)), 
        {
            enabled: !!parent_id
        }
    )

    const { data: shareUser, isFetched: isFetchedShare } = useQuery(
        ['postUserShare', { id }], () => getUserById(share_user_id),{
            enabled: !!share_user_id
        }
    );

    const deleteMutation = useMutation(
        () => deletePost(id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                queryClient.invalidateQueries(['profilePosts']);
                queryClient.invalidateQueries(['postComments', { parent_id }]);
            }
        }
    )

    const handleRemove = (e) => {
        e.stopPropagation();
        deleteMutation.mutate();
    }

    const handleUserClick = (e, user) => {
        e.stopPropagation();
        navigate('/' + user.username)
    }

    return (
        <div className='flex flex-col pt-2 pr-3 hover:backdrop-brightness-110
                        hover:cursor-pointer'>
            {isFetchedShare && shareUser && 
                <p onClick={(e) => handleUserClick(e, shareUser)} 
                    className='align-middle w-fit text-sm text-stone-400 
                                font-medium ml-4 mb-2 hover:underline'
                    >
                    {`${shareUser.name} refweetou`}
                </p>
            }
            <div className="flex flex-row">
                {isFetchedUser && 
                    <div className="w-20 flex flex-col items-center">  
                        <div className='w-12 h-12'>
                            <UserImg clickable={true} user={user}/>
                        </div>
                        {type === 'thread' && 
                            <div className='h-full'>
                                <div className='w-[2px] rounded-full h-full
                                              bg-stone-400'>
                                </div>
                            </div>
                        }
                    </div>
                }
                <div className="w-full">
                    {isFetchedUser && 
                        <div className='flex justify-between'>
                            <UserInfo user={user} date={date}/>
                            {user.id === currentUser.id && 
                                <button
                                    onClick={(e) => handleRemove(e)}
                                    >
                                    ...
                                </button>
                            }
                        </div>
                    }
                    {parentUser && 
                        <div className='text-sm text-stone-400 '>
                            <p className='inline'>{'Respondendo à '}</p>
                            <p onClick={(e) => handleUserClick(e, parentUser)}
                                className='inline hover:cursor-pointer 
                                hover:underline text-stone-200'
                                >
                                @{parentUser.username}
                            </p>
                        </div>
                    }
                    <p className="text-xl my-1">{title}</p>
                    <div className="flex flex-col">
                        {ingredients && ingredients.length > 0 && 
                            <div className="flex flex-col">
                                <p className="font-medium mt-1">
                                    {'Ingredientes: '}
                                </p>
                                {ingredients.map((ingredient, index) => (
                                    <p key={index} className="inline">  {
                                            ingredient.quantity + " " + 
                                            ingredient.unity + " " + 
                                            ingredient.name
                                        }
                                    </p>
                                ))}
                            </div>
                        }
                        {description && 
                            <div>
                                <p className="font-medium mt-2">
                                    {'Descrição: '}
                                </p>
                                <p>{description}</p>
                            </div>
                        }
                        {file && 
                            <img 
                                className="rounded-xl max-h-[500px] mt-4" 
                                src={baseURL + '/upload/post/' + file} 
                                alt=''
                            />
                        }
                    </div>
                    {isFetchedUser && <PostActions 
                        post_id={id}
                        user={user} 
                        date={date}
                        title={title}
                        />}
                </div>
            </div>
            
        </div>
    )
}

export default Post;