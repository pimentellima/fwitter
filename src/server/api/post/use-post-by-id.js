import axios from 'axios';
import useSWR from 'swr';

export const usePostById = (postId) => {
    const fetcher = url => axios.get(url)
        .then(res => res.data.map(post => (
            {...post, ingredients: JSON.parse(post.ingredients)}
        )))

    return useSWR(`api/post/${postId}`, fetcher);
}

