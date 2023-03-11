import axios from "axios";
import moment from "moment";

export const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post('//localhost:5000/upload/post', formData);
    return res.data;
}

export const createPost = async (data, user_id) => {
    const { title, description, ingredients, file } = data;
    const fileUrl = file[0] ? await uploadImg(file[0]) : '';
    const postObj = {
        user_id,
        title,
        description,
        ingredients: JSON.stringify(ingredients),
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        file: fileUrl
    }
    return await axios.post('//localhost:5000/posts', postObj);
}

export const deletePost = async id => {
    return await axios.delete('//localhost:5000/posts', {
            data: { id }
        })
}

export const getUserPostsById = async(id) => {
    const res = await axios.get(`//localhost:5000/posts/${id}`);
    return res.data;
}

export const getPostsById = async(id) => 
    axios.get('//localhost:5000/posts/', {
        params: {
            id
        }
    }).then(res => res.data.map(post => ({
            ...post, 
            ingredients: JSON.parse(post.ingredients),
            date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
    })
))

