import {
  MinusCircleIcon,
  PhotoIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const PostForm = ({ closeModal = () => {} }) => {
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
  const url = fileWatch.length ? URL.createObjectURL(fileWatch[0]) : "";

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
          closeModal();
          reset();
        },
      }
    );
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col px-2"
    >
      <input
        {...register("title", {
          required: true,
        })}
        maxLength={35}
        placeholder="Que receita você está fazendo?"
        className="mr-4 flex flex-col overflow-clip rounded-md bg-inherit py-2
          text-xl placeholder:text-gray-500 focus:outline-none"
      />
      {errors.title && (
        <span className="text-sm text-red-600">{errors.title.message}</span>
      )}
      <div className="pb-4 pt-2">
        {ingredients.map((ingredient, index) => (
          <div
            className="mt-1 grid grid-flow-row grid-cols-[9fr,1fr]"
            key={ingredient.id}
          >
            <div
              className=" grid grid-cols-3 rounded-md border border-gray-300 px-2 py-4
                    transition ease-out focus-within:ring-1
                    focus-within:ring-sky-400"
            >
              <input
                {...register(`ingredients.${index}.name`, { required: true })}
                placeholder="Ingrediente"
                className="w-full bg-transparent placeholder:text-gray-500 focus:outline-none"
              />
              <input
                {...register(`ingredients.${index}.qt`, { required: true })}
                placeholder="Quantidade"
                type="number"
                className="w-full bg-transparent placeholder:text-gray-500 focus:outline-none"
              />
              <select
                {...register(`ingredients.${index}.unity`, { required: true })}
                required
                className="w-full
                invalid:text-gray-500 focus:outline-none [&_*]:bg-inherit [&_option]:text-slate-950"
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
            <div className="flex items-center justify-center text-sky-600">
              <button type="button" onClick={() => remove(index)}>
                <MinusCircleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {url && (
        <div className="relative mr-5 mt-3 pb-3">
          <img src={url} className="max-h-96 max-w-full rounded-xl" alt="" />
          <div
            onClick={() => reset({ file: [] })}
            className="absolute top-0 z-10 ml-1 
                mt-1 h-9 w-9 rounded-full 
                bg-gray-200 bg-opacity-50 p-2 
                transition duration-150 
                ease-in hover:cursor-pointer hover:bg-opacity-40"
          >
            <XMarkIcon />
          </div>
        </div>
      )}
      <div className="flex justify-between border-t border-slate-200 pt-2 text-sky-600">
        <div className="flex items-center justify-center gap-5">
          <button
            disabled={ingredients?.length > 7}
            type="button"
            onClick={() => append({ name: "", qt: "", unity: "" })}
          >
            <PlusCircleIcon className="h-5 w-5" />
          </button>
          <label className="hover:cursor-pointer">
            <input type="file" className="hidden" {...register("file")} />
            <PhotoIcon className="h-5 w-5" />
          </label>
        </div>
        <button
          disabled={!isValid}
          className="flex h-9 items-center
            justify-center rounded-3xl 
            bg-sky-500 px-5 text-base font-bold
            text-white transition duration-100 ease-out enabled:hover:bg-sky-600
            disabled:opacity-70 disabled:hover:cursor-default "
        >
          Fweet
        </button>
      </div>
    </form>
  );
};

export default PostForm;
