import { useQuery } from "react-query";
import Layout from "../components/layout";
import { getBookmarkedPostsByUserId } from "../server/helpers/get-posts";
import Spinner from "../components/spinner";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Post from "../components/post";
import { useLoggedUser } from "../server/helpers/get-user";

const BookmarksPage = () => {
  const router = useRouter();
  const { data, status } = useSession()
  const { data: loggedUser } = useLoggedUser();

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
      {posts.map((post) => (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            router.push('/posts/' + post.id);
          }}
          className="border-b border-stone-700 hover:backdrop-brightness-105 hover:cursor-pointer"
          key={post.id}
          >
          <Post loggedUser={loggedUser} post={post}/>
        </div>
      ))}
    </>
  );
};

BookmarksPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default BookmarksPage;
