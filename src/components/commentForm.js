import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const CommentForm = ({ post_id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data) => 
    await axios.post("../api/comment", data)
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
      { title: data.title, post_id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["post", { post_id }]);
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
        className="bg-inherit focus:outline-none h-12 pl-2 text-lg
        text-stone-100 placeholder:text-stone-500 "
      />
      <div className="flex justify-end">
        <button
          disabled={!isValid}
          className='h-10 w-28 mr-3
            flex justify-center items-center rounded-3xl 
            bg-stone-600 px-5 py-1 text-base hover:bg-stone-500
            font-bold transition duration-100 ease-out
            disabled:hover:cursor-default disabled:hover:bg-stone-600 disabled:opacity-70'
        >
          Comentar
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
