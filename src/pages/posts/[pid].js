import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getPostById } from "../../server/helpers/get-posts";
import Post from '../../components/post'
import CommentForm from "../../components/commentForm";
import { useSession } from "next-auth/react";
import defaultPicUrl from "../../utils/defaultPicUrl";

const PostPage = () => {
  const { data } = useSession();
  const loggedUser = data?.user;

  const { query } = useRouter();
  const { data: post, isLoading } = useQuery(
    ["post", { post_id: query.pid }],
    () => getPostById(query.pid), {
      enabled: !!query.pid
    }
  );

  if (isLoading || !post) return <Spinner />;

  return (
    <>
      <div className='border-b border-stone-700'>
        <Post post={post}/>
      </div>
      <div className='flex flex-row py-3 border-b border-stone-700'>
        <img
          className="mx-4 h-12 w-12 rounded-full hover:cursor-pointer"
          src={loggedUser?.imageUrl ? loggedUser.imageUrl : defaultPicUrl}
          alt="profileImage"
        />
        <CommentForm post_id={post.id}/>
      </div>
    </>
  );
};

PostPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default PostPage;