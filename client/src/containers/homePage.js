import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext.js";
import Post from "./post/post.js";
import WritePost from "./write/writePost.js";

export const url = "http://localhost:5000";

const HomePage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isFetched, data: posts } = useQuery(['posts'], () => 
        axios.get(url + '/posts/', {
            params: {
                id: currentUser.id
            }
        }).then(res => res.data.map(post => ({
            ...post, 
            ingredients: JSON.parse(post.ingredients),
            date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
        })
    )))

    useEffect(() => {
        !currentUser && navigate('/login');
        window.scroll(0, 0);
    }, [])

    const handlePostClick = (post) => {
        navigate('/post/' + post.id)
    }

    const renderPosts = () => 
        posts.map(post => 
            <div 
                onClick={() => handlePostClick(post)} 
                className={`hover:backdrop-brightness-110 hover:cursor-pointer border-b border-stone-700`}
                key={post.id}
                >
                <Post postObj={post}/>
            </div>)
    

    return(
        <>
            <div className='sticky top-0 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800 border-b border-stone-700'>
                <p>Inicio</p>
            </div>  
            <div className="flex flex-col"> 
            <div className='border-b border-stone-700'>
                <WritePost/>
            </div>
            {isFetched && renderPosts()}
            </div>
        </>
    )
}

export default HomePage;