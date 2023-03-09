import axios from "axios";
import moment from "moment";

export const getUserPostsById = async(id) => {
    try {
        const res = await axios.get(`//localhost:5000/posts/${id}`);
        const posts = res.data.map(post => ({
            ...post, 
            ingredients: JSON.parse(post.ingredients),
            date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
        }))
        return posts;
    } catch(err) {
        console.log(err);
    }
}

export const getPostsById = async(id) => {
    try {
        const res = await axios.get('//localhost:5000/posts/', {
            params: {
                id
            }
        });
        const posts = res.data.map(post => ({
            ...post, 
            ingredients: JSON.parse(post.ingredients),
            date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
        }))
        return posts;
    } catch(err) {
        console.log(err);
    }
}

export const createPost = async(postObj) => {
    try {
        await axios.post('//localhost:5000/posts', postObj);
    } catch (err) {
        console.log(err);
    };
}

export const uploadPostImg = async(file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post('//localhost:5000/upload/post', formData);
        return res.data;
    } catch(err) {
        console.error(err);
    }
}

export const deletePost = async(id) => {
    try {
        await axios.delete('//localhost:5000/posts', {
            data: {id}
        })
    } catch(err) {
        console.log(err);
    }
}