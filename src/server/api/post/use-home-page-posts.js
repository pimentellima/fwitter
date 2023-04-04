import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import useSWR from 'swr';

export const useHomePagePosts = () => {
    const { user } = useUser();

    const fetcher = url => axios.get(url)
        .then(res => res.data)
        .then(posts => posts.map(post => 
            ({...post, ingredients: JSON.parse(post.ingredients)})
        ));
    return useSWR(`api/post/authorid/${user?.id}`, fetcher);
}

