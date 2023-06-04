import { useQuery } from "react-query";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Post from "../components/post";
import axios from "axios";

const BookmarksPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession();

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["bookmarkedPosts"],
    async () =>
      axios.get(`api/post/bookmark/${session?.user.id}`).then((res) => res.data),
    {
      enabled: !!session?.user
    }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  if (isLoadingPosts) return <Spinner />;

  return (
    <>
      {posts?.length === 0 ? (
        <div className="mt-2 flex justify-center text-xl">
          Não há receitas para exibir
        </div>
      ) : (
        posts?.map((post) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push("/posts/" + post.id);
            }}
            className="border-b border-stone-700 hover:cursor-pointer hover:backdrop-brightness-105"
            key={post.id}
          >
            <Post post={post}/>
          </div>
        ))
      )}
    </>
  );
};

BookmarksPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default BookmarksPage;
