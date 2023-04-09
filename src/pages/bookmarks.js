import { useQuery } from "react-query";
import Layout from "../components/layout";
import { getBookmarkedPostsByUserId } from "../server/api/post/get-posts";
import { useUser } from "@clerk/nextjs";
import PostView from "../components/postView";
import Reactions from "../components/reactions";
import Spinner from "../components/spinner";

const BookmarksPage = () => {
  const { user } = useUser();
  const { data: posts, isFetched } = useQuery(
    ["bookmarkedPosts"],
    () => getBookmarkedPostsByUserId(user?.id),
    {
      enabled: !!user,
    }
  );

  if (!isFetched) return <Spinner />;

  return (
    <>
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

BookmarksPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default BookmarksPage;
