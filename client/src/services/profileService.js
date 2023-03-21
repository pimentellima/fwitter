import { request } from "../utils/axios";
import { uploadBackgroundImg, uploadProfileImg } from "../utils/upload";

export const updateUser = async ({ data, currentUser }) => {
    const { name, bio, profile_img, profile_bg_img } = data;
    const profileImageUrl = profile_img[0] ? 
        await uploadProfileImg(profile_img[0]) 
        : 
        currentUser.profile_img;
    const backgroundImageUrl = profile_bg_img[0] ? 
        await uploadBackgroundImg(profile_bg_img[0]) 
        : 
        currentUser.profile_bg_img;

    const userData = {
        name,
        username: currentUser.username,
        bio,
        id: currentUser.id,
        profile_img: profileImageUrl,
        profile_bg_img: backgroundImageUrl
    };
    
    await request.post('/user', userData);
    return userData;
}

export const getFollowedById = async(id) => {
    const res = await request.get('/follow', {
        params: {
            followed_user_id: id
        }
    })
    return res.data;
}

export const deleteFollow = async ({ followerId, followedId }) => 
    await request.delete('/follow', {
        data: {
            follower_user_id: followerId,
            followed_user_id: followedId
        }
    })

export const createFollow = async ({ followerId, followedId }) => 
    await request.post('/follow', {
        follower_user_id: followerId,
        followed_user_id: followedId
    })

