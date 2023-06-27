import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import CreatePostWizard from "../components/createPostWizard";
import Layout from "../components/layout";
import PostFeed from "../components/postFeed";

const HomePage = () => {
  const { data: session } = useSession();

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["homePosts"],
    async () => axios.get("api/post/home").then((res) => res.data)
  );

  return (
    <>
      <Head>
        <title>Início / Fwitter</title>
      </Head>
      <Layout>
        <div className="hidden grid-cols-[80px,minmax(0px,1fr)] border-b border-slate-200 py-3 sm:grid">
          <Image
            className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
            src={session?.user.imageUrl || defaultUserImg}
            alt=""
            width={40}
            height={40}
          />
          <CreatePostWizard />
        </div>
        <PostFeed posts={posts} isLoading={isLoadingPosts}/>
      </Layout>
    </>
  );
};

export default HomePage;
