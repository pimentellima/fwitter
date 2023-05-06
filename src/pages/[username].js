import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Popup from "reactjs-popup";
import Layout from "../components/layout";
import Post from "../components/post";
import ProfileForm from "../components/profileForm";
import Spinner from "../components/spinner";
import { useLoggedUser } from "../hooks/useLoggedUser";
import defaultPicUrl from "../utils/defaultPicUrl";

const ProfilePage = () => {
  const { query } = useRouter();
  const [modal, setModal] = useState(false);
  const { data: loggedUser } = useLoggedUser();
  const router = useRouter();

  const { data } = useQuery(
    ["user", { username: query?.username }],
    async () =>
      axios.get(`api/profile/${query?.username}`).then((res) => res.data),
    {
      enabled: !!query.username,
    }
  );

  const [followers, setFollowers] = useState(0);
  const following = data?.following.length;
  const [isFollowedByUser, setIsFollowedByUser] = useState(false);

  useEffect(() => {
    if(data) {
      setFollowers(data.followers.length);
      setIsFollowedByUser( data?.followers.filter((follow) => follow.follower_id === loggedUser.id)
      .length > 0)
    }
  }, [data])

  const followMutation = useMutation(
    async (data) => await axios.post("/api/follow", { ...data })
  );
  const unfollowMutation = useMutation(
    async (data) => await axios.delete("/api/follow", { ...data })
  );

  const handleFollow = () => {
    followMutation.mutate({
      follower_id: loggedUser.id,
      followed_id: data.id,
    });
    setIsFollowedByUser(true);
    setFollowers((n) => ++n);
  };

  const handleUnfollow = () => {
    unfollowMutation.mutate({
      data: {
        follower_id: loggedUser.id,
        followed_id: data.id,
      },
    });
    setIsFollowedByUser(false);
    setFollowers((n) => --n);
  };

  if (!data) return <Spinner />;

  return (
    <div>
      <Popup
        onOpen={() => setModal(true)}
        onClose={() => setModal(false)}
        open={modal}
      >
        <ProfileForm
          loggedUser={loggedUser}
          closeModal={() => setModal(false)}
        />
      </Popup>
      <div
        className="flex flex-col border-b 
                border-stone-700 pb-10"
      >
        <div className="relative h-64">
          <div className="h-44 w-full bg-stone-600" />
          <div
            className="absolute top-1/2 flex 
                        w-full items-end justify-between"
          >
            <img
              className="ml-2 h-28 w-28 rounded-full hover:cursor-pointer"
              src={data.imageUrl ? data.imageUrl : defaultPicUrl}
              alt="profileImage"
            />
            {data.id === loggedUser?.id ? (
              <button
                onClick={() => setModal(true)}
                className="mr-2 h-10 
                rounded-full border border-stone-700 
                bg-stone-700 px-4 
                font-bold transition-colors hover:cursor-pointer hover:bg-stone-600 active:border-stone-500"
              >
                Editar perfil
              </button>
            ) : isFollowedByUser ? (
              <button
                onClick={handleUnfollow}
                className="bg-sto ne-700 hover:
                mr-2 h-10 cursor-pointer rounded-full
                border border-stone-700 
                px-4 
                font-bold transition-colors hover:bg-stone-600 active:border-stone-500"
              >
                Deixar de seguir
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="bg-sto ne-700 hover:
                mr-2 h-10 cursor-pointer rounded-full
                border border-stone-700 
                px-4 font-bold transition-colors hover:bg-stone-600 active:border-stone-500"
              >
                Seguir
              </button>
            )}
          </div>
        </div>
        <div className="mt-3 flex flex-col pl-5">
          <p className="text-2xl">{data.name + "  "}</p>
          <p className="text-stone-400">{"@" + data.username}</p>
          <p className="mt-3 text-stone-400">
            {`Juntou-se em ${moment(data.createdAt).format("ll")}`}
          </p>
          <div className="mt-2 flex gap-2 font-medium">
            <p className="first-letter:text-white">{`${following}  Seguindo`}</p>
            <p className="first-letter:text-white">
              {`${followers}  Seguidores`}
            </p>
          </div>
        </div>
      </div>
      {data.posts?.map((post) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push("/posts/" + post.id);
          }}
          className="border-b border-stone-700 hover:cursor-pointer hover:backdrop-brightness-105"
          key={post.id}
        >
          <Post loggedUser={loggedUser} post={post} />
        </div>
      ))}
    </div>
  );
};

ProfilePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
