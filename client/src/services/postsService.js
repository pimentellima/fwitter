import moment from "moment";
import { request } from "../utils/axios";

export const getUserPostsById = async(id) => {
    const res = await request.get('/posts/' + id);
    return res.data;
}

export const getPostsById = async(id) => 
    request.get('/posts/', {
        params: { id }
    }).then(res => res.data.map(post => ({
            ...post, 
            ingredients: JSON.parse(post.ingredients),
            date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
    })
))