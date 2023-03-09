import axios from "axios"

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