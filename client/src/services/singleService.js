import moment from "moment";
import { request } from "../utils/axios";
import { uploadPostImg } from "../utils/upload";

export const createPost = async ({ data, user_id, parent_id }) => {
    const { title, description, ingredients, post_img } = data;
    const fileUrl = post_img[0] ? await uploadPostImg(post_img[0]) : '';
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