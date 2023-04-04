import { useUser } from '@clerk/nextjs';
import {
    BookmarkIcon,
    ChatBubbleOvalLeftIcon,
    HandThumbUpIcon,
    ShareIcon
} from '@heroicons/react/20/solid';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const fetcher = url => axios.get(url).then(res => res.data);

const postReq = async (url, { arg }) => {
    return axios.post(url, {...arg})
    .then(res => res.data)
  }

const deleteReq = async (url, { arg }) => {
    return axios.delete(url, {...arg})
    .then(res => res.data)
  }

const Post = ({ post }) => {
    const { user: userLoggedIn } = useUser();

    const { 
        id: post_id,
        author_id,
        createdAt,
        title,
        ingredients,
        likes,
        bookmarks,
        shares
    } = post;

    const { 
        data: author, 
        isLoading 
    } = useSWR(`/api/user/${author_id}`, fetcher);
    
    const [reactions, setReactions] = useState({
        liked: likes
            .filter(item => item.author_id === userLoggedIn?.id).length,
        bookmarked: bookmarks
            .filter(item => item.author_id === userLoggedIn?.id).length,
        shared: shares
            .filter(item => item.author_id === userLoggedIn?.id).length,
    });

    const { trigger: like } = useSWRMutation('/api/like', postReq);
    const { trigger: deleteLike } = useSWRMutation('/api/like', deleteReq);

    const handleClickBookmark = (e) => {
        e.stopPropagation();
    }

    const handleClickShare = (e) => {
        e.stopPropagation();
    }

    const handleClickLike = (e) => {
        reactions.liked ?
        deleteLike({
            data: {
                post_id,
                author_id
            }
        })
        :
        like({
            post_id,
            author_id
        })
        setReactions(reactions => ({
            ...reactions, 
            liked: !reactions.liked
        }))
        e.stopPropagation();
    }

    if(isLoading) return <></>

    return (
        <div className="flex flex-row py-3">
            <img 
                className='user-img hover:cursor-pointer'
                src={author?.profileImageUrl} 
                alt='profileImage'
                />
            <div className='flex flex-col w-full mr-6'>
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p className="font-bold 
                            hover:underline hover:cursor-pointer">
                            {author?.firstName}
                        </p>
                        <div className="hover:cursor-pointer flex flex-row 
                                        text-sm text-stone-400 gap-1">
                            <p>{'@' + author?.username}</p>
                            <p> {". " + 
                                moment(createdAt, 'YYYY-MM-DD HH:mm:ss')
                                .fromNow(true)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-xl my-1">{title}</p>
                        <p className="font-medium mt-1">
                            {'Ingredientes: '}
                        </p>
                        {ingredients?.map((ingredient, index) => (
                            <p key={index} className="inline">  {
                                    ingredient.qt + " " + 
                                    ingredient.unity + " " + 
                                    ingredient.name
                                }
                            </p>
                        ))}
                    <div className="flex flex-row 
                        items-center justify-between pt-4">
                        <ChatBubbleOvalLeftIcon
                            className={`post-icon`} 
                            />
                        <ShareIcon
                            onClick={handleClickShare}
                            className={`post-icon 
                                ${reactions.shared && 'text-green-400'}`}
                                />
                        <HandThumbUpIcon
                            onClick={handleClickLike}
                            className={`post-icon 
                                ${reactions.liked && 'text-red-400'}`}
                                />
                        <BookmarkIcon
                            onClick={handleClickBookmark}
                            className={`post-icon 
                                ${reactions.bookmarked && 'text-orange-400'}`}
                                />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;