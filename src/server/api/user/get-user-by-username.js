import { request } from "../../../utils/axios";

export const getUserByUsername = async (username) => 
    await request(`api/user`)
        .then(res => res.data
        .find(user => user.username === username))