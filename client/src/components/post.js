import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import 'moment/locale/pt-br'

const Post = ({ postObj }) => {
    const { user } = useContext(AuthContext);

    const { 
        id, 
        user_name, 
        user_username, 
        date, 
        title, 
        ingredients, 
        description, 
        file 
    } = postObj;

    return (
        <div className="grid grid-cols-9 pt-2 pb-4 px-3 border-b border-stone-700" key={id}>
            <img className='w-12 rounded-[40px]' src={`http://localhost:5000/upload/user/${user.img ? user.img : 'default.jpg'}`}/>
            <div className="col-span-8 flex flex-col">
                <div className="flex max-w-full gap-2 items-center">
                    <p className="font-bold">{user_name}</p>
                    <div className="flex flex-row text-sm text-stone-400 gap-1">
                        <p >{user_username}</p>
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
            </div>
        </div>
    )
}

export default Post;