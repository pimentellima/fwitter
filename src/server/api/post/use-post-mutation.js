import { useUser } from "@clerk/nextjs";
import { useSWRConfig } from "swr"

export const uploadPostImg = async (file) => {
     const formData = new FormData();
     formData.append("file", file);
     const res = await request.post('/upload/post/', formData);
     return res.data;
}

export const usePostMutation = () => {
    const { user } = useUser();
    const { mutate } = useSWRConfig()
    
    return (data) => {
        const { parent_post_id, post_img, ...other } = data;

        /* const fileUrl = post_img && post_img[0] ? 
            await uploadPostImg(post_img[0]) : ''; */
            
        const newPost = {
            ...other,
            author_id: user.id,
        }

        mutate('/api/post', newPost);
    }
}
