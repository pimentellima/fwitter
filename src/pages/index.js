import { useUser } from "@clerk/nextjs";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import WritePost from "../components/writePost";
import {
  getHomePagePostsByUserId,
  getPostsByUserId,
} from "../server/api/post/get-posts";
import Reactions from "../components/reactions";
import PostView from "../components/postView";
import { useRouter } from "next/router";

const HomePage = () => {
  const { isFallback } = useRouter();
  const { user: userLoggedIn, isLoaded } = useUser();
  const { data: posts, isFetched } = useQuery(
    ["homePosts"],
    () => getHomePagePostsByUserId(userLoggedIn?.id),
    {
      enabled: !!userLoggedIn,
    }
  );

  if (isFallback || !isLoaded || !isFetched) return <Spinner />;

  return (
    <>
      <WritePost userLoggedIn={userLoggedIn} />
      {posts?.map((post) => (
        <div className="border-b border-stone-700" key={post.id}>
          <PostView post={post}>
            <Reactions post={post} />
          </PostView>
        </div>
      ))}
    </>
  );
};

HomePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
