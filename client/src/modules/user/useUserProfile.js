import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { followUser, getFollowedById, unfollowUser } from "../../services/follow";
import { getUserByUrl } from "../../services/user";
import { getUserPostsById } from "../../services/posts";

export const useUserProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const location = useLocation();
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        if(!user) {
            fetchUser();
        }
        else {
            fetchPosts();
            fetchFollow();
        }
    }, [user]);

    const fetchFollow = async() => {
        const followedUsers = await getFollowedById(user.id);
        followedUsers.forEach((item) => {
            if(item.follower_user_id === currentUser.id) {
                setFollowed(true);
            } 
        })

    }
    const fetchPosts = async () => {
        const posts = await getUserPostsById(user.id);
        setPosts(posts);

    }

    const handleFollow = async() => {
        followed ? 
            unfollowUser(user.id, currentUser.id).
            then(() => setFollowed(false))
        :
            followUser(user.id, currentUser.id).
            then(() => setFollowed(true))
    }

    const fetchUser = async() => {
        const users = await getUserByUrl(location.pathname);
        setUser(users);
    }

    return { followed, handleFollow, user, posts }
}