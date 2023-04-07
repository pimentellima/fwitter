import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useCreatePost } from "./useCreatePost";

const WriteComment = ({ parent_post_id }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      ingredients: "",
      image: "",
    },
  });

  const { user } = useUser();

  const queryClient = useQueryClient();

  const createCommentMutation = useCreatePost({
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      onClose();
      reset();
    },
  });

  const onSubmit = (data) => {
    createCommentMutation.mutate(data);
  };

  return (
    <form
      autoComplete="off"
      className="flex flex-col bg-inherit py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="my-2 flex flex-row">
        <img
          className="user-img hover:cursor-pointer"
          src={user?.profileImageUrl}
          alt="profileImage"
        />
        <div className="flex w-full items-center pr-4">
          <input
            placeholder="Comente algo ..."
            className="border-stone "
            {...register("title")}
          />
          <button
            className={`fweet-btn col-start-2 w-28 justify-self-end
                        ${isValid ? "btn-valid" : "btn-invalid"}`}
          >
            Fweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default WriteComment;
