import { useUser } from "@clerk/nextjs";
import { 
    HandThumbUpIcon, 
    ChatBubbleOvalLeftIcon, 
    ShareIcon,
    BookmarkIcon
} from '@heroicons/react/20/solid';
import { useState } from "react";
import { usePostMutations } from "../hooks/usePostMutations";

const Reactions = ({ post }) => {
    const { user } = useUser();
    const [commentPopup, setCommentPopup] = useState(false);
    const [reactions, setReactions] = useState({
        liked: post.likes.find(like => like.author_id === user.id),
        likes: 0,
    });

    const { 
        createLikeMutation, 
        deleteLikeMutation 
    } = usePostMutations(post.id)

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

    return (
        <div className="flex flex-row items-center justify-between pt-4">
            <ChatBubbleOvalLeftIcon
                className={`post-icon`} 
                />
            <ShareIcon
                className={`post-icon`}
                />
            <HandThumbUpIcon
                onClick={handleClickLike}
                className={`post-icon ${reactions.liked && 'text-red-400'}`} />
            <BookmarkIcon
                className={`post-icon`}
                />
            </div>
    )
}

export default Reactions;
