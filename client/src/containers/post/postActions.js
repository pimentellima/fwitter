import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import BookmarkButton from "../../components/button/bookmarkButton";
import CommentPopupButton from "../../components/button/commentPopupButton";
import LikeButton from "../../components/button/likeButton";
import ShareButton from "../../components/button/shareButton";
import { AuthContext } from "../../contexts/authContext";
import { 
    getBookmarks, 
    createBookmark, 
    deleteBookmark
} from '../../services/bookmarksService'
import { createLike, deleteLike, getLikes } from '../../services/likesService';
import { createShare, deleteShare, getShares} from '../../services/sharesService';
import { getComments } from '../../services/commentsService';
import WriteComment from "./writeComment";
import UserInfo from "../../components/userInfo";
import Popup from "reactjs-popup";
import UserImg from "../../components/img/userImg";

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const PostActions = ({ post_id, user, title, date }) => {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);
    const [commentPopup, setCommentPopup] = useState(false);
                
    const { data: likes, isFetched: isFetchedLikes } = useQuery(
        ['postLike', { post_id }], () => getLikes(post_id)
        )

    const { data: comments, isFetched: isFetchedComments } = useQuery(
        ['postComments', { post_id }], () => getComments(post_id)
        )

    const { data: bookmarks, isFetched: isFetchedBookmarks } = useQuery(
        ['postBookmarks', { post_id }], () => getBookmarks(post_id)
        )

    const { data: shares, isFetched: isFetchedShares } = useQuery(
        ['postShares', { post_id }], () => getShares(post_id)
        )

    useEffect(() => {    
        if(shares) {
            setShared(!!shares
                .filter(share =>
                    share.user_id === currentUser.id).length)
        }
    }, [shares])

    useEffect(() => {
        if(likes) {
            setLiked(!!likes
                .filter(like => 
                    like.user_id === currentUser.id).length)
        }
    }, [likes])

    useEffect(() => {
        if(bookmarks) {
            setBookmarked(!!bookmarks
                .filter(bookmark => 
                    bookmark.user_id === currentUser.id).length)
        }
    }, [bookmarks])

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

    const bookmarkMutation = useMutation(
        () => createBookmark({ post_id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postBookmarks', { post_id }])
        }
    )

    const deleteBookmarkMutation = useMutation(() => 
        deleteBookmark({ post_id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postBookmarks', { post_id }])
        }
    )

    const deleteShareMutation = useMutation(() => 
        deleteShare({ post_id, user_id: currentUser.id }), {
        onSuccess: () => 
            queryClient.invalidateQueries(['postShares', { post_id }])
        }
    )

    const handleShare = e => {
        e.stopPropagation();
        shared ? deleteShareMutation.mutate() : shareMutation.mutate();
    }
                                            
    const handleLike = e => {
        e.stopPropagation();
        liked ? deleteLikeMutation.mutate() : likeMutation.mutate();
    }

    const handleComment = e => {
        e.stopPropagation();
        setCommentPopup(true);
    }

    const handleBookmark = e => {
        e.stopPropagation();
        bookmarked ? deleteBookmarkMutation.mutate() 
        : bookmarkMutation.mutate();
    }

    return (
        <>
            <div className="flex flex-row items-center justify-between h-14">
                <CommentPopupButton 
                    onClick={e => handleComment(e)}
                    comments={isFetchedComments ? comments.length : ''}
                    />
                <ShareButton 
                    onClick={(e) => handleShare(e)} 
                    shares={isFetchedShares ? shares.length : ''} 
                    active={shared}
                    />
                <LikeButton 
                    onClick={(e) => handleLike(e)} 
                    active={liked}
                    likes={isFetchedLikes ? likes.length : ''} 
                    />
                <BookmarkButton 
                    onClick={(e) => handleBookmark(e)}
                    active={bookmarked}
                    bookmarks={isFetchedBookmarks ? bookmarks.length : ''}
                    />
            </div>
            <Popup
                open={commentPopup}
                onOpen={() => setCommentPopup(true)}
                onClose={() => setCommentPopup(false)}
                {...{overlayStyle}}
                >   
                <div className='bg-stone-900 rounded-xl
                                py-7 pb-10 px-4 w-[600px]'>
                    <p className="ml-4 mb-4 text-sm text-stone-300">
                        {'Respondendo à ' + user.name}
                    </p>
                    <div className="flex flex-row pt-2">
                        <div className="w-20 flex justify-center">  
                            <div className='w-12 h-12'>
                                <UserImg clickable={false} user={user}/>
                            </div>
                        </div>
                        <div className="w-full">
                            <UserInfo user={user} date={date}/>
                            <p className="text-xl my-1">{title}</p>
                        </div>
                    </div>
                    <WriteComment 
                        closePopup={() => setCommentPopup(false)} 
                        parent_id={post_id}
                        />
                </div>
            </Popup>
        </>
    )
}

export default PostActions;