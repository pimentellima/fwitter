import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import 'moment/locale/pt-br';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { deletePost } from "../services/postsService";
import { getUserById } from "../services/userService";

const Post = ({ postObj }) => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    
    const { 
        id,
        user_id, 
        date, 
        title, 
        ingredients, 
        description, 
        file,
    } = postObj;

    const { data: user } = useQuery(
        ['postUser', { user_id }], () => getUserById(user_id)
    );

    const deleteMutation = useMutation(
        () => deletePost(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                queryClient.invalidateQueries(['profilePosts']);
            }
        }
    )

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
                            onClick={() => deleteMutation.mutate()}
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
                {file && <img className="rounded-xl max-h-[500px] mt-4" src={'http://localhost:5000/upload/post/' + file} alt=''/>}
                <div className="px-2 flex flex-row items-center justify-between h-14">
                    <button className="p-2 hover:bg-blue-600 hover:bg-opacity-10 [&:hover_path]:stroke-blue-600 transition duration-100 rounded-full ">
                        <svg className={`${false && 'fill-blue-600 [&_path]:stroke-blue-600'} w-5 h-5`} viewBox="0 0 24 24" fill="none">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> 
                            <g clipPath="url(#clip0_429_11233)"> 
                            <path className="transition-colors duration-100" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/> </g> <defs> <clipPath id="clip0_429_11233"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </g>
                        </svg>
                    </button>
                    <button className="p-2 hover:bg-red-700 hover:bg-opacity-10 [&:hover_path]:stroke-red-700 transition rounded-full ">
                        <svg className={`${false && 'fill-red-700 [&_path]:stroke-red-700'} w-5 h-5`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier"> 
                            <path className="transition-colors stroke-2" d="M4.8824 12.9557L10.5021 19.3071C11.2981 20.2067 12.7019 20.2067 13.4979 19.3071L19.1176 12.9557C20.7905 11.0649 21.6596 8.6871 20.4027 6.41967C18.9505 3.79992 16.2895 3.26448 13.9771 5.02375C13.182 5.62861 12.5294 6.31934 12.2107 6.67771C12.1 6.80224 11.9 6.80224 11.7893 6.67771C11.4706 6.31934 10.818 5.62861 10.0229 5.02375C7.71053 3.26448 5.04945 3.79992 3.59728 6.41967C2.3404 8.6871 3.20947 11.0649 4.8824 12.9557Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round">
                            </path> 
                            </g>
                        </svg>
                    </button>
                    <button className="p-2 hover:bg-green-400 hover:bg-opacity-10 [&:hover_svg]:fill-green-400 transition duration-100 rounded-full ">
                        <svg className={`${false && 'fill-green-400 [&_path]:stroke-green-400'} fill-white w-5 h-5`} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.013 22.033v-7.972h3.932l-5.902-6.892-6.026 6.893h3.947v11.896h17.468l-3.923-3.924h-9.496zM28.036 19.001v-11.958h-17.531l3.986 3.985h9.496v7.973h-3.932l5.901 6.893 6.026-6.893h-3.946z"></path>
                        </svg>
                    </button>   
                    <button className="p-2 hover:bg-amber-600 hover:bg-opacity-10 [&:hover_path]:stroke-amber-600 transition rounded-full ">
                        <svg className={`${false && 'fill-amber-600 [&_path]:stroke-amber-600'} w-5 h-5`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> 
                            <path className="transition-colors duration-100" d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/> </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post;