import { request } from "../utils/axios";

export const getLikes = async (post_id) => {
    const res = await request.get('/likes', {
        params: {
            post_id,
        }
    })
    return res.data;
}

export const createLike = async ({ post_id, user_id }) => 
    await request.post('/likes', {
        post_id,
        user_id
    })

export const deleteLike = async ({ post_id, user_id }) => 
    await request.delete('/likes', {
        data: {
            post_id,
            user_id
    }})