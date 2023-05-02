import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import Spinner from "../components/spinner";
import { getPostsByUserId } from "../server/helpers/get-posts";
import { getFollowsById } from "../server/helpers/get-follows-by-id";
import { getUserByUsername } from "../server/helpers/get-user";
import moment from "moment";
import { useSession } from "next-auth/react";
import defaultPicUrl from '../utils/defaultPicUrl'

export const followReq = (data) => axios.post("/api/follow", { ...data });
export const unfollowReq = (data) => axios.delete("/api/follow", { ...data });

const ProfilePage = () => {
  const { query } = useRouter();
  const { data } = useSession()
  const loggedUser = data?.user;

  const { data: user } = useQuery(["user"], () => getUserByUsername(query.username), {
    enabled: !!query.username,
  });

  const { data: posts, isFetched: fetchedPosts } = useQuery(
    ["profilePosts"],
    () => getPostsByUserId(user?.id),
    {
      enabled: !!user,
    }
  );

  const { data: follows, isFetched: fetchedFollows } = useQuery(
    ["follows", { userId: user?.id }],
    () => getFollowsById(user?.id),
    {
      enabled: !!user,
    }
  );

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowedByUser, setIsFollowedByUser] = useState(false);

  useEffect(() => {
    if (loggedUser && follows) {
      setFollowers(
        follows.filter((follow) => follow.followed_id === user.id).length
      );

      setFollowing(
        follows.filter((follow) => follow.follower_id === user.id).length
      );

      setIsFollowedByUser(
        follows.filter((follow) => follow.follower_id === loggedUser.id)
          .length > 0
      );
    }
  }, [loggedUser, follows]);

  const follow = useMutation(followReq);
  const unfollow = useMutation(unfollowReq);

  const handleFollow = () => {
    follow.mutate({
      follower_id: loggedUser.id,
      followed_id: user.id,
    });
    setIsFollowedByUser(true);
    setFollowers((n) => ++n);
  };

  const handleUnfollow = () => {
    unfollow.mutate({
      data: {
        follower_id: loggedUser.id,
        followed_id: user.id,
      },
    });
    setIsFollowedByUser(false);
    setFollowers((n) => --n);
  };

  if (!user || !loggedUser || !fetchedPosts || !fetchedFollows) return <Spinner />;

  return (
    <div>
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
            src={user.imageUrl ? user.imageUrl : defaultPicUrl}
            alt="profileImage"
          />
          {user.id === loggedUser?.id ? (
            <button
              onClick={() => {}}
              className="default-btn 
                            mr-2 h-10 rounded-full font-bold"
            >
              Editar perfil
            </button>
          ) : isFollowedByUser ? (
            <button
              onClick={handleUnfollow}
              className="default-btn 
                                mr-2 h-10 rounded-full font-bold"
            >
              Deixar de seguir
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="default-btn 
                                mr-2 h-10 rounded-full font-bold"
            >
              Seguir
            </button>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-col pl-5">
        <p className="text-2xl">{user.name + "  "}</p>
        <p className="text-stone-400">{"@" + user.username}</p>
        <p className="mt-3 text-stone-400">
          {`Juntou-se em ${moment(user.createdAt).format("ll")}`}
        </p>
        <div className="mt-2 flex gap-2 font-medium">
          <p className="first-letter:text-white">{`${following}  Seguindo`}</p>
          <p className="first-letter:text-white">
            {`${followers}  Seguidores`}
          </p>
        </div>
      </div>
    </div>
      {posts.map((post) => (
        <div className="border-b border-stone-700" key={post.id}>
          <Post post={post}/>
        </div>
      ))}
    </div>
  );
};

ProfilePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
