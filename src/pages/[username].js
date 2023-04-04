import { clerkClient } from "@clerk/nextjs/server";
import Layout from '../components/layout';
import Post from '../containers/post';
import Profile from '../containers/profile';
import { useUserPostsById } from '../server/api/post/use-user-posts-by-id';
import { useRouter } from "next/router";
import Spinner from "../components/spinner";

const ProfilePage = ({ userJson }) => {
	const user = JSON.parse(userJson)
	const { isFallback } = useRouter();

	const { 
		data: posts, 
		isLoading
	} = useUserPostsById(user?.id);

	if(isLoading || isFallback) return <Spinner/>

	return(
		<div>
			<Profile user={user}/>
			{posts.map(post => 
				<div 
					className='border-b border-stone-700' 
					key={post.id}
					>
					<Post post={post}/>
				</div>
			)}
		</div>
	);
};

export const getServerSideProps = async(ctx) => {
	const username = ctx.params.username;

	const users = await clerkClient.users.getUserList();
	const user = users.find(user => user.username === username)

	return {
		props: {
			userJson: JSON.stringify(user)
		}
	}
}

ProfilePage.getLayout = (page) => {
	return(
		<Layout>
			{page}
		</Layout>
	);
};


export default ProfilePage;