import { ArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Popup from "reactjs-popup";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import Layout from "../components/layout";
import PostFeed from "../components/postFeed";
import Spinner from "../components/spinner";

const EditProfileWizard = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const { data: session, update } = useSession();

  const mutation = useMutation(
    async (data) =>
      await axios.put("../api/user", data, {
        headers: { "content-type": "multipart/form-data" },
      })
  );

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: session?.user.name,
      bio: session?.user.bio,
      file: [],
    },
  });

  const imageWatch = watch("file");
  const url = imageWatch?.length
    ? URL.createObjectURL(imageWatch[0])
    : session?.user.imageUrl;

  const onSubmit = (data) => {
    mutation.mutate(
      {
        ...data,
        file: data.file ? data.file[0] : null,
      },
      {
        onSuccess: async ({ data }) => {
          console.log(data);
          await update({
            name: data.name,
            imageUrl: data.imageUrl,
          });
          queryClient.invalidateQueries([
            "profileUser",
            { username: session?.user?.username },
          ]);
          closeModal();
        },
      }
    );
  };

  return (
    <form
      autoComplete="off"
      className="flex h-screen w-screen flex-col bg-white pb-14 text-slate-950 sm:h-auto sm:w-[600px] sm:rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-8">
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="h-10 w-10 rounded-full p-2 transition-all hover:bg-slate-100" />
          </button>
          <p className="text-xl font-semibold">Editar perfil</p>
        </div>
        <button
          disabled={!isValid}
          className={`mr-2 h-8 cursor-pointer rounded-full
              border border-gray-300 bg-gray-900 px-4 font-semibold
              text-white
              transition-colors enabled:hover:bg-gray-700 disabled:bg-gray-500 
              disabled:opacity-90 disabled:hover:cursor-default`}
        >
          Salvar
        </button>
      </div>
      <div className="relative h-64">
        <div className="absolute flex h-44 w-full items-center justify-center bg-slate-300" />
        <input id="file" className="hidden" type="file" {...register("file")} />
        <div className="absolute top-1/2 flex h-32 w-32 items-center justify-center">
          <div className="absolute z-20 h-full w-full p-4">
            <Image
              className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
              width={120}
              height={120}
              src={url || defaultUserImg}
              alt=""
            />
          </div>
          <label
            htmlFor="file"
            className="absolute z-30 h-10 
                          w-10 rounded-full bg-gray-100 bg-opacity-50 
                          p-2 hover:cursor-pointer hover:bg-opacity-40"
          >
            <ArrowUpIcon />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <label htmlFor="name">Nome</label>
        <input
          {...register("name", { required: true })}
          name="name"
          className="h-12 rounded-lg border border-gray-300 bg-inherit
              pl-2 text-lg transition
              placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
          placeholder="Digite aqui... "
        />
        <label htmlFor="bio">Biografia</label>
        <input
          {...register("bio")}
          name="bio"
          className="h-12 rounded-lg border border-gray-300 bg-inherit
              pl-2 text-lg transition
              placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
          placeholder="Digite aqui... "
        />
      </div>
    </form>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  const query = router.query;
  const { data: session } = useSession();
  const followMutation = useMutation(
    async (data) => await axios.post("/api/follow", { ...data })
  );
  const unfollowMutation = useMutation(
    async (data) => await axios.delete("/api/follow", { ...data })
  );

  const { data: profileUser } = useQuery(
    ["profileUser", { username: query?.username }],
    async () =>
      axios.get(`api/profile/${query?.username}`).then((res) => res.data),
    {
      enabled: !!query.username,
    }
  );

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    ["profilePosts", { username: query?.username }],
    async () =>
      axios.get("api/post/authorid/" + profileUser?.id).then((res) => res.data),
    {
      enabled: !!profileUser,
    }
  );

  const [followers, setFollowers] = useState(0);
  const [isFollowedByUser, setIsFollowedByUser] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const isCurrentUser = profileUser?.id === session?.user.id;
  const following = profileUser?.following.length;

  const handleFollow = () => {
    followMutation.mutate({
      follower_id: session?.user.id,
      followed_id: profileUser?.id,
    });
    setIsFollowedByUser(true);
    setFollowers((n) => ++n);
  };

  const handleUnfollow = () => {
    unfollowMutation.mutate({
      data: {
        follower_id: session?.user.id,
        followed_id: profileUser?.id,
      },
    });
    setIsFollowedByUser(false);
    setFollowers((n) => --n);
  };

  useEffect(() => {
    if (profileUser) {
      setFollowers(profileUser?.followers.length);
      setIsFollowedByUser(
        profileUser?.followers.filter(
          (follow) => follow.follower_id === session?.user.id
        ).length > 0
      );
    }
  }, [profileUser]);

  return (
    <>
      <Head>
        <title>{`${profileUser?.username} / Fwitter`}</title>
      </Head>
      <Layout>
        <Popup
          onClose={() => setProfileModal(false)}
          open={profileModal}
          modal
          lockScroll
          overlayStyle={{
            backgroundColor: "rgba(0,0,0, 0.3)",
          }}
        >
          <EditProfileWizard closeModal={() => setProfileModal(false)} />
        </Popup>
        {profileUser ? (
          <div
            className="flex h-[430px] flex-col 
              border-b border-slate-200 pb-10"
          >
            <div className="relative h-64">
              <div className="h-44 w-full bg-slate-300" />
              <div
                className="absolute top-1/2 flex 
                        w-full items-end justify-between"
              >
                <Image
                  className="ml-2 aspect-square rounded-full ring-4 ring-white hover:cursor-pointer"
                  height={120}
                  width={120}
                  src={profileUser?.imageUrl || defaultUserImg}
                  alt=""
                />
                {isCurrentUser && (
                  <button
                    onClick={() => setProfileModal((open) => !open)}
                    className="mr-2 h-10 
                rounded-full border border-gray-300 
               px-4 
                font-bold transition-colors hover:cursor-pointer hover:bg-gray-200"
                  >
                    Editar perfil
                  </button>
                )}
                {!isCurrentUser && isFollowedByUser && (
                  <button
                    onClick={handleUnfollow}
                    className="mr-2 h-10 cursor-pointer rounded-full
                      border border-gray-300
                      px-4 
                      font-bold transition-colors hover:bg-gray-200"
                  >
                    Deixar de seguir
                  </button>
                )}
                {!isCurrentUser && !isFollowedByUser && (
                  <button
                    onClick={handleFollow}
                    className="mr-2 h-10 cursor-pointer rounded-full
                      border border-gray-300
                      px-4 
                      font-bold transition-colors hover:bg-gray-200"
                  >
                    Seguir
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-col pl-5">
              <span className="text-2xl">{profileUser?.name + "  "}</span>
              <span className="text-gray-500">
                {"@" + profileUser?.username}
              </span>
              <span className="mt-3 text-gray-500">
                {`Juntou-se em ${moment(profileUser?.createdAt).format("ll")}`}
              </span>
              <div className="mt-2 flex gap-2 text-gray-500">
                <span className="first-letter:font-bold first-letter:text-slate-950">{`${following}  Seguindo`}</span>
                <span className="first-letter:font-bold first-letter:text-slate-950">
                  {`${followers}  Seguidores`}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
        <PostFeed posts={posts} isLoading={isLoadingPosts} />
      </Layout>
    </>
  );
};

export default ProfilePage;
