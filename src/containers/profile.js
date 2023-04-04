import { useUser } from '@clerk/nextjs';
import moment from "moment";
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const postReq = async (url, { arg }) => {
    return axios.post(url, {...arg})
    .then(res => res.data)
  }

const deleteReq = async (url, { arg }) => {
    return axios.delete(url, {...arg})
    .then(res => res.data)
  }
  
const Profile = ({ user }) => {
    const { user: userLoggedIn } = useUser();
	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(0);
	const [isFollowedByUser, setIsFollowedByUser] = useState(false);
	const { data: follows } = useSWR(`/api/follow`);

	useEffect(() => {
		if(userLoggedIn && follows) {
			setFollowers(follows
				.filter(follow => follow.followed_id === user.id));

			setFollowing(follows
				.filter(follow => follow.follower_id === user.id));

			setIsFollowedByUser(follows
				.filter(follow => follow.follower_id === userLoggedIn.id)
				.length > 0)
		} 
	}, [userLoggedIn, follows]);
    
	const { trigger: follow } = useSWRMutation('/api/follow', postReq);
    const { trigger: unfollow } = useSWRMutation('/api/follow', deleteReq);

    return ( 
        <div className="pb-10 flex flex-col 
                border-b border-stone-700">
            <div className="relative h-64">
                <div className='bg-stone-600 w-full h-44'></div>
                <div className="absolute top-1/2 flex 
                        justify-between w-full items-end">
                    <img 
                        className='h-28 w-28 ml-2 
                            rounded-full hover:cursor-pointer'
                        src={user.profileImageUrl} 
                        alt='profileImage'
                        />
                    {user.id === userLoggedIn?.id ? 
                        <button 
                            onClick={() => {}}
                            className='default-btn 
                            rounded-full h-10 font-bold mr-2'
                            >
                            Editar perfil
                        </button>
                        :
                        isFollowedByUser ? 
                            <button 
                                onClick={() => {
                                    unfollow();
                                    setIsFollowedByUser(false);
                                    setFollowers(n => --n);
                                }}
                                className='default-btn 
                                rounded-full h-10 font-bold mr-2'
                                >
                                Deixar de seguir
                            </button>
                            :
                            <button 
                                onClick={() => {
                                    follow();
                                    setIsFollowedByUser(true);
                                    setFollowers(n => ++n);
                                }}
                                className='default-btn 
                                rounded-full h-10 font-bold mr-2'
                                >
                                Seguir
                            </button>}
                </div>
            </div>
            <div className="mt-3 pl-5 flex flex-col">
                <p className="text-2xl">{user.firstName + "  "}</p>
                <p className="text-stone-400">{'@' + user.username}</p>
                <p className='mt-3 text-stone-400'>
                    {`Juntou-se em ${
                        moment(user.createdAt).format('ll')
                    }`}
                </p>
                <div className='flex gap-2 mt-2 font-medium'>
                    <p className="first-letter:text-white">
                        {`${following}  Seguindo`}
                    </p>
                    <p className='first-letter:text-white'>
                        {`${followers}  Seguidores`}
                    </p>
                </div>
            </div>  
        </div>
    )
}

export default Profile;