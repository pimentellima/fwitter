import moment from "moment";
import { request } from "../utils/axios";

export const createShare = async ({ post_id, user_id }) =>
    await request.post('/share', {
        post_id,
        user_id,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
    })

export const deleteShare = async ({ post_id, user_id }) => 
    await request.delete('/share', {
        data: {
            post_id,
            user_id
    }})


export const getShares = async (post_id) => {
    const res = await request.get('/share', {
        params: {
            post_id,
        }
    })
    return res.data;
}