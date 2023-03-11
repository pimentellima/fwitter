import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext.js";
import { getPostsById } from "../services/postsService.js";
import Post from "./post.js";
import Write from "./write.js";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isLoading, data } = useQuery(['posts'], 
    () => getPostsById(currentUser.id));

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
            {isLoading ? 
                <>
                </>
                :
                data.map(post => 
                    <Post key={post.id} postObj={post}/>
                )
            }
            </div>
        </div>
    )
}

export default Home;