import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import BookmarkButton from "../../components/bookmarkButton";
import CommentPopupButton from "../../components/commentPopupButton";
import LikeButton from "../../components/likeButton";
import ShareButton from "../../components/shareButton";
import UserImg from "../../components/userImg";
import UserInfo from "../../components/userInfo";
import { AuthContext } from "../../contexts/authContext";
import {
    createBookmark,
    deleteBookmark, getBookmarks
} from '../../services/bookmarksService';
import { getComments } from '../../services/commentsService';
import { createLike, deleteLike, getLikes } from '../../services/likesService';
import { createShare, deleteShare, getShares } from '../../services/sharesService';
import CommentForm from "../post/commentForm";

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const Interactions = ({ post, user }) => {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);
    const [commentPopup, setCommentPopup] = useState(false);

    const { id, title, date } = post;
                
    const { data: likes } = useQuery(
        ['postLikes', { post_id: id }], () => getLikes(id)
        )

    const { data: comments } = useQuery(
        ['postComments', { post_id: id }], () => getComments(id)
        )

    const { data: bookmarks } = useQuery(
        ['postBookmarks', { post_id: id }], () => getBookmarks(id)
        )

    const { data: shares } = useQuery(
        ['postShares', { post_id: id }], () => getShares(id)
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
        () => createLike({ post_id: id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postLikes', { post_id: id }])
        }
    )

    const deleteLikeMutation = useMutation(() => 
        deleteLike({ post_id: id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postLikes', { post_id: id }])
        }
    )

    const shareMutation = useMutation(() => 
        createShare({ post_id: id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postShares', { post_id: id }])
        }
    )

    const deleteShareMutation = useMutation(() => 
        deleteShare({ post_id: id, user_id: currentUser.id }), {
        onSuccess: () => 
            queryClient.invalidateQueries(['postShares', { post_id: id }])
        }
    )

    const bookmarkMutation = useMutation(
        () => createBookmark({ post_id: id, user_id: currentUser.id }), {
            onSuccess: () => 
                queryClient.invalidateQueries(['postBookmarks', { post_id: id }])
        }
    )

    const deleteBookmarkMutation = useMutation(() => 
        deleteBookmark({ post_id: id, user_id: currentUser.id }), {
            onSuccess: () => {
                queryClient.invalidateQueries(['postBookmarks', { post_id: id }]);
                queryClient.invalidateQueries(['bookmarkedPosts']);
            }
        }
    )

    return (
        <>
            <div className="flex flex-row items-center justify-between h-14">
                <CommentPopupButton 
                    onClick={e => {
                        e.stopPropagation();
                        setCommentPopup(true);
                    }}
                    comments={comments?.length}
                    />
                <ShareButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        shared ? deleteShareMutation.mutate() 
                        : shareMutation.mutate();
                    }} 
                    shares={shares?.length} 
                    active={shared}
                    />
                <LikeButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        liked ? deleteLikeMutation.mutate() 
                        : likeMutation.mutate();
                    }} 
                    active={liked}
                    likes={likes?.length} 
                    />
                <BookmarkButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        bookmarked ? deleteBookmarkMutation.mutate() 
                        : bookmarkMutation.mutate();
                    }}
                    active={bookmarked}
                    bookmarks={bookmarks?.length}
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
                    <CommentForm 
                        onClose={() => setCommentPopup(false)} 
                        parent_post_id={id}
                        />
                </div>
            </Popup>
        </>
    )
}

export default Interactions;