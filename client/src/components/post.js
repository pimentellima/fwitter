import moment from "moment";
import { useEffect } from "react";
import 'moment/locale/pt-br'
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import LikeButton from "./buttons/likeButton";
import CommentButton from "./buttons/commentButton";
import SaveButton from "./buttons/saveButton";
import ShareIcon from "./buttons/shareButton";

const Post = ({ postObj }) => {
    const [user, setUser] = useState();
    
    const { 
        id,
        user_id, 
        date, 
        title, 
        ingredients, 
        description, 
        file,
    } = postObj;

    useEffect(() => {
        fetchUser();
    }, [postObj])

    const fetchUser = async() => {
        try {
            const res = await axios.get(`//localhost:5000/user/`, {
                params:
                {
                    id: user_id
                }
            });
            setUser(res.data[0]);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="flex flex-row pt-2 pr-3 border-b border-stone-700" key={id}>
            <div className="min-w-fit mx-3">
                <img className='w-12 h-12 rounded-[40px]' src={user && `http://localhost:5000/upload/user/${user.profile_img}`} alt=''/>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex max-w-full gap-2 items-center">
                    {user && <Link to={`http://localhost:3000/${user.username}`} className="font-bold">{user.name}</Link>}
                    <div className="flex flex-row text-sm text-stone-400 gap-1">
                        <p>{user && '@' + user.username}</p>
                        <p >{"· " + moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow(true)}</p>
                    </div>
                </div>
                <p className="text-xl my-1">{title}</p>
                {ingredients && ingredients.length > 0 && 
                    <div className="flex flex-col">
                        <p className="font-medium mt-1">{'Ingredientes: '}</p>
                        {ingredients.map((ingredient, index) => (
                            <p key={index} className="inline">{ingredient.quantity + " " + ingredient.unity + " " + ingredient.name}</p>
                        ))}
                    </div>}
                {description && 
                    <div>
                        <p className="font-medium mt-2">{'Descrição: '}</p>
                        <p>{description}</p>
                    </div>}
                {file && <img className="rounded-xl" src={'http://localhost:5000/upload/post/' + file} alt=''/>}
                <div className="px-2 flex flex-row items-center justify-between h-14">
                        <CommentButton active={false}/>
                        <LikeButton active={false}/>
                        <ShareIcon active={false}/>
                        <SaveButton active={false}/>
                </div>
            </div>
        </div>
    )
}

export default Post;