import moment from "moment";
import { useContext, useEffect } from "react";
import 'moment/locale/pt-br'
import { getUserById } from '../../services/user'
import { useState } from "react";
import { Link } from "react-router-dom";
import LikeButton from './likeButton'
import { deletePost } from '../../services/posts'
import CommentButton from './commentButton'
import ShareButton from './shareButton'
import SaveButton from './saveButton'
import { AuthContext } from "../../contexts/authContext";

const Post = ({ postObj, onRemovePost }) => {
    const [user, setUser] = useState();
    const { currentUser } = useContext(AuthContext);
    
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
        const user = await getUserById(user_id);
        setUser(user);
    }

    const handleDelete = async() => {
        deletePost(id);
        onRemovePost();
    }

    return (
        <div className="flex flex-row pt-2 pr-3 border-b border-stone-700" key={id}>
            <div className="w-20 flex justify-center">
                <img className='w-12 h-12 rounded-[40px]' src={user && `http://localhost:5000/upload/user/${user.profile_img}`} alt=''/>
            </div>
            <div className="w-full">
                <div className="flex justify-between pr-5">
                    <div className="flex gap-2 items-center">
                        {user && <Link to={`http://localhost:3000/${user.username}`} className="font-bold">{user.name}</Link>}
                        <div className="flex flex-row text-sm text-stone-400 gap-1">
                            <p>{user && '@' + user.username}</p>
                            <p >{"· " + moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow(true)}</p>
                        </div>
                    </div>
                    {user && user.id === currentUser.id && 
                        <button
                            onClick={() => handleDelete()}
                            >
                            ...
                        </button>
                    }
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
                {file && <img className="rounded-xl max-h-[500px]" src={'http://localhost:5000/upload/post/' + file} alt=''/>}
                <div className="px-2 flex flex-row items-center justify-between h-14">
                    <CommentButton active={false}/>
                    <LikeButton active={false}/>
                    <ShareButton active={false}/>
                    <SaveButton active={false}/>
                </div>
            </div>
        </div>
    )
}

export default Post;