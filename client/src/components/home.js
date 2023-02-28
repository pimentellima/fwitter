import TabHeader from "./tabHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext.js";
import { useNavigate } from "react-router-dom";
import WritePost from "./writePost";
import moment from "moment/moment";
import Post from "./post";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        user ? fetchData() : navigate('/login');
    }, [])

    const fetchData = async() => {
        try {
            const res = await axios.get(`//localhost:5000/posts`, {
                params: {
                    id: user.id
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
        <div className="flex flex-col">
            <TabHeader>
                <Link to='/'>Início</Link>
            </TabHeader>
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