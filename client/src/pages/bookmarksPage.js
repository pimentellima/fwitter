import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Post from "../containers/post/post";
import { getBookmarkedPosts } from "../services/bookmarksService";

const BookmarksPage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { 
        data: posts,  
        isFetched
    } = useQuery(['bookmarkedPosts'], () => 
            getBookmarkedPosts(currentUser.id)
        );

    useEffect(() => {
        if(!currentUser) navigate('/login');
        else window.scroll(0, 0);
    }, [])

    const handlePostClick = (post) => {
        navigate('/post/' + post.id)
    }

    return(
        <>
            <div className='sticky top-0 border-b border-stone-700 
                    pt-2 pb-4 pl-3 font-medium text-xl 
                    z-20 bg-stone-800'>
                <p>Receitas salvas</p>
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
        </>
    )
}

export default BookmarksPage;