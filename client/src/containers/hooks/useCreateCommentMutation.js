import { useMutation } from "@tanstack/react-query";
import { request } from "../../utils/axios";
import { useCreatePostMutation } from "./useCreatePostMutation"

export const useCreateCommentMutation = () => {
    const createPostMutation = useCreatePostMutation();

    const createComment = async (parent_post_id, post_id) => {
        const comment = await request.post('/post/comment', {
            parent_post_id,
            post_id
        });
        return comment.data;
    }

    return useMutation(async data => {
        const { parent_post_id } = data;
        const post = await createPostMutation(data);
        createComment(parent_post_id, post.id);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['homePosts']);
            queryClient.invalidateQueries(['profilePosts']);
            queryClient.invalidateQueries(['comments']);
        }
    })

}