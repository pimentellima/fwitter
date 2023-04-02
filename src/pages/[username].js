import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Profile from "../components/profile";
import Post from '../containers/post';
import { getPostsByUserId } from "../server/api/post/get-posts-by-user-id";
import { getFollowersByUserId } from '../server/api/user/get-followers-by-user-id';
import { getFollowingByUserId } from '../server/api/user/get-following-by-user-id';
import { getUserByUsername } from '../server/api/user/get-user-by-username';
import { useFollowMutations } from "../server/api/user/use-follow-mutations";
import Spinner from "../components/spinner";
import { useRouter } from "next/router";

const ProfilePage = ({ user, followers, following, posts }) => {
    const { user: userLoggedIn, isLoaded } = useUser();
    const { isFallback } = useRouter();

    const [numFollowers, setNumFollowers] = 
        useState(followers?.length || 0);

    const [isFollowedByUser, setIsFollowedByUser] = useState(false);

    useEffect(() => {
        if(isLoaded) {
            setIsFollowedByUser(followers.filter(userId => 
                userId === userLoggedIn.id).length);
        } 
    }, [isLoaded])
    
    const {     
        createFollowMutation, 
        deleteFollowMutation 
    } = useFollowMutations({ 
        userId: user.id, userLoggedIn: userLoggedIn?.id 
    })

    const handleFollow = () => {
        if(!isFollowedByUser) {
            createFollowMutation.mutate();
            setIsFollowedByUser(true);
            setNumFollowers(n => n++);
        }
        else {
            deleteFollowMutation.mutate();
            setIsFollowedByUser(false);
            setNumFollowers(n => n--);
        }
    }

    if(!isLoaded || isFallback) return <Spinner/>

    return(
        <div>
            <Profile 
                user={user} 
                isFollowedByUser={isFollowedByUser}
                followers={numFollowers}
                following={following ? following.length : 0}
                userLoggedIn={userLoggedIn}
                handleFollow={handleFollow}
                onOpenModal={() => {}}
                />
            {posts.map(post => 
                <div 
                    className='border-b border-stone-700' 
                    key={post.id}
                    >
                    <Post post={post}/>
                </div>
            )}
        </div>
    )
}

export const getStaticProps = async (context) => {
    const username = context.params.username;

    const user = await getUserByUsername(username);
    const followers = await getFollowersByUserId(user.id);
    const following = await getFollowingByUserId(user.id);
    const posts = await getPostsByUserId(user.id);
    
    return {
        props: {
            user,
            followers,
            following,
            posts,
        }
    }
}

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
  };

  
ProfilePage.getLayout = (page) => {
    return(
      <Layout>
        {page}
      </Layout>
    )
  }


export default ProfilePage;