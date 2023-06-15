import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import Spinner from "../components/spinner";
import defaultUserImg from '../../public/static/defaultUserImg.jpg'
import EditProfileModal from "../components/editProfileModal";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const query = router.query

  const { data: profileUser, isLoading: isLoadingUser } = useQuery(
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
  const following = profileUser?.following.length;
  const [isFollowedByUser, setIsFollowedByUser] = useState(false);

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

  const followMutation = useMutation(
    async (data) => await axios.post("/api/follow", { ...data })
  );
  const unfollowMutation = useMutation(
    async (data) => await axios.delete("/api/follow", { ...data })
  );

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

  return (
    <div>
      <div
        className="flex h-[430px] flex-col 
              border-b border-stone-700 pb-10"
      >
        {isLoadingUser ? (
          <Spinner />
        ) : (
          <>
            <div className="relative h-64">
              <div className="h-44 w-full bg-stone-600" />
              <div
                className="absolute top-1/2 flex 
                        w-full items-end justify-between"
              >
                <Image
                  className="ml-2 rounded-full hover:cursor-pointer aspect-square"
                  height={112}
                  width={112}
                  src={profileUser?.imageUrl || defaultUserImg}
                  alt=""
                />
                {profileUser?.id === session?.user.id ? (
                  <EditProfileModal />
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
              <p className="text-2xl">{profileUser?.name + "  "}</p>
              <p className="text-stone-400">{"@" + profileUser?.username}</p>
              <p className="mt-3 text-stone-400">
                {`Juntou-se em ${moment(profileUser?.createdAt).format("ll")}`}
              </p>
              <div className="mt-2 flex gap-2 font-medium">
                <p className="first-letter:text-white">{`${following}  Seguindo`}</p>
                <p className="first-letter:text-white">
                  {`${followers}  Seguidores`}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {isLoadingPosts ? (
        <Spinner />
      ) : posts?.length === 0 ? (
        <div className="mt-2 flex justify-center text-lg">
          Não há receitas para exibir
        </div>
      ) : (
        posts?.map((post) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push("/posts/" + post.id);
            }}
            className="border-b border-stone-700 hover:cursor-pointer hover:backdrop-brightness-105"
            key={post.id}
          >
            <Post post={post} />
          </div>
        ))
      )}
    </div>
  );
};

ProfilePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
