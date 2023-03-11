import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import { AuthContext } from "../../contexts/authContext";
import { getUserPostsById } from "../../services/postsService";
import { getUserByUrl } from "../../services/userService";
import Post from "../post";
import EditProfile from "./editProfile";
import { createFollow, deleteFollow, getFollowedById } from "./profileService";

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

    const { data: user, isLoading } = useQuery(['profileUser', { path: location.pathname }], 
    () => getUserByUrl(location.pathname));

    const { data: posts } = useQuery(['profilePosts'], 
    () => getUserPostsById(user.id).then(data => 
        data.map(post => ({
            ...post, 
            ingredients: JSON.parse(post.ingredients),
            date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
        }))
    ), 
    {
        enabled: !isLoading
    });

    const { data: isFollowed } = useQuery(['profileFollow'], 
    () => getFollowedById(user.id)
    .then(follows => follows.filter(
        follow => follow.follower_user_id === currentUser.id)
        .length
    ), {
        enabled: !isLoading
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
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                {user && <p>{user.name}</p>}
            </div>  
            <div className="flex flex-col">
                    {!isLoading &&
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
                {posts && posts.map(post => <Post postObj={post} key={post.id}/>)}
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