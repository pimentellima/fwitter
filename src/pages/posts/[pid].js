import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import defaultUserImg from "../../../public/static/defaultUserImg.jpg";
import Layout from "../../components/layout";
import Post from "../../components/post";
import Spinner from "../../components/spinner";
import Head from "next/head";

const CreateCommentWizard = () => {
  const router = useRouter();
  const query = router.query;
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data) => await axios.post("../api/comment", data)
  );
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(
      { title: data.title, post_id: query.pid },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["post", { post_id: query.pid }]);
          reset();
        },
      }
    );
  };
  return (
    <div className="grid grid-cols-[80px,minmax(0px,1fr)] border-b border-slate-200 py-3">
      <Image
        className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
        width={40}
        height={40}
        src={session?.user.imageUrl || defaultUserImg}
        alt="profileImage"
      />
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col pr-3"
      >
        <input
          {...register("title", { required: true })}
          maxLength={35}
          placeholder="Comente algo..."
          className="h-12 bg-inherit pl-2 text-xl
          placeholder:text-gray-500 focus:outline-none "
        />
        <div className="flex justify-end">
          <button
            disabled={!isValid}
            className="flex h-9 items-center
            justify-center rounded-3xl 
            bg-sky-500 px-5 text-base font-bold
            text-white transition duration-100 ease-out enabled:hover:bg-sky-600
            disabled:opacity-70 disabled:hover:cursor-default "
          >
            Comentar
          </button>
        </div>
      </form>
    </div>
  );
};

const CommentFeed = ({ comments }) => {
  const router = useRouter();

  if (!comments) return <></>;

  return comments.map(({ id, author, title, createdAt }) => (
    <div key={id} className="border-b border-slate-200">
      <div className="mb-1 mt-3 grid grid-cols-[80px,minmax(0px,1fr)]">
        <Image
          className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
          width={40}
          height={40}
          src={author.imageUrl || defaultUserImg}
          alt="profileImage"
        />
        <div className="flex flex-col pb-2">
          <div className="flex w-full justify-between">
            <div
              onClick={(e) => {
                e.stopPropagation();
                router.push("/" + author.username);
              }}
              className="flex w-full items-center gap-2 hover:cursor-pointer"
            >
              <span
                className=" overflow-hidden text-ellipsis whitespace-nowrap
           font-bold hover:cursor-pointer hover:underline"
              >
                {author.name}
              </span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
                {`@${author.username} · ${moment(createdAt).fromNow(true)}`}
              </span>
            </div>
          </div>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-800">
            {title}
          </span>
        </div>
      </div>
    </div>
  ));
};

const PostPage = () => {
  const { query } = useRouter();

  const { data: post } = useQuery(
    ["post", { post_id: query.pid }],
    async () =>
      axios.get(`../api/post/pid/${query.pid}`).then((res) => res.data),
    {
      enabled: !!query.pid,
    }
  );

  return (
    <>
      <Head>
        <title>Fweet</title>
      </Head>
      <Layout>
        {post ? (
          <>
            <div className="border-b border-slate-200">
              <Post post={post} />
            </div>
            <CreateCommentWizard />
            <CommentFeed comments={post.comments} />
          </>
        ) : (
          <Spinner />
        )}
      </Layout>
    </>
  );
};

export default PostPage;
