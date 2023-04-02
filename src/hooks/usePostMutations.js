import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query"
import { request } from "../utils/axios"

export const usePostMutations = (postId) => {
    const { user } = useUser();

    const createLikeMutation = useMutation(() =>
        request.post('/api/like'), {
            post_id: postId,
            author_id: user.id
        })

    const deleteLikeMutation = useMutation(() =>
        request.delete('/api/like'), {
            data: {
                post_id: postId,
                author_id: user.id
            }
        })

    return { createLikeMutation, deleteLikeMutation };
}