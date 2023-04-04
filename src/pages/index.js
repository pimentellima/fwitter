import { useUser } from '@clerk/nextjs';
import Layout from '../components/layout';
import Spinner from '../components/spinner';
import Post from '../containers/post';
import WritePost from '../containers/writePost';
import { useHomePagePosts } from '../server/api/post/use-home-page-posts';

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const { data: posts, isLoading } = useHomePagePosts();
  if(!isLoaded || isLoading) return <Spinner/>

  return (
      <>
        <header className='main-header'>
          Inicio
        </header> 
        <WritePost user={user}/>
          {posts?.map(post => 
            <div 
              className='border-b border-stone-700' 
              key={post.id}
              >
              <Post post={post}/>
            </div>)}
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