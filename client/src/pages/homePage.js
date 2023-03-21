import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../containers/post/post';
import WritePost from '../containers/post/writePost';
import { AuthContext } from '../contexts/authContext';
import { getPostsById } from '../services/postsService';

const HomePage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { data: posts, isLoading } = useQuery(['homePagePosts'], () =>
        getPostsById(currentUser.id)
    )

    useEffect(() => {
        if(!currentUser) navigate('/login');
    }, [])
    
    const handlePostClick = (post) => {
        navigate('/post/' + post.id)
    }

    return (
        <>
            <div className='sticky top-0 pt-2 pb-4 pl-3 font-medium text-xl 
                        z-20 bg-stone-800 border-b border-stone-700'>
                <p>Inicio</p>
            </div>  
            <div className="flex flex-col"> 
            <div className='border-b border-stone-700'>
                <WritePost/>
            </div>
            <div className='border-b border-stone-700'>
            </div>
                {isLoading ? 
                    <>
                    </>
                    :
                    posts.map(post => 
                        <div 
                            onClick={() => handlePostClick(post)} 
                            className='border-b border-stone-700'
                            key={post.id}
                            >
                            <Post postObj={post}/>
                        </div>
                )}
            </div>
        </>
    )
}

export default HomePage;