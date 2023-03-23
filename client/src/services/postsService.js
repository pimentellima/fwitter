import moment from "moment";
import { request } from "../utils/axios";

export const getUserPostsById = async(id) => 
    request.get('/posts/' + id).then(res => res.data.map(post => ({
        ...post, 
        ingredients: JSON.parse(post.ingredients),
        date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
    })
));

export const getPostsById = async(id) =>  
    request.get('/posts/', {
        params: { id }
    }).then(res => res.data.map(post => ({
        ...post, 
        ingredients: JSON.parse(post.ingredients),
        date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
    })
))
