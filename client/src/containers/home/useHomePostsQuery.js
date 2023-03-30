import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { request } from "../../utils/axios";

export const useHomePostsQuery = () => {
    const { currentUser } = useContext(AuthContext);

    return useQuery(['homePosts'], () =>
        request.get('/post/' + currentUser.id).then(res => 
            res.data
        ))
}
