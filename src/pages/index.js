import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import PostForm from "../components/postForm";
import Spinner from "../components/spinner";
import { getHomePagePostsByUserId } from "../server/helpers/get-posts";
import defaultPicUrl from '../utils/defaultPicUrl';

const HomePage = () => {
  const { data, status } = useSession();
  const loggedUser = data?.user;
  const router = useRouter();

  const { data: posts, isFetching: isFetchingPosts } = useQuery(
    ["homePosts"],
    () => getHomePagePostsByUserId(data?.user?.id),
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  if (status !== "authenticated" || isFetchingPosts) return <Spinner />;

  return (
    <>
      <div className="flex flex-row border-b border-stone-700 py-3">
        <img
          className="mx-4 h-12 w-12 rounded-full hover:cursor-pointer"
          src={loggedUser.imageUrl ? loggedUser.imageUrl : defaultPicUrl}
          alt=''
        />
        <PostForm loggedUser={data.user} />
      </div>
      {posts.map((post) => (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            router.push('/posts/' + post.id);
          }}
          className="border-b border-stone-700 hover:backdrop-brightness-105 hover:cursor-pointer"
          key={post.id}
          >
          <Post post={post}/>
        </div>
      ))}
    </>
  );
};

HomePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
