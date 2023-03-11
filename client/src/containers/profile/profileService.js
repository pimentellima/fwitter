import axios from "axios";

const uploadProfileImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post('//localhost:5000/upload/userProfile', formData);
    return res.data;
}

const uploadBackgroundImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post('//localhost:5000/upload/userBackground', formData);
    return res.data;
}

export const updateUser = async ({ data, currentUser }) => {
    const { name, bio, profile_img, profile_bg_img } = data;
    const profileImageUrl = profile_img[0] ? await uploadProfileImg(profile_img[0]) : currentUser.profile_img;
    const backgroundImageUrl = profile_bg_img[0] ? await uploadBackgroundImg(profile_bg_img[0]) : currentUser.profile_bg_img;

    const userData = {
        name,
        username: currentUser.username,
        bio,
        id: currentUser.id,
        profile_img: profileImageUrl,
        profile_bg_img: backgroundImageUrl
    };
    
    await axios.post('//localhost:5000/user', userData);
    return userData;
}

export const getFollowedById = async(id) => {
    const res = await axios.get('//localhost:5000/follow', {
        params: {
            followed_user_id: id
        }
    })
    return res.data;
}

export const deleteFollow = async ({ followerId, followedId }) => 
    await axios.delete('//localhost:5000/follow', {
        data: {
            follower_user_id: followerId,
            followed_user_id: followedId
        }
    })


export const createFollow = async ({ followerId, followedId }) => 
    await axios.post('//localhost:5000/follow', {
        follower_user_id: followerId,
        followed_user_id: followedId
    })

