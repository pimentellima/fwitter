import moment from "moment";
import { request } from "../utils/axios";

export const getBookmarkedPosts = async(id) => 
    request.get('/bookmarks/' + id, {
        params: { id }
    }).then(res => res.data.map(post => ({
        ...post, 
        ingredients: JSON.parse(post.ingredients),
        date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
    })
))

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

