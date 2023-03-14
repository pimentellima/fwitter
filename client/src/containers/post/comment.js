import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { deletePost } from '../../services/postsService';
import { getUserById } from '../../services/userService';
import { baseURL } from '../../utils/constants';
import PostActions from "./postActions";

const Comment = ({ commentObj }) => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        id, 
        user_id, 
        title,
        parent_id,
        date
    } = commentObj;

    const { data: user, isFetched: isFetchedUser } = useQuery(
        ['postUser', { user_id }], () => getUserById(user_id)
    );

    const deleteMutation = useMutation(
        () => deletePost(id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['postsComments', { parent_id }]);
            }
        }
    )

    const handleUserClick = (e) => {
        e.stopPropagation();
        navigate('/' + user.username);
    }

    const renderUserInfo = () => (
        <div className="flex justify-between">
            <div onClick={(e) => handleUserClick(e)} className="flex gap-2 items-center">
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
                        onClick={(e) => handleUserClick(e)}
                        className='w-12 h-12 rounded-[40px] hover:cursor-pointer' 
                        src={baseURL + '/upload/user/' + user.profile_img} 
                        alt=''
                        />
                </div>}
                <div className="w-full">
                    {isFetchedUser && renderUserInfo()}
                    <p className="text-xl my-1">{title}</p>
                    {/* <PostActions post_id={id} onClickComment={() => setCommentPopup(true)}/> */}
                </div>
            </div>
        </div>
    )
}

export default Comment;