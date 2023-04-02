import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query"
import { request } from "../../utils/axios"

export const usePostActions = (postId) => {
    const { user } = useUser();

    const createLikeMutation = useMutation(() =>
        request.post('/api/like', {
            post_id: postId,
            author_id: user.id
        }))

    const deleteLikeMutation = useMutation(() =>
        request.delete('/api/like', {
            data: {
                post_id: postId,
                author_id: user.id
            }
        }))

    const createBookmarkMutation = useMutation(() =>
        request.post('/api/bookmark', {
            post_id: postId,
            author_id: user.id
        }))

    const deleteBookmarkMutation = useMutation(() =>
        request.delete('/api/bookmark', {
            data: {
                post_id: postId,
                author_id: user.id
            }
        }))

    const createShareMutation = useMutation(() =>
        request.post('/api/share', {
            post_id: postId,
            author_id: user.id
        }))

    const deleteShareMutation = useMutation(() =>
        request.delete('/api/share', {
            data: {
                post_id: postId,
                author_id: user.id
            }
        }))

    return { 
        createLikeMutation, 
        deleteLikeMutation,
        createBookmarkMutation,
        deleteBookmarkMutation,
        createShareMutation,
        deleteShareMutation
     };
}