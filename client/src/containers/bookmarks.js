import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { getBookmarkedPosts } from "../services/bookmarksService";
import Post from "./post/post";

const Bookmarks = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { 
        data: posts,  
        isFetched
    } = useQuery(['bookmarkedPosts'], () => 
            getBookmarkedPosts(currentUser.id).then(data => 
                data.map(post => ({
                    ...post, 
                    ingredients: JSON.parse(post.ingredients),
                    date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
                }))
            )
        );

    const handlePostClick = (post) => {
        navigate('/post/' + post.id)
    }

    useEffect(() => {
        if(!currentUser) navigate('/login');
        else window.scroll(0, 0);
    }, [])

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

export default Bookmarks;