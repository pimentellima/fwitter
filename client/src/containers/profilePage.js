import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getUserPostsById } from "../services/postsService";
import Post from "./post/post";
import { getUserByUsername } from "../services/userService";
import Profile from "./profile/profile";

const ProfilePage = () => {
    const location = useLocation();
    const username = location.pathname.slice(1);

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
    
    return ( 
        <> 
            {isFetchedUser && 
                <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                    {user && <p>{user.name}</p>}
                </div> 
            }
            <Profile/>            
            {isFetchedPosts ?
                posts.map(post => <Post postObj={post} key={post.id}/>)
                :
                <>
                </>
            }
        </>
    )
}


export default ProfilePage;