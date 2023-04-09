import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCreatePostMutation } from "../server/api/post/post-mutations";
import { useQueryClient } from "react-query";

const WritePost = ({ userLoggedIn }) => {
  const [imgPreview, setImgPreview] = useState(null);
  const mutation = useCreatePostMutation();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      author_id: userLoggedIn.id,
      title: "",
      ingredients: [{ name: "", qt: "", unity: "" }],
      image: "",
    },
  });

  const {
    fields: ingredients,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const imgWatch = watch("image");

  useEffect(() => {
    if (imgWatch && imgWatch.length) {
      const url = URL.createObjectURL(imgWatch[0]);
      setImgPreview(url);
    } else setImgPreview("");
  }, [imgWatch]);

  const onSubmit = (data) => {
    mutation.mutate(
      { ...data, ingredients: JSON.stringify(data.ingredients) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["homePosts"]);
          queryClient.invalidateQueries(["profilePosts"]);
          reset();
        },
      }
    );
  };

  return (
    <div className="flex flex-row border-b border-stone-700 py-3">
      <img
        className="user-img hover:cursor-pointer"
        src={userLoggedIn?.profileImageUrl}
        alt="profileImage"
      />
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="mr-4 flex flex-col"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Que receita você está fazendo agora?"
          className="mb-4 bg-inherit pl-2 text-lg text-stone-100 outline-none placeholder:text-stone-500"
        />
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="mb-2 grid h-14 grid-flow-col grid-cols-6 rounded-md border border-stone-700 transition ease-out focus-within:border-stone-600 hover:border-stone-600"
          >
            <input
              {...register(`ingredients.${index}.name`, { required: true })}
              placeholder="Ingrediente"
              className="col-span-3 pl-2 placeholder:text-stone-500"
            />
            <input
              {...register(`ingredients.${index}.qt`, { required: true })}
              placeholder="Qtd"
              className="border-l border-stone-700 pl-2 placeholder:text-stone-500"
            />
            <input
              {...register(`ingredients.${index}.unity`, { required: true })}
              placeholder="Uni"
              className="border-l border-stone-700 pl-2 placeholder:text-stone-500"
            />
            {index === 0 ? (
              <button
                className="rounded-r-md border-stone-700 bg-stone-700 px-4 transition-colors ease-out hover:cursor-pointer hover:border-stone-600 hover:bg-stone-600 "
                onClick={() => append({ name: "", qt: "", unity: "" })}
              >
                +
              </button>
            ) : (
              <button
                className="rounded-r-md border-stone-700 bg-stone-700 px-4 transition-colors ease-out hover:cursor-pointer hover:border-stone-600 hover:bg-stone-600 "
                onClick={() => remove(index)}
              >
                -
              </button>
            )}
          </div>
        ))}
        {imgPreview && (
          <div className="relative mr-5 mt-3">
            <img className="w-full rounded-xl" src={imgPreview} alt="" />
            <div
              onClick={() => reset({ image: "" })}
              className="remove-icon absolute top-0 z-10 ml-1 mt-1"
            >
              <XMarkIcon />
            </div>
          </div>
        )}
        <div className="grid grid-cols-2">
          {!imgPreview && (
            <label htmlFor="image" className="post-icon">
              <PhotoIcon />
            </label>
          )}
          <input
            id="image"
            type="file"
            className="hidden"
            {...register("image")}
          />
          <button
            className={`fweet-btn col-start-2 w-28 justify-self-end
                        ${
                          isValid
                            ? "hover:bg-stone-600; hover:cursor-pointer"
                            : "cursor-default opacity-50"
                        }`}
          >
            Fweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
