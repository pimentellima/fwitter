import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import Spinner from "../components/spinner";

const BookmarksPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["bookmarkedPosts"],
    async () =>
      axios.get(`api/post/bookmark/${session?.user.id}`).then((res) => res.data),
    {
      enabled: !!session?.user
    }
  );

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
