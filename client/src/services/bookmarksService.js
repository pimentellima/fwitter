import moment from "moment";
import { request } from "../utils/axios";

export const getBookmarkedPosts = async(id) => {
    const res = await request.get('/bookmarks/' + id);
    return res.data;
}

export const getBookmarks = async (post_id) => {
    const res = await request.get('/bookmarks', {
        params: {
            post_id,
        }
    })
    return res.data;
}

export const createBookmark = async ({ post_id, user_id }) =>
    await request.post('/bookmarks', {
        post_id,
        user_id,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
})

export const deleteBookmark = async ({ post_id, user_id }) => 
    await request.delete('/bookmarks', {
        data: {
            post_id,
            user_id
}})

