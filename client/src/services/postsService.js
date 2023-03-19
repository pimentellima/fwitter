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

export const getPostThread = async id => {
    const postsArr = [];
    let post = await getPostById(id);
    while(post.parent_id) {
        post = await getPostById(post.parent_id);
        postsArr.unshift(post);
    }
    return postsArr;
}

export const getPostById = async id => 
    request.get('/single', {
        params: { id }
    }).then(res => {
        const post = res.data[0];
        return {
            ...res.data[0], 
            ingredients: JSON.parse(post.ingredients),
            date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
        }
    })


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
    const { title, description, ingredients, post_img } = data;
    const fileUrl = post_img[0] ? await uploadImg(post_img[0]) : '';
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

export const createShare = async ({ post_id, user_id }) =>
    await request.post('/share', {
        post_id,
        user_id,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
    })

export const getShares = async (post_id) => {
    const res = await request.get('/share', {
        params: {
            post_id,
        }
    })
    return res.data;
}



