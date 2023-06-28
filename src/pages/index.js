import axios from "axios";
import Head from "next/head";
import { useQuery } from "react-query";
import CreatePost from "../components/createpost";
import Layout from "../components/layout";
import PostFeed from "../components/postfeed";

const HomePage = () => {
  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["homePosts"],
    async () => axios.get("api/post/home").then((res) => res.data)
  );

  return (
    <>
      <Head>
        <title>Início / Fwitter</title>
      </Head>
      <Layout>
        <div className="hidden sm:block border-b py-2">
          <CreatePost />
        </div>
        <PostFeed posts={posts} isLoading={isLoadingPosts} />
      </Layout>
    </>
  );
};

export default HomePage;
