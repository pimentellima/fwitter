import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUserPostsById } from "../../services/postsService";
import { getUserByUsername } from "../../services/userService";
import Post from "../post/post";
import Profile from "./profile";

const ProfilePage = () => {
    const location = useLocation();
    const username = location.pathname.slice(1);
    const navigate = useNavigate();

    const { 
        data: user, 
        isFetched: isFetchedUser 
    } = useQuery(['profileUser', { username }], () => 
    getUserByUsername(username));


    const { 
        data: posts,  
        isFetched: isFetchedPosts
    } = useQuery(['profilePosts'], () => 
            getUserPostsById(user.id).then(data => 
                data.map(post => ({
                    ...post, 
                    ingredients: JSON.parse(post.ingredients),
                    date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
                }))
            ), 
        {
            enabled: isFetchedUser
        });

    const handlePostClick = (post) => {
        navigate('/post/' + post.id)
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    const renderPosts = () => 
        posts.map(post => 
            <div 
                onClick={() => handlePostClick(post)} 
                className={`hover:backdrop-brightness-110 hover:cursor-pointer border-b border-stone-700`}
                key={post.id}
                >
                <Post postObj={post}/>
            </div>)
    
    return ( 
        <> 
            {isFetchedUser && 
                <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                    {user && <p>{user.name}</p>}
                </div> 
            }
            <Profile/>            
            {isFetchedPosts && renderPosts()}
        </>
    )
}


export default ProfilePage;