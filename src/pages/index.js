import Header from '../components/header';
import Layout from '../components/layout';
import WritePost from '../containers/writePost';
import Feed from '../containers/feed';
import { useUser } from '@clerk/nextjs';

const Home = () => {
    const { isLoaded: userLoaded } = useUser();

    if(!userLoaded) return <></>

    return (
        <>
            <Header>
                Inicio
            </Header>
            <WritePost/>
           <Feed/>
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