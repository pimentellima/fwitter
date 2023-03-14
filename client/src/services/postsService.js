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

export const getPostById = async id => {
    const res = await request.get('/single', {
        params: { id }
    })
    return res.data[0];
}

export const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await request.post('/upload/post/', formData);
    return res.data;
}

export const getComments = async (parent_id) => {
    const res = await request.get('/comments', {
        params: {
            parent_id,
        }
    })
    return res.data;        
}

export const createPost = async ({ data, user_id, parent_id }) => {
    const { title, description, ingredients, file } = data;
    const fileUrl = (file && file[0]) ? await uploadImg(file[0]) : '';
    const postObj = {
        user_id,
        parent_id,
        title,
        description,
        ingredients: JSON.stringify(ingredients),
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        file: fileUrl
    }
    return await request.post('/single/', postObj);
}

export const deletePost = async id => 
    await request.delete('/single/', {
            data: { id }
        })

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




