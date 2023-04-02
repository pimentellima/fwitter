import { request } from "../../../utils/axios";

export const getPostsByUserId = (userId) => 
    request.get(`api/post/authorid/${userId}`).then(res => {
        const posts = res.data.map(post => (
            {...post, ingredients: JSON.parse(post.ingredients)}
        ))
        return posts;
    })
