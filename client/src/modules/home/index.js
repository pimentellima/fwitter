import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";
import { getPostsById } from "../../services/posts.js";
import Post from "../posts/index.js";
import WritePost from "../write/index.js";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        currentUser ? fetchPosts() : navigate('/login');
    }, [])

    const fetchPosts = async() => {
        const posts = await getPostsById(currentUser.id);
        setPosts(posts);
    }
    
    return(
        <div className="">
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                <p>Inicio</p>
            </div>  
            <div className="flex flex-col"> 
                <WritePost fetchPosts={fetchPosts}/>
                {posts.map(post => 
                    <Post key={post.id} postObj={post}/>
                )}
            </div>
        </div>
    )
}

export default Home;