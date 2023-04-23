import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import Spinner from "../components/spinner";
import { getHomePagePostsByUserId } from "../server/api/post/get-posts";
import axios from "axios";

const WritePost = ({ loggedUser }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(async (body) => {
    return axios.post("api/post", { ...body });
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
      author_id: loggedUser.id,
      title: "",
      ingredients: [{ name: "", qt: "", unity: "" }],
      imageUrl: "",
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

  const imageWatch = watch("imageUrl");

  useEffect(() => {
    if (imageWatch?.length) {
      const url = URL.createObjectURL(imageWatch[0]);
      setImagePreview(url);
    } else setImagePreview("");
  }, [imageWatch]);

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
        src={loggedUser.profileImageUrl}
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
              onClick={() => reset({ imageUrl: "" })}
              className="remove-icon absolute top-0 z-10 ml-1 mt-1"
            >
              <XMarkIcon />
            </div>
          </div>
        )}
        <div className="mt-4 grid grid-cols-2">
          {!imagePreview && (
            <label htmlFor="image" className="post-icon">
              <PhotoIcon />
            </label>
          )}
          <input
            id="image"
            type="file"
            className="hidden"
            {...register("imageUrl")}
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
      <WritePost loggedUser={data.user}/>
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
