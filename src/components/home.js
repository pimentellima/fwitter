import TabHeader from "./tabHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext.js";
import { useNavigate } from "react-router-dom";
import FweetForm from "./fweetForm";
import moment from "moment/moment";

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

    const uploadFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post('//localhost:5000/upload', formData);
            return res.data;
        } 
        catch(err) {
            console.error(err);
        }
    }

    const sendData = async (data) => {
        const { id: user_id, name: user_name, username: user_username } = user;
        const { title, description, ingredients, file } = data;
        const fileUrl = file[0] ? await uploadFile(file[0]) : ''
        try {
            await axios.post('//localhost:5000/posts', {
                user_id, 
                user_name,
                user_username,
                title,
                description,
                ingredients: JSON.stringify(ingredients),
                date: moment().format("YYYY-MM-DD HH:mm:ss"),
                file: fileUrl
            })
        }
        catch (err) {
            console.log(err);
        }
        fetchData();
    }
    
    return(
        <div className="flex flex-col">
            <TabHeader>
                <Link to='/'>Início</Link>
            </TabHeader>
            <div className="flex flex-col ">
            <div className="grid grid-flow-col grid-cols-10 py-2 pl-4 border-b border-stone-700 bg-inherit">
                <div className="col-span-1">img</div>
                <FweetForm sendData={sendData}/>
            </div>
            {posts.map(post => 
                <div className="grid grid-flow-row grid-cols-10 pt-2 pb-4 px-3 border-b border-stone-700" key={post.id}>
                    <div className="col-span-1">img</div>
                    <div className="col-span-9 flex flex-col">
                        <div className="flex max-w-full gap-2 items-center">
                            <p className="font-bold">{post.user_name}</p>
                            <div className="flex flex-row text-sm text-stone-400 gap-1">
                                <p >{post.user_username}</p>
                                <p >{"· " + moment(post.date, 'YYYY-MM-DD HH:mm:ss').fromNow()}</p>
                        </div>
                    </div>
                    <p className="text-xl mb-1">{post.title}</p>
                    {post.ingredients && post.ingredients.length > 0 && 
                        <div className="flex flex-col">
                            <p className="font-medium mt-1">{'Ingredientes: '}</p>
                            {post.ingredients.map((ingredient, index) => (
                                <p key={index} className="inline">{ingredient.quantity + " " + ingredient.unity + " " + ingredient.name}</p>
                            ))}
                        </div>}
                    {post.description && 
                        <div>
                            <p className="font-medium mt-2">{'Descrição: '}</p>
                            <p>{post.description}</p>
                        </div>}
                    {post.file && 
                        <div className="">
                            <img className="rounded-xl" src={'http://localhost:5000/upload/' + post.file} alt=''/>
                        </div>
                        }
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default Home;