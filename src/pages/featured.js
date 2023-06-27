import axios from "axios";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import PostFeed from "../components/postFeed";
import Head from "next/head";

const FeaturedPage = () => {
  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["featuredPosts"],
    async () => await axios.get("../api/post/featured").then((res) => res.data)
  );

  return (
    <>
      <Head>
        <title>Explorar / Fwitter</title>
      </Head>
      <Layout>
        <PostFeed posts={posts} isLoading={isLoadingPosts} />
      </Layout>
    </>
  );
};

export default FeaturedPage;
