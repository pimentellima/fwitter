import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import PostForm from "../components/postForm";
import Spinner from "../components/spinner";

const HomePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["homePosts"],
    async () => axios.get("api/post/home").then((res) => res.data)
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  return (
    <>
      <PostForm />
      {isLoadingPosts ? (
        <div className="flex justify-center pt-5">
          <Spinner />
        </div>
      ) : posts?.length === 0 ? (
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
            <Post post={post} />
          </div>
        ))
      )}
    </>
  );
};

HomePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
