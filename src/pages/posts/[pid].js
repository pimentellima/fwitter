import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Post from "../../components/post";
import CommentForm from "../../components/commentForm";
import Comment from "../../components/comment";
import axios from "axios";

const PostPage = () => {
  const { query } = useRouter();

  const { data: post } = useQuery(
    ["post", { post_id: query.pid }],
    async () => axios.get(`../api/post/pid/${query.pid}`).then((res) => res.data),
    {
      enabled: !!query.pid,
    }
  );

  if (!post) return <Spinner />;

  return (
    <>
      <div className="border-b border-slate-200">
        <Post post={post} />
      </div>
      <CommentForm post_id={query.pid} />
      {post?.comments.map((comment) => (
        <div key={comment.id} className="border-b border-slate-200">
          <Comment comment={comment} />
        </div>
      ))}
    </>
  );
};

PostPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default PostPage;
