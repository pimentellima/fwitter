import { useContext, useState } from "react";
import Popup from 'reactjs-popup';
import { AuthContext } from "../../contexts/authContext";
import Post from "../posts/post";
import EditProfile from "./editProfile";
import { useUserProfile } from "./useUserProfile";

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const User = () => {
    const { user, posts, followed, handleFollow } = useUserProfile();
    const { currentUser } = useContext(AuthContext);
    const [openPopup, setOpenPopup] = useState(false);

    return( 
        <>
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                {user && <p>{user.name}</p>}
            </div>  
            <div className="flex flex-col">
                    {user &&
                        <div className="h-[450px] flex flex-col border-b border-stone-700">
                            <div className="relative h-64">
                                <img className="absolute h-44 w-full" src={`http://localhost:5000/upload/user/${user.profile_bg_img}`} alt=''/>
                                <div className="absolute top-1/2 flex justify-between w-full items-end">
                                    <img className='h-32 w-32 ml-4 rounded-full' src={`http://localhost:5000/upload/user/${user.profile_img}`} alt=''/>
                                    {user.id === currentUser.id ? 
                                        <button 
                                            onClick={() => setOpenPopup(true)}
                                            className='h-10 hover:bg-stone-600 hover:cursor-pointer hover:border-stone-500 py-1 px-4 text-md transition ease-in-out duration-300 font-bold rounded-3xl my-2 mr-2 border border-stone-600'
                                        >
                                            Editar perfil
                                        </button>
                                        :
                                        followed ? 
                                            <button onClick={() => handleFollow()}
                                                className='h-10 hover:bg-stone-600 hover:cursor-pointer hover:border-stone-500 py-1 px-4 text-md transition ease-in-out duration-300 font-bold rounded-3xl my-2 mr-2 border border-stone-600'
                                                >
                                                Deixar de seguir
                                            </button>
                                        :
                                            <button onClick={() => handleFollow()}
                                                className='h-10 hover:bg-stone-600 hover:cursor-pointer hover:border-stone-500 py-1 px-4 text-md transition ease-in-out duration-300 font-bold rounded-3xl my-2 mr-2 border border-stone-600'
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
                    }
                {posts && posts.map(post => <Post postObj={post} key={post.id}/>)}
            </div>
            <Popup
                open={openPopup}
                onOpen={() => setOpenPopup(true)}
                onClose={() => setOpenPopup(false)}
                {...{overlayStyle}}
                >   
                <EditProfile closePopup={() => setOpenPopup(false)}/>
            </Popup>
        </>
    )
}


export default User;