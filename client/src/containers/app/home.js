import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";
import { PostsContext } from "../../contexts/postsContext.js";
import Write from '../post/write';
import Post from '../post/post';

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const { posts } = useContext(PostsContext);
    const navigate = useNavigate();

    useEffect(() => {
        !currentUser && navigate('/login');
    }, [])
    

    return(
        <div className="">
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                <p>Inicio</p>
            </div>  
            <div className="flex flex-col"> 
                <Write/>
                {posts.map(post => 
                    <Post key={post.id} postObj={post}/>
                )}
            </div>
        </div>
    )
}

export default Home;