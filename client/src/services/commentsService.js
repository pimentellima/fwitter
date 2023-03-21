import { request } from "../utils/axios";

export const getComments = async (parent_id) => {
    const res = await request.get('/comments', {
        params: {
            parent_id,
        }
    })
    return res.data;        
}