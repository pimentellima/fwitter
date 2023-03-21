import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext.js";
import { getPostsById } from "../services/postsService.js";
import Post from "./post/post.js";
import WritePost from "./write/writePost.js";

const HomePage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isFetched, data: posts } = useQuery(['posts'], () =>
        getPostsById(currentUser.id)
    )
    useEffect(() => {
        if(!currentUser) navigate('/login');
    }, [])

    const handlePostClick = (post) => {
        navigate('/post/' + post.id)
    }
    
    return(
        <>
            <div className='sticky top-0 pt-2 pb-4 pl-3 font-medium text-xl 
                        z-20 bg-stone-800 border-b border-stone-700'>
                <p>Inicio</p>
            </div>  
            <div className="flex flex-col"> 
            <div className='border-b border-stone-700'>
                <WritePost/>
            </div>
            {isFetched && posts.map(post => 
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