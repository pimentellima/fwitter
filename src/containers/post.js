import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import { request } from '../utils/axios';
import { 
    HandThumbUpIcon, 
    ChatBubbleOvalLeftIcon, 
    ShareIcon,
    BookmarkIcon
} from '@heroicons/react/20/solid';
import { usePostMutations } from '../server/api/post/use-post-mutations';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const Post = ({ post }) => {
    const { user } = useUser();

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

    const [reactions, setReactions] = useState({
        liked: likes.filter(item => item.author_id === user.id).length,
        bookmarked: bookmarks.filter(item => item.author_id === user.id).length,
        shared: shares.filter(item => item.author_id === user.id).length,
    });

    const { 
        createLikeMutation, 
        deleteLikeMutation,
        createBookmarkMutation,
        deleteBookmarkMutation,
        createShareMutation,
        deleteShareMutation
    } = usePostMutations(post_id)

    const handleClickBookmark = (e) => {
        e.stopPropagation();
        reactions.bookmarked ? 
            deleteBookmarkMutation.mutate() 
            : 
            createBookmarkMutation.mutate();
        setReactions(reactions => ({
            ...reactions, 
            bookmarked: !reactions.bookmarked
        }))
    }

    const handleClickShare = (e) => {
        e.stopPropagation();
        reactions.shared ? 
            deleteShareMutation.mutate() 
            : 
            createShareMutation.mutate();
        setReactions(reactions => ({
            ...reactions, 
            shared: !reactions.shared
        }))
    }

    const handleClickLike = (e) => {
        e.stopPropagation();
        reactions.liked ? 
            deleteLikeMutation.mutate() 
            : 
            createLikeMutation.mutate();
        setReactions(reactions => ({
            ...reactions, 
            liked: !reactions.liked
        }))
    }

    const { 
        data: author, 
        isFetching 
    } = useQuery(['user', { id: author_id }], () => 
            request.get(`/api/user/${author_id}`)
                .then(res => res.data));

    if(isFetching) return <></>

    return (
        <div className="flex flex-row py-3">
            <img 
                className='user-img hover:cursor-pointer'
                src={author.profileImageUrl} 
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
                        {ingredients.map((ingredient, index) => (
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