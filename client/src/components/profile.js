import { useContext } from "react";
import UserBgImg from "./userBgImg";
import UserImg from "./userImg";
import { AuthContext } from "../contexts/authContext";

const Profile = ({ user, isFollowed, handleFollow, onOpenModal }) => {
    const { currentUser } = useContext(AuthContext);
    
    return ( 
        <div className="h-[450px] flex flex-col 
                        border-b border-stone-700">
            <div className="relative h-64">
                <UserBgImg user={user}/>
                <div className="absolute top-1/2 flex 
                                justify-between w-full items-end">
                    <div className='h-32 w-32 ml-3'>
                        <UserImg clickable={true} user={user}/>
                    </div>
                    {user.id === currentUser.id ? 
                        <button 
                            onClick={() => onOpenModal()}
                            className='h-10 hover:bg-stone-600 
                                    hover:cursor-pointer 
                                    hover:border-stone-500 py-1 px-4 
                                    text-md transition ease-in-out 
                                    duration-300 font-bold rounded-3xl 
                                    my-2 mr-2 border border-stone-600'
                            >
                            Editar perfil
                        </button>
                        :
                        isFollowed ? 
                            <button 
                                onClick={() => handleFollow()}
                                className='h-10 hover:bg-stone-600 
                                        hover:cursor-pointer py-1 px-4
                                        hover:border-stone-500 
                                        text-md transition ease-in-out 
                                        duration-300 font-bold 
                                        rounded-3xl my-2 mr-2 border 
                                        border-stone-600'
                                >
                                Deixar de seguir
                            </button>
                            :
                            <button 
                                onClick={() => handleFollow()}
                                className='h-10 hover:bg-stone-600 
                                        hover:cursor-pointer 
                                        hover:border-stone-500 py-1 px-4
                                        text-md transition ease-in-out 
                                        duration-300 font-bold 
                                        rounded-3xl my-2 mr-2 border 
                                        border-stone-600'
                                >
                                Seguir
                            </button>
                    }
                </div>
            </div>
            <div className="mt-3 pl-5 flex flex-col">
                <p className=" text-2xl">{user.name + "  "}</p>
                <p className="text-stone-400">{'@' + user.username}</p>
                <p className="mt-2 text-md">{user.bio}</p>
            </div>  
        </div>
    )
}


export default Profile;