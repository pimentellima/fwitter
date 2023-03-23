import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import 'moment/locale/pt-br';
import { useNavigate } from 'react-router-dom';
import PostBody from '../../components/postBody';
import { deletePost, getPostById } from '../../services/singleService';
import { getUserById } from '../../services/userService';
import PostActionsController from "./postActionsController";

const PostController = ({ post, isThread }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { 
        id,
        user_id, 
        ingredients,
        description,
        file,
        parent_id,
        date, 
        title, 
        share_user_id
    } = post;

    const { data: user, isFetching: isFetchingUser } = useQuery(
        ['user', { post_id: id }], () => getUserById(user_id)
    );

    const { data: parentUser} = useQuery(
        ['postResponseUser', { post_id: id }], () => 
        getPostById(parent_id).then(post => 
            getUserById(post.user_id)), 
        {
            enabled: !!parent_id
        }
    )

    const { data: shareUser } = useQuery(
        ['postShareUser', { post_id: id }], () => getUserById(share_user_id),{
            enabled: !!share_user_id
        }
    );

    const deleteMutation = useMutation(
        () => deletePost(id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['homePosts']);
                queryClient.invalidateQueries(['profilePosts']);
                queryClient.invalidateQueries(['bookmarkedPosts']);
                queryClient.invalidateQueries(['postComments', { parent_id }]);
            }
        }
    )

    if(isFetchingUser) return <></>

    return (
        <div 
            onClick={() => navigate('/post/' + id)} 
            className='flex flex-col pt-2 pr-3 
                hover:backdrop-brightness-110
                hover:cursor-pointer'
            >
                <PostBody 
                    title={title}
                    isThread={isThread}
                    user={user}
                    date={date}
                    ingredients={ingredients}
                    description={description}
                    file={file}
                    shareUser={shareUser}
                    parentUser={parentUser}
                    handleUserClick={(e, user) => {
                        e.stopPropagation();
                        navigate('/' + user.username)
                    }}
                    handleRemove={e => {
                        e.stopPropagation();
                        deleteMutation.mutate();
                    }}
                    >
                    <PostActionsController post={post} user={user}/>
                </PostBody>
        </div>
    )
}

export default PostController;