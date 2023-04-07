import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Layout from "../components/layout";
import Post from "../components/post";
import ProfileView from "../components/profileView";
import Spinner from "../components/spinner";
import { getPostsByUserId } from "../server/api/post/get-posts";
import { getFollowsById } from "../server/api/user/get-follows-by-id";
import { getUserByUsername } from "../server/api/user/get-user";

export const followReq = data => axios.post('/api/follow', {...data})
export const unfollowReq = data => axios.delete('/api/follow', {...data})

const ProfilePage = () => {
  const { query } = useRouter();
  const username = query.username;
  const { user: userLoggedIn } = useUser();

  const { data: user } = useQuery(["user"], () => getUserByUsername(username), {
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
    if (userLoggedIn && follows) {
      setFollowers(
        follows.filter((follow) => follow.followed_id === user.id).length
      );

      setFollowing(
        follows.filter((follow) => follow.follower_id === user.id).length
      );

      setIsFollowedByUser(
        follows.filter((follow) => follow.follower_id === userLoggedIn.id)
          .length > 0
      );
    }
  }, [userLoggedIn, follows]);

  const follow = useMutation(followReq);
  const unfollow = useMutation(unfollowReq);

  const handleFollow = () => {
    follow.mutate({
      follower_id: userLoggedIn.id,
      followed_id: user.id,
    });
    setIsFollowedByUser(true);
    setFollowers((n) => ++n);
  };

  const handleUnfollow = () => {
    unfollow.mutate({
      data: {
        follower_id: userLoggedIn.id,
        followed_id: user.id,
      },
    });
    setIsFollowedByUser(false);
    setFollowers((n) => --n);
  };

  if(!user || !userLoggedIn || !fetchedPosts || !fetchedFollows) return <Spinner />;

  return (
    <div>
      <ProfileView
        {...{
          userLoggedIn,
          user,
          handleFollow,
          handleUnfollow,
          followers,
          following,
          isFollowedByUser,
        }}
      />
      {posts.map((post) => (
        <div className="border-b border-stone-700" key={post.id}>
          <Post {...{ post, userLoggedIn }} />
        </div>
      ))}
    </div>
  );
};

ProfilePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
