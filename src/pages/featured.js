import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Post from "../components/post";
import Layout from "../components/layout";
import Spinner from "../components/spinner";

const Featured = () => {
  const router = useRouter();
  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["featuredPosts"],
    async () => await axios.get("../api/post/featured").then((res) => res.data)
  );

  if (isLoadingPosts)
    return (
      <div className="flex justify-center pt-5">
        <Spinner />
      </div>
    );

  return (
    <>
      {posts?.length === 0 ? (
        <div className="mt-2 flex justify-center text-lg">
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

Featured.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Featured;
