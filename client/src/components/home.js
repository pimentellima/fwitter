import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext.js";
import { useNavigate } from "react-router-dom";
import WritePost from "./writePost";
import moment from "moment/moment";
import Post from "./post";
import { useLocation } from "react-router-dom";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        currentUser ? fetchData() : navigate('/login');
    }, [])

    const fetchData = async() => {
        try {
            const res = await axios.get(`//localhost:5000/posts`, {
                params: {
                    id: currentUser.id
                }
            });
            const posts = res.data.map(post => ({
                ...post, 
                ingredients: JSON.parse(post.ingredients),
                date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
            }))
            setPosts(posts)
        } 
        catch(err) {
            console.log(err);
        }
    }
    
    return(
        <div className="">
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                <p>Inicio</p>
            </div>  
            <div className="flex flex-col"> 
                <WritePost fetchData={fetchData}/>
                {posts.map(post => 
                    <Post key={post.id} postObj={post}/>
                )}
            </div>
        </div>
    )
}

export default Home;