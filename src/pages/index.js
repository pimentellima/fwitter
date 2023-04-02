import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/layout';
import Post from '../containers/post';
import WritePost from '../containers/writePost';
import { getPostsByUserId } from '../server/api/post/get-posts-by-user-id';

const HomePage = () => {
  const { user } = useUser();

  const { data: posts, isFetching } = useQuery(['home'], () =>
      getPostsByUserId(user.id), {
          enabled: !!user
      })

  if(isFetching) return <></>

    return (
        <>
          <header className='main-header'>
            Inicio
          </header> 
          <WritePost/>
          {posts?.map(post => 
                <div 
                    className='border-b border-stone-700' 
                    key={post.id}
                    >
                    <Post post={post}/>
                </div>
            )}
        </>
    )
}

HomePage.getLayout = (page) => {
  return(
    <Layout>
      {page}
    </Layout>
  )
}

export default HomePage;