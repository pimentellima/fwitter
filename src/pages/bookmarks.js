import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import Head from "next/head";
import PostFeed from "../components/postfeed";

const BookmarksPage = () => {
  const { data: session } = useSession();

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["bookmarkedPosts"],
    async () =>
      axios.get(`api/post/bookmark/${session?.user.id}`).then((res) => res.data),
    {
      enabled: !!session?.user
    }
  );

  return (
    <>
      <Head>
        <title>Salvos / Fwitter</title>
      </Head>
      <Layout>
        <PostFeed posts={posts} isLoading={isLoadingPosts} />
      </Layout>
    </>
  );
};

export default BookmarksPage;
