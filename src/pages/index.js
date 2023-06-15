import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import PostForm from "../components/postForm";
import Spinner from "../components/spinner";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import { useSession } from "next-auth/react";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["homePosts"],
    async () => axios.get("api/post/home").then((res) => res.data)
  );

  return (
    <>
      <div className="hidden border-b border-stone-700 sm:grid grid-cols-[80px_auto] py-3">
        <Image
          className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
          src={session?.user.imageUrl || defaultUserImg}
          alt=""
          width={50}
          height={50}
        />
        <PostForm />
      </div>
      {isLoadingPosts ? (
        <div className="flex justify-center pt-5">
          <Spinner />
        </div>
      ) : posts?.length === 0 ? (
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

HomePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
