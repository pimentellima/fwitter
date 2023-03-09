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
