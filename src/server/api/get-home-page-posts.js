import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../utils/axios";

export const useGetHomePagePosts = () => {
    const { user } = useUser();

    return useQuery(['home'], () =>
        request.get(`api/post/authorid/${user.id}`).then(res => {
            const posts = res.data.map(post => (
                {...post, ingredients: JSON.parse(post.ingredients)}
            ))
            return posts;
        }
        ), {
            enabled: !!user
        })
}