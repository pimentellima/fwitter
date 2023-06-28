import { useRouter } from "next/router";
import Post from "./post";
import Spinner from "./spinner";

const PostFeed = ({ posts, isLoading }) => {
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex justify-center pt-5">
        <Spinner />
      </div>
    );

  if (posts?.length === 0)
    return (
      <div className="mt-2 flex justify-center text-lg">
        Não há receitas para exibir
      </div>
    );

  return posts?.map((post) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push("/posts/" + post.id);
      }}
      className="border-b border-slate-200 hover:cursor-pointer hover:bg-gray-100"
      key={post.id}
    >
      {post.type === "share" && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            router.push("/" + post.shareAuthor.username);
          }}
          className="ml-5 overflow-hidden text-ellipsis whitespace-nowrap text-sm 
              font-medium text-gray-400 hover:cursor-pointer hover:underline
              "
        >
          {`Refweetado por ${post.shareAuthor?.name}`}
        </span>
      )}
      <Post post={post} />
    </div>
  ));
};

export default PostFeed;
