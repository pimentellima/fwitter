import { MinusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const PostForm = ({ closeModal = () => {} }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data) => {
    return await axios.post("api/post", data, {
      headers: { "content-type": "multipart/form-data" },
    });
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      ingredients: [],
      file: [],
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

  const fileWatch = watch("file");

  useEffect(() => {
    if (fileWatch?.length) {
      const url = URL.createObjectURL(fileWatch[0]);
      setImagePreview(url);
    } else setImagePreview("");
  }, [fileWatch]);

  const onSubmit = (data) => {
    const { ingredients, file, title } = data;
    const ingredientsJSON = JSON.stringify(ingredients);

    mutation.mutate(
      {
        title,
        ingredients: ingredientsJSON,
        file: file[0],
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["homePosts"]);
          queryClient.invalidateQueries(["profilePosts"]);
          closeModal()
          reset();
        },
      }
    );
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col"
    >
      <input
        {...register("title", {
          required: true,
        })}
        maxLength={35}
        placeholder="Que receita você está fazendo?"
        className="mr-4 flex flex-col overflow-clip rounded-md bg-inherit p-2
          text-lg text-stone-100 placeholder:text-stone-500 focus:outline-none"
      />
      {errors.title && (
        <span className="text-sm text-red-600">{errors.title.message}</span>
      )}
      <div className="mt-3">
        {ingredients.map((ingredient, index) => (
          <div
            className="mt-1 grid grid-flow-row grid-cols-[9fr,1fr]"
            key={ingredient.id}
          >
            <div
              className=" grid grid-cols-3 rounded-md border border-stone-700 px-2 py-4
                    transition ease-out focus-within:ring-1
                    focus-within:ring-stone-500"
            >
              <input
                {...register(`ingredients.${index}.name`, { required: true })}
                placeholder="Ingrediente"
                className="w-full bg-transparent placeholder:text-stone-500 focus:outline-none"
              />
              <input
                {...register(`ingredients.${index}.qt`, { required: true })}
                placeholder="Quantidade"
                type="number"
                className="w-full bg-transparent placeholder:text-stone-500 focus:outline-none"
              />
              <select
                {...register(`ingredients.${index}.unity`, { required: true })}
                required
                className="w-full bg-stone-800
                invalid:text-stone-500 focus:outline-none [&_*]:bg-inherit [&_option]:text-stone-300"
              >
                <option disabled hidden value="">
                  Unidade
                </option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="tbsp">Tbsp</option>
                <option value="tsp">tsp</option>
                <option value="inteiro">inteiro</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button type="button" onClick={() => remove(index)}>
                <MinusCircleIcon width={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {imagePreview && (
        <div className="relative mr-5 mt-3">
          <img
            className="max-h-96 max-w-full rounded-xl"
            src={imagePreview}
            alt=""
          />
          <div
            onClick={() => reset({ file: [] })}
            className="absolute top-0 z-10 ml-1 
                mt-1 h-9 w-9 rounded-full 
                bg-black bg-opacity-60 p-2 
                transition duration-150 ease-in hover:cursor-pointer hover:bg-opacity-40"
          >
            <XMarkIcon />
          </div>
        </div>
      )}
      <div className="mt-6 grid grid-cols-3 place-items-center">
        <button
          disabled={ingredients?.length > 8}
          type="button"
          onClick={() => append({ name: "", qt: "", unity: "" })}
        >
          Adicionar ingrediente
        </button>
        <label htmlFor="file" className="hover:cursor-pointer">
          Adicionar imagem
        </label>
        <input id="file" type="file" className="hidden" {...register("file")} />
        <button
          disabled={!isValid}
          className="mr-3 flex h-10 items-center
            justify-center rounded-3xl 
            bg-stone-600 px-5 py-1 text-base font-bold
            transition duration-100 ease-out hover:bg-stone-500
            disabled:opacity-70 disabled:hover:cursor-default disabled:hover:bg-stone-600"
        >
          Fweet
        </button>
      </div>
    </form>
  );
};

export default PostForm;
