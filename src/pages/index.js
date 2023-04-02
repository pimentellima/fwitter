import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/layout';
import Spinner from '../components/spinner';
import Post from '../containers/post';
import WritePost from '../containers/writePost';
import { getPostsByUserId } from '../server/api/post/get-posts-by-user-id';

const HomePage = () => {
  const { user, isLoaded} = useUser();

  const { data: posts, isLoading } = useQuery(['home'], () =>
      getPostsByUserId(user.id), {
          enabled: !!user
      })

    return (
        <>
          <header className='main-header'>
            Inicio
          </header> 
          <div className='h-48 border-b border-stone-700'>
            {isLoaded ?
             <WritePost/>
             :
             <Spinner center={true}/>
             }
          </div>
          {isLoading ?
            <Spinner/>
            :
            posts?.map(post => 
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