import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../utils/axios"

export const uploadPostImg = async (file) => {
     const formData = new FormData();
     formData.append("file", file);
     const res = await request.post('/upload/post/', formData);
     return res.data;
}

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    
    return useMutation((data) => {
        const { parent_post_id, post_img, ...other } = data;

        /* const fileUrl = post_img && post_img[0] ? 
            await uploadPostImg(post_img[0]) : ''; */
            
        const newPost = {
            ...other,
            author_id: user.id,
        }
        return request.post('/api/post', newPost);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['home']);
        }
    });
}
