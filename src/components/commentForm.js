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
            transition duration-100 ease-out enabled:hover:bg-sky-600 text-white
            disabled:opacity-70 disabled:hover:cursor-default ">
            Comentar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
