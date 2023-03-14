import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import CommentButton from "../../components/commentButton";
import LikeButton from "../../components/likeButton";
import SaveButton from "../../components/saveButton";
import ShareButton from "../../components/shareButton";
import { AuthContext } from "../../contexts/authContext";
import { createLike, deleteLike, getComments, getLikes } from "../../services/postsService";

const PostActions = ({ post_id, onClickComment }) => {
    const [liked, setLiked] = useState(false);
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);
                
    const { data: likes, isFetched: isFetchedLikes } = useQuery(
        ['postLike', { post_id }], () => getLikes(post_id)
        )

    const { data: comments, isFetched: isFetchedComments } = useQuery(
        ['postComments', { post_id }], () => getComments(post_id)
        )

    useEffect(() => {
        if(likes) {
            setLiked(likes
                .filter(like => 
                    like.user_id === currentUser.id).length ? true : false)
        }
    }, [likes])

    const likeMutation = useMutation(
        () => createLike({ post_id, user_id: currentUser.id }), {
            onSuccess: () => queryClient.invalidateQueries(['postLike', { post_id }])
        }
    )

    const deleteLikeMutation = useMutation(
        () => deleteLike({ post_id, user_id: currentUser.id }), {
            onSuccess: () => queryClient.invalidateQueries(['postLike', { post_id }])
        }
    )

    const handleLike = e => {
        e.stopPropagation();
        liked ? deleteLikeMutation.mutate() : likeMutation.mutate();
    }

    const handleComment = e => {
        e.stopPropagation();
        onClickComment();
    }

    return (
        <div className="px-2 flex flex-row items-center justify-between  h-14">
            <CommentButton comments={isFetchedComments ? comments.length : ''} onClick={e => handleComment(e)} active={false}/>
            <LikeButton likes={isFetchedLikes ? likes.length : ''} onClick={(e) => handleLike(e)} active={liked}/>
            <ShareButton active={false}/>
            <SaveButton active={false}/>
        </div>
    )
}

export default PostActions;