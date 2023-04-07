import { useUser } from "@clerk/nextjs";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import Spinner from "../components/spinner";
import WritePost from "../components/writePost";
import { getPostsByUserId } from "../server/api/post/get-posts";

const HomePage = () => {
  const { user: userLoggedIn, isLoaded } = useUser();
  const { data: posts, isFetched } = useQuery(['homePosts'], () => getPostsByUserId(userLoggedIn?.id), {
    enabled: isLoaded
  });

  if (!isLoaded || !isFetched) return <Spinner />;

  return (
    <>
      <WritePost userLoggedIn={userLoggedIn} />
      {posts?.map((post) => (
        <div className="border-b border-stone-700" key={post.id}>
          <Post {...{post, userLoggedIn}}/>
        </div>
      ))}
    </>
  );
};

HomePage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  );
};

export default HomePage;
