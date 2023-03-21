import { getPostById } from "../services/singleService";

export const getPostThread = async id => {
    const postsArr = [];
    let post = await getPostById(id);
    while(post.parent_id) {
        post = await getPostById(post.parent_id);
        postsArr.unshift(post);
    }
    return postsArr;
}