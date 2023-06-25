import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import Spinner from "../components/spinner";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import EditProfileModal from "../components/editProfileModal";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const query = router.query;

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
    <>
      <div
        className="flex h-[430px] flex-col 
              border-b border-slate-200 pb-10"
      >
        {isLoadingUser ? (
          <Spinner />
        ) : (
          <>
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
                {profileUser?.id === session?.user.id ? (
                  <EditProfileModal />
                ) : isFollowedByUser ? (
                  <button
                    onClick={handleUnfollow}
                    className="mr-2 h-10 cursor-pointer rounded-full
                      border border-gray-300
                      px-4 
                      font-bold transition-colors hover:bg-gray-200"
                  >
                    Deixar de seguir
                  </button>
                ) : (
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
              <span className="text-gray-500">{"@" + profileUser?.username}</span>
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
            className="border-b border-slate-200 hover:cursor-pointer hover:bg-gray-100"
            key={post.id}
          >
            <Post post={post} />
          </div>
        ))
      )}
    </>
  );
};

ProfilePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
