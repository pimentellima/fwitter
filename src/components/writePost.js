import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCreatePostMutation } from "../server/api/post/post-mutations";

const WritePost = ({ userLoggedIn }) => {
  const [imgPreview, setImgPreview] = useState(null);
  const mutation = useCreatePostMutation();

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
    mutation.mutate({...data, ingredients: JSON.stringify(data.ingredients)});
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
        className="mr-4 flex flex-col gap-2"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Que receita você está fazendo agora?"
          className="mb-4 text-lg text-white"
        />
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="grid h-14 grid-flow-col grid-cols-6 border border-stone-700 hover:border-stone-600 focus-within:border-stone-600 rounded-md transition ease-out"
          >
            <input
              {...register(`ingredients.${index}.name`)}
              placeholder="Ingrediente"
              className=" col-span-3"
            />
            <input
              {...register(`ingredients.${index}.qt`)}
              placeholder="Qtd"
              className="border-l border-stone-700"
            />
            <input
              {...register(`ingredients.${index}.unity`)}
              placeholder="Uni"
              className="border-l border-stone-700"
            />
            {index === 0 ? (
              <button
                className="rounded-r-md border-stone-700 hover:border-stone-600 px-4 transition-colors ease-out hover:cursor-pointer bg-stone-700 hover:bg-stone-600 "
                onClick={() => append({ name: "", qt: "", unity: "" })}
              >
                +
              </button>
            ) : (
              <button
                className="rounded-r-md border-stone-700 hover:border-stone-600 px-4 transition-colors ease-out hover:cursor-pointer bg-stone-700 hover:bg-stone-600 "
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
                        ${isValid ? "btn-valid" : "btn-invalid"}`}
          >
            Fweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
