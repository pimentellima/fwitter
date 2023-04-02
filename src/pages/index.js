import Layout from '../components/layout';
import Post from '../containers/post';
import WritePost from '../containers/writePost';
import { useGetHomePagePosts } from '../server/api/get-home-page-posts';

const Home = () => {

  const { data: posts, isFetching } = useGetHomePagePosts();

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

Home.getLayout = (page) => {
  return(
    <Layout>
      {page}
    </Layout>
  )
}

export default Home;