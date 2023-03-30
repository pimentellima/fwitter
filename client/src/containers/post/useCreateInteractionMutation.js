import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { request } from "../../utils/axios"

export const useCreateInteractionMutation = ({ queryKey, endpoint, post_id } = {}) => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    return useMutation(() => 
        request.post(endpoint, {
            post_id,
            author_id: currentUser.id
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries(queryKey)
            }
        })
    )
}