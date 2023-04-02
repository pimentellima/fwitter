import { useMutation } from "@tanstack/react-query"
import { request } from "../../../utils/axios";

export const useFollowMutations = ({ userId, userLoggedIn }) => {
    const createFollowMutation = useMutation(() => 
        request.post('/api/follow', {
            follower_id: userLoggedIn,
            followed_id: userId
        })
    )

    const deleteFollowMutation = useMutation(() => 
        request.delete('/api/follow', {
            data: {
                follower_id: userLoggedIn,
                followed_id: userId
            }
        })
    )

    return { createFollowMutation, deleteFollowMutation }
}