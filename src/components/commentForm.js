import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const CommentForm = ({ post_id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data) => await axios.post("api/comment", data)
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
      { title: data.title },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["postComments", { post_id }]);
          queryClient.invalidateQueries(["profilePosts"]);
          reset();
        },
      }
    );
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full"
    >
      <input
        {...register("title", { required: true })}
        placeholder="O que você achou dessa receita?"
        className="h-12 pl-2 text-lg
        text-stone-100 placeholder:text-stone-500 "
      />
      <div className="flex justify-end">
        <button
          className={`h-10 w-28 mr-3
            flex justify-center items-center rounded-3xl 
            bg-stone-500 px-5 py-1 text-base
            font-bold transition duration-100 ease-out
            ${
              isValid
                ? "hover:bg-stone-600 hover:cursor-pointer"
                : "cursor-default opacity-50"
            }`}
        >
          Comentar
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
