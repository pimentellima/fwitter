import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { request } from '../utils/axios';
import Post from './post';
import Reactions from './reactions';

const Feed = () => {
    const { user } = useUser();

    const { data: posts, isFetching } = useQuery(['home'], () =>
        request.get(`api/post/authorid/${user.id}`).then(res => {
            const posts = res.data.map(post => (
                {...post, ingredients: JSON.parse(post.ingredients)}
            ))
            return posts;
        }
        ), {
            enabled: !!user
        })

    if(isFetching) return <></>

    return (
        <>
            {posts?.map(post => 
                <div 
                    className='border-b border-stone-700' 
                    key={post.id}
                    >
                    <Post post={post}>
                        <Reactions post={post}/>
                    </Post>
                </div>
            )}
        </>
    )
}

export default Feed;