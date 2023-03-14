import { QueryCache, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import { AuthContext } from "../../contexts/authContext";
import { createFollow, deleteFollow, getFollowedById } from "../../services/profileService";
import { getUserByUsername } from "../../services/userService";
import { baseURL } from "../../utils/constants";
import EditProfile from "./editProfile";

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [openPopup, setOpenPopup] = useState(false);
    const location = useLocation();
    const queryClient = useQueryClient();

    const { 
        data: user, 
        isFetched: isFetchedUser 
    } = useQuery(['profileUser', { path: location.pathname }], 
    () => getUserByUsername(location.pathname));

    const { data: isFollowed } = useQuery(['profileFollow'], 
    () => getFollowedById(user.id)
    .then(follows => follows.filter(
        follow => follow.follower_user_id === currentUser.id)
        .length
    ), {
        enabled: isFetchedUser
    })

    const followMutation = useMutation(
        () => createFollow({ 
            followedId: user.id,
            followerId: currentUser.id
        }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['profileFollow'])
            }
        }
    );

    const unfollowMutation = useMutation(
        () => deleteFollow({ 
            followedId: user.id,
            followerId: currentUser.id
        }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['profileFollow'])
            }
        }
    );

    const handleFollow = () => {
        isFollowed ? unfollowMutation.mutate() : followMutation.mutate();
    }
    
    return ( 
        <>
            <div className="flex flex-col">
                    {isFetchedUser &&
                        <div className="h-[450px] flex flex-col border-b border-stone-700">
                            <div className="relative h-64">
                                <img className="absolute h-44 w-full" src={baseURL + '/upload/user/' + user.profile_bg_img} alt=''/>
                                <div className="absolute top-1/2 flex justify-between w-full items-end">
                                    <img className='h-32 w-32 ml-4 rounded-full' src={baseURL + '/upload/user/' + user.profile_img} alt=''/>
                                    {user.id === currentUser.id ? 
                                        <button 
                                            onClick={() => setOpenPopup(true)}
                                            className='h-10 hover:bg-stone-600 hover:cursor-pointer hover:border-stone-500 py-1 px-4 text-md transition ease-in-out duration-300 font-bold rounded-3xl my-2 mr-2 border border-stone-600'
                                        >
                                            Editar perfil
                                        </button>
                                        :
                                        isFollowed ? 
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
            </div>
            <Popup
                open={openPopup}
                onOpen={() => setOpenPopup(true)}
                onClose={() => setOpenPopup(false)}
                {...{overlayStyle}}
                >   
                <EditProfile onClose={() => setOpenPopup(false)}/>
            </Popup>
        </>
    )
}


export default Profile;