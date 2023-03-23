import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/mainHeader';
import { AuthContext } from '../../contexts/authContext';
import CreatePostForm from './createPostForm';
import { getPostsById } from '../../services/postsService'
import { createPost } from '../../services/singleService';
import PostController from './postController';

const HomePageController = () => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: posts, isFetching } = useQuery(['homePosts'], () =>
        getPostsById(currentUser.id)
    )

    const createMutation = useMutation(
        data => createPost({ data, user_id: currentUser.id, parent_id: null}), 
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['homePosts']);
                queryClient.invalidateQueries(['profilePosts']);
            }
    });
    
    useEffect(() => {
        if(!currentUser) navigate('/login');
    }, [])
    
    if(isFetching) return <></>

    return (
        <>
            <MainHeader>
                Inicio
            </MainHeader>
            <CreatePostForm onSubmit={(data) => createMutation.mutate(data)}/>
            {posts.map(post => 
                <div 
                    className='border-b border-stone-700' 
                    key={post.id}
                    >
                    <PostController post={post}/>
                </div>
            )}
        </>
    )
}

export default HomePageController;