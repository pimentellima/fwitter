import axios from "axios"

export const unfollowUser = async(followedId, followerId) => {
    try {
        await axios.delete('//localhost:5000/follow', {
            data: {
                follower_user_id: followerId,
                followed_user_id: followedId
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const followUser = async(followedId, followerId) => {
    try {
        await axios.post('//localhost:5000/follow', {
            follower_user_id: followerId,
            followed_user_id: followedId
        })
    } catch(err) {
        console.log(err);
    }
}

export const getFollowedById = async(id) => {
    try {
        const res = await axios.get('//localhost:5000/follow', {
            params: {
                followed_user_id: id
            }
        })
        return res.data;
    } catch(err) {
        console.error(err);
    }
}