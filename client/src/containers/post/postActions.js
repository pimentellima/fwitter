import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import CommentButton from "../../components/button/commentButton";
import LikeButton from "../../components/button/likeButton";
import SaveButton from "../../components/button/saveButton";
import ShareButton from "../../components/button/shareButton";
import { AuthContext } from "../../contexts/authContext";
import { 
    createLike, 
    createShare, 
    deleteLike, 
    getComments, 
    getLikes, 
    getShares 
} from "../../services/postsService";

const PostActions = ({ post_id, openCommentPopup }) => {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);
                
    const { data: likes, isFetched: isFetchedLikes } = useQuery(
        ['postLike', { post_id }], () => getLikes(post_id)
        )

    const { data: comments, isFetched: isFetchedComments } = useQuery(
        ['postComments', { post_id }], () => getComments(post_id)
        )

    const { data: shares, isFetched: isFetchedShares } = useQuery(
        ['postShares', { post_id }], () => getShares(post_id)
        )

    useEffect(() => {
        if(likes) {
            setLiked(!!likes
                .filter(like => 
                    like.user_id === currentUser.id).length)
        }
        if(shares) {
            setShared(!!shares
                .filter(share =>
                    share.user_id === currentUser.id).length)
        }
    }, [likes, shares])

    const likeMutation = useMutation(
        () => createLike({ post_id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postLike', { post_id }])
        }
    )

    const deleteLikeMutation = useMutation(() => 
        deleteLike({ post_id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postLike', { post_id }])
        }
    )

    const shareMutation = useMutation(() => 
        createShare({ post_id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postShares', { post_id }])
        }
    )

    const handleShare = e => {
        e.stopPropagation();
        if(!shared) shareMutation.mutate();
    }

    const handleLike = e => {
        e.stopPropagation();
        liked ? deleteLikeMutation.mutate() : likeMutation.mutate();
    }

    const handleComment = e => {
        e.stopPropagation();
        openCommentPopup();
    }

    return (
        <div className="px-2 flex flex-row items-center justify-between  h-14">
            <CommentButton 
                onClick={e => handleComment(e)} active={false}
                comments={isFetchedComments ? comments.length : ''} 
                />
            <LikeButton 
                onClick={(e) => handleLike(e)} active={liked}
                likes={isFetchedLikes ? likes.length : ''} 
                />
            <ShareButton 
                onClick={(e) => handleShare(e)} 
                shares={isFetchedShares ? shares.length : ''} 
                active={shared}
                />
            <SaveButton active={false}/>
        </div>
    )
}

export default PostActions;