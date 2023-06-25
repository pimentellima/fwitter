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

const PostPage = () => {
  const { query } = useRouter();
  const router = useRouter();

  const redirectToAuthor = (e) => {
    e.stopPropagation();
    router.push("/" + author.username);
  };

  const { data: post } = useQuery(
    ["post", { post_id: query.pid }],
    async () =>
      axios.get(`../api/post/pid/${query.pid}`).then((res) => res.data),
    {
      enabled: !!query.pid,
    }
  );

  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const mutation = useMutation(
    async (data) => await axios.post("../api/comment", data)
  );

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

  if (!post) return <Spinner />;

  return (
    <>
      <div className="border-b border-slate-200">
        <Post post={post} />
      </div>
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
      {post?.comments.map(({ id, author, title, createdAt }) => (
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
                  onClick={redirectToAuthor}
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
      ))}
    </>
  );
};

PostPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default PostPage;
