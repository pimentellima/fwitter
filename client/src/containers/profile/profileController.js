import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import MainHeader from '../../components/mainHeader';
import Profile from '../../components/profile';
import { AuthContext } from "../../contexts/authContext";
import { getUserPostsById } from "../../services/postsService";
import {
    createFollow,
    deleteFollow,
    getFollowedById,
    updateUser
} from "../../services/profileService";
import { getUserByUsername } from "../../services/userService";
import PostController from "../post/postController";
import EditProfileForm from "./editProfileForm";

const overlayStyle = {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const ProfileController = () => {
    const location = useLocation();
    const username = location.pathname.slice(1);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [openModal, setOpenModal] = useState(false);

    const { 
        data: user, 
        isFetching: isFetchingUser 
    } = useQuery(['profileUser', { username }], () => 
    getUserByUsername(username));

    const { 
        data: posts,  
        isFetching: isFetchingPosts
    } = useQuery(['profilePosts', { user_id: user?.id }], () => 
            getUserPostsById(user.id), {
                enabled: !!user
            }
        );

    const { data: isFollowed } = useQuery(['profileFollows'], 
    () => getFollowedById(user.id)
    .then(follows => follows.filter(
        follow => follow.follower_user_id === currentUser.id)
        .length
    ), {
        enabled: !!user
    })
    
    const followMutation = useMutation(
        () => createFollow({ 
            followedId: user.id,
            followerId: currentUser.id
        }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['profileFollows'])
            }
        }
    );

    const unfollowMutation = useMutation(
        () => deleteFollow({ 
            followedId: user.id,
            followerId: currentUser.id
        }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['profileFollows'])
            }
        }
    );

    const handleFollow = () => {
        isFollowed ? unfollowMutation.mutate() : followMutation.mutate();
    }

    const updateProfileMutation = useMutation(
        data => updateUser({ data, currentUser }).then((userData) => {
            setCurrentUser(userData);
        }), {
                onSuccess: () => {
                    queryClient.invalidateQueries(['profileUser', { 
                        username
                    }]);
                    queryClient.invalidateQueries(['postUser', { 
                        user_id: currentUser.id 
                    }]);
                    setOpenModal(false);
                }
        }
    )

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    if(isFetchingUser || isFetchingPosts) return <></>

    return ( 
        <> 
            <MainHeader>
                <p>{user.name}</p>
            </MainHeader>
            <Profile 
                user={user} 
                isFollowed={isFollowed} 
                handleFollow={handleFollow}
                onOpenModal={() => setOpenModal(true)}
                />           
            <Popup
                open={openModal}
                onOpen={() => setOpenModal(true)}
                onClose={() => setOpenModal(false)}
                {...{overlayStyle}}
                >   
                <EditProfileForm 
                    onSubmit={(data) => updateProfileMutation.mutate(data)}
                    onCloseModal={() => setOpenModal(false)}
                    />
            </Popup>
            {posts.map(post => 
                <div 
                    className='border-b border-stone-700'
                    key={post.id}
                    >
                    <PostController post={post}/>
                </div>
            )}
        </>
    )
}

export default ProfileController;