import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import Spinner from "../components/spinner";
import { getHomePagePostsByUserId } from "../server/helpers/get-posts";
import axios from "axios";
import defaultPicUrl from '../utils/defaultPicUrl'

const WritePost = ({ loggedUser }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(async data => {
    return await axios.post("api/post", data, {
      headers: { 'content-type': 'multipart/form-data' },
    })
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      title: "",
      ingredients: [{ name: "", qt: "", unity: "" }],
      file: []
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

  const onSubmit = data => {
    const { ingredients, file, title } = data;
    const ingredientsJSON = JSON.stringify(ingredients);

    mutation.mutate({
      title,
      ingredients: ingredientsJSON,
      author_id: loggedUser.id,
      file: file[0]
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries(["homePosts"]);
          queryClient.invalidateQueries(["profilePosts"]);
          reset();
        }
      }
    );
  };

  return (
    <div className="flex flex-row border-b border-stone-700 py-3">
      <img
        className="mx-4 h-12 w-12 rounded-full hover:cursor-pointer"
        src={loggedUser.imageUrl ? loggedUser.imageUrl : defaultPicUrl}
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
          className="mb-4 bg-inherit pl-2 text-lg text-stone-100 outline-none placeholder:text-stone-500 "
        />
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="mt-1 grid h-14 grid-flow-col grid-cols-6 rounded-md border border-stone-700 transition ease-out focus-within:border-stone-600 hover:border-stone-600"
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
        {imagePreview && (
          <div className="relative mr-5 mt-3">
            <img className="w-full rounded-xl" src={imagePreview} alt="" />
            <div
              onClick={() => reset({ file: [] })}
              className="remove-icon absolute top-0 z-10 ml-1 mt-1"
            >
              <XMarkIcon />
            </div>
          </div>
        )}
        <div className="mt-4 grid grid-cols-2">
          {!imagePreview && (
            <label htmlFor="file" className="post-icon">
              <PhotoIcon />
            </label>
          )}
          <input
            id='file'
            type="file"
            className="hidden"
            {...register("file")}
          />
          <button
            className={`col-start-2 h-10 w-28 justify-self-end rounded-3xl bg-stone-500 px-5 py-1 text-lg font-bold transition duration-100 ease-out
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

const HomePage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const { data: posts, isFetching: isFetchingPosts } = useQuery(
    ["homePosts"],
    () => getHomePagePostsByUserId(data?.user?.id),
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  if (status !== "authenticated" || isFetchingPosts) return <Spinner />;

  return (
    <>
      <WritePost loggedUser={data.user} />
      {posts?.map((post) => (
        <div className="border-b border-stone-700" key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </>
  );
};

HomePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
