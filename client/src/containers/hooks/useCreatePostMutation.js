import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { request } from "../../utils/axios";

export const useCreatePostMutation = () => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const uploadPostImg = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await request.post('/upload/post/', formData);
        return res.data;
    }

    const createPost = async (data) => {
        const { parent_post_id, post_img, ...other } = data;
        const fileUrl = post_img && post_img[0] ? 
            await uploadPostImg(post_img[0]) : '';
        const newPost = {
            ...other,
            author_id: currentUser.id,
            file: fileUrl
        }
        return await request.post('/post', newPost);
    }
    
    return useMutation(
        data => createPost(data), 
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['homePosts']);
                queryClient.invalidateQueries(['profilePosts']);
            }
    });
}