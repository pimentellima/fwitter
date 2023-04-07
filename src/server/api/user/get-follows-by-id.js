import axios from "axios"

export const getFollowsById = async (userId) => {
    return await axios.get(`api/follow/${userId}`).then(res => res.data)
}