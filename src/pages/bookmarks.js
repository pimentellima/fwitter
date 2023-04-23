import { useQuery } from "react-query";
import Layout from "../components/layout";
import { getBookmarkedPostsByUserId } from "../server/api/post/get-posts";
import Spinner from "../components/spinner";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Post from "../components/post";

const BookmarksPage = () => {
  const router = useRouter();
  const { data, status } = useSession()

  const { data: posts, isFetching } = useQuery(
    ["bookmarkedPosts"],
    () => getBookmarkedPostsByUserId(data?.user.id),
    {
      enabled: status === 'authenticated',
    }
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status])

  if (isFetching || status === 'loading') return <Spinner />;

  return (
    <>
      {posts?.map((post) => (
        <div className="border-b border-stone-700" key={post.id}>
          <Post post={post}/>
        </div>
      ))}
    </>
  );
};

BookmarksPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default BookmarksPage;
