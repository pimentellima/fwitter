import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getPostById } from "../../server/helpers/get-posts";
import Post from '../../components/post'
import CommentForm from "../../components/commentForm";
import { useSession } from "next-auth/react";
import defaultPicUrl from "../../utils/defaultPicUrl";
import Comment from "../../components/comment";
import { useLoggedUser } from "../../server/helpers/get-user";
import axios from "axios";

const PostPage = () => {
  const { data: loggedUser } = useLoggedUser();

  const { query } = useRouter();

  const { data: post } = useQuery(
    ["post", { post_id: query.pid }],
    async () => axios.get(`../api/post/${query.pid}`).then((res) => res.data), {
      enabled: !!query.pid
    }
  );

  if (!post) return <Spinner />;

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
        <CommentForm post_id={query.pid}/>
      </div>
      {post.comments?.map(comment => 
        <div
          key={comment.id}
          className="border-b border-stone-700"
        >
          <Comment comment={comment}/>
        </div>
      )}
    </>
  );
};

PostPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default PostPage;
