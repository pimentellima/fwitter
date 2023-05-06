import { useQuery } from "react-query";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Post from "../components/post";
import { useLoggedUser } from "../server/helpers/get-user";
import axios from "axios";

const BookmarksPage = () => {
  const router = useRouter();
  const { status } = useSession()
  const { data: loggedUser } = useLoggedUser();

  const { data: posts, isFetching } = useQuery(
    ["bookmarkedPosts"],
    async () => axios.get(`api/post/bookmark/${loggedUser?.id}`).then((res) => res.data),
    {
      enabled: !!loggedUser,
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
