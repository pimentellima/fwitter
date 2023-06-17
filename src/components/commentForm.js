import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import defaultUserImg from '../../public/static/defaultUserImg.jpg'
import { useSession } from "next-auth/react";
import Image from "next/image";

const CommentForm = ({ post_id }) => {

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
    <div className="grid grid-cols-[80px,minmax(0px,1fr)] border-b border-stone-700 py-3">
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
        className="flex w-full flex-col"
      >
        <input
          {...register("title", { required: true })}
          placeholder="O que você achou dessa receita?"
          className="h-12 bg-inherit pl-2 text-lg text-stone-100
          placeholder:text-stone-500 focus:outline-none "
        />
        <div className="flex justify-end">
          <button
            disabled={!isValid}
            className="mr-3 flex h-10
              w-28 items-center justify-center rounded-3xl 
              bg-stone-600 px-5 py-1 text-base font-bold
              transition duration-100 ease-out hover:bg-stone-500
              disabled:opacity-70 disabled:hover:cursor-default disabled:hover:bg-stone-600"
          >
            Comentar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
