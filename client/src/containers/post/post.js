import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { AuthContext } from '../../contexts/authContext';
import { deletePost, getPostById } from '../../services/postsService';
import { getUserById } from '../../services/userService';
import { baseURL } from '../../utils/constants';
import PostActions from "./postActions";
import WriteComment from '../write/writeComment';

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const Post = ({ postObj }) => {
    const [commentPopup, setCommentPopup] = useState(false);
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
        file
    } = postObj;

    const { data: user, isFetched: isFetchedUser } = useQuery(
        ['postUser', { id }], () => getUserById(user_id)
    );

    const { data: parentUser, isFetched: isFetchedParentUser} = useQuery(
        ['postUser', { id: parent_id }], () => 
        getPostById(parent_id).then(post => 
            getUserById(post.user_id)), {
            enabled: !!parent_id
        }
    )

    const deleteMutation = useMutation(
        () => deletePost(id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                queryClient.invalidateQueries(['profilePosts']);
            }
        }
    )

    const handleUserClick = (e, user) => {
        e.stopPropagation();
        navigate('/' + user.username)
    }

    const renderPostBody = () => (
        <div className="flex flex-col">
            {ingredients && ingredients.length > 0 && <div className="flex flex-col">
                <p className="font-medium mt-1">{'Ingredientes: '}</p>
                {ingredients.map((ingredient, index) => (
                    <p key={index} className="inline">  {
                            ingredient.quantity + " " + 
                            ingredient.unity + " " + 
                            ingredient.name
                        }
                    </p>
                ))}
            </div>}
            {description && <div>
                <p className="font-medium mt-2">{'Descrição: '}</p>
                <p>{description}</p>
            </div>}
            {file && <img 
                className="rounded-xl max-h-[500px] mt-4" 
                src={baseURL + '/upload/post/' + file} 
                alt=''
            />}
        </div>
    )

    const renderUserInfo = () => (
        <div className="flex justify-between">
            <div onClick={(e) => handleUserClick(e, user)} className="flex gap-2 items-center">
                {isFetchedUser && <p className="font-bold hover:underline hover:cursor-pointer">
                    {user.name}
                </p>}
                <div className="hover:cursor-pointer flex flex-row text-sm text-stone-400 gap-1">
                    {isFetchedUser && <p>{'@' + user.username}</p>}
                    <p> 
                        {"· " + moment(date, 'YYYY-MM-DD HH:mm:ss')
                        .fromNow(true)}
                    </p>
                </div>
            </div>
            {isFetchedUser && user.id === currentUser.id && 
                <button
                    onClick={() => deleteMutation.mutate()}
                    >
                    ...
                </button>
            } 
        </div>
    )

    return (
        <div className='border-b border-stone-700'>
            <div className="flex flex-row pt-2 pr-3" key={id}>
                {isFetchedUser && <div className="w-20 flex justify-center">  
                    <img 
                        onClick={(e) => handleUserClick(e, user)}
                        className='w-12 h-12 rounded-[40px] hover:cursor-pointer' 
                        src={baseURL + '/upload/user/' + user.profile_img} 
                        alt=''
                        />
                </div>}
                <div className="w-full">
                    {isFetchedUser && renderUserInfo()}
                    {parentUser && 
                    <div className='text-sm text-stone-400 '>
                        <p className='inline'>{'Respondendo à '}</p>
                        <p className='inline hover:underline text-stone-200' onClick={(e) => handleUserClick(e, parentUser)}>@{parentUser.username}</p>
                    </div>}
                    <p className="text-xl my-1">{title}</p>
                    {renderPostBody()} 
                    <PostActions post_id={id} onClickComment={() => setCommentPopup(true)}/>
                </div>
            </div>
            <Popup
                open={commentPopup}
                onOpen={() => setCommentPopup(true)}
                onClose={() => setCommentPopup(false)}
                {...{overlayStyle}}
                >   
                <div className=' bg-stone-900 rounded-xl py-7 pb-10 px-4 w-[600px]'>
                    <p className="ml-4 mb-4 text-sm">
                        {isFetchedUser ? 'Respondendo à ' + user.name : ''}
                    </p>
                    <div className="flex flex-row pt-2 pr-3">
                        {isFetchedUser && <div className="w-20 flex justify-center">  
                            <img 
                                onClick={(e) => handleUserClick(e)}
                                className='w-12 h-12 rounded-[40px] hover:cursor-pointer' 
                                src={baseURL + '/upload/user/' + user.profile_img} 
                                alt=''
                                />
                        </div>}
                        <div className="w-full">
                            {isFetchedUser && renderUserInfo()}
                            <p className="text-xl my-1">{title}</p>
                        </div>
                    </div>
                    <div className="flex flex-row pt-2 pr-3">
                        <div className="w-20 flex justify-center">  
                            <img 
                                className='w-12 h-12 rounded-[40px]' 
                                src={baseURL + '/upload/user/' + currentUser.profile_img}
                                alt=''
                                />
                        </div>
                        <div className="w-full">
                            <WriteComment closePopup={() => setCommentPopup(false)} parent_id={postObj.id}/>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default Post;