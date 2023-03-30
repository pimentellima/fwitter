import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/mainHeader';
import { AuthContext } from '../../contexts/authContext';
import Post from '../post/post';
import PostForm from '../post/postForm';
import { useHomePostsQuery } from './useHomePostsQuery';

const HomePage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { data: posts, isFetching: isFetchingPosts } = useHomePostsQuery();
    
    useEffect(() => {
        if(!currentUser) navigate('/login');
    }, [currentUser])
    
    if(isFetchingPosts) return <></>

    return (
        <>
            <MainHeader>
                Inicio
            </MainHeader>
            <PostForm/>
            {posts && posts.map(post => 
                <div 
                    className='border-b border-stone-700' 
                    key={post.id}
                    >
                    <Post post={post}/>
                </div>
            )}
        </>
    )
}

export default HomePage;