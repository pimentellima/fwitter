import moment from 'moment';
import 'moment/locale/pt-br';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import LikeButton from '../../components/likeButton';
import PostContent from '../../components/postContent';
import PostHeader from '../../components/postHeader';
import UserBox from '../../components/userBox';
import UserImg from '../../components/userImg';
import { AuthContext } from '../../contexts/authContext';
import CommentForm from './commentForm';
import { useCreateInteractionMutation } from './useCreateInteractionMutation';
import { useDeleteInteractionMutation } from './useDeleteInteractionMutation';

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const Post = ({ post, isThread }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [shared, setShared] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [commentPopup, setCommentPopup] = useState(false);

    const { 
        id,
        author,
        comments,
        likes,
        shares,
        bookmarks,
        createdAt,
        title,
        description,
        ingredients,
        file
    } = post;

    const createLikeMutation = useCreateInteractionMutation({
        queryKey: ['homePosts'],
        post_id: id,
        endpoint: '/post/like'
    })

    const deleteLikeMutation = useDeleteInteractionMutation({
        queryKey: ['homePosts'],
        post_id: id,
        endpoint: '/post/like'
    })

    useEffect(() => {    
        if(shares) {
            setShared(!!shares
                .filter(share =>
                    share.author_id === currentUser.id).length)
        }
        if(likes) {
            setLiked(!!likes
                .filter(like => 
                    like.author_id === currentUser.id).length)
        }
        if(bookmarks) {
            setBookmarked(!!bookmarks
                .filter(bookmark => 
                    bookmark.author_id === currentUser.id).length)
        }
    }, [])

    const handleUserClick = (e) => {
        e.stopPropagation();
        navigate('/' + author.username);
    }

/*     const deleteMutation = useMutation(
        () => deletePost(id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['homePosts']);
                queryClient.invalidateQueries(['profilePosts']);
                queryClient.invalidateQueries(['bookmarkedPosts']);
                queryClient.invalidateQueries(['postComments', { parent_id }]);
            }
        }
    ) */

    return (
        <>
            {/* {shareUser && <PostShare shareUser={shareUser} onClick={handleUserClick}/>} */}
            <div className="flex flex-row">
                <UserBox user={author} isThread={isThread}/>
                <div className="w-full">
                    <div className='flex justify-between'>
                        <PostHeader 
                            user={author} 
                            handleUserClick={handleUserClick} 
                            date={moment(createdAt, 'YYYY-MM-DD HH:mm:ss')
                                    .fromNow(true)
                                }
                            />
                        
                    </div>
                    <PostContent 
                        title={title}
                        ingredients={ingredients}
                        description={description}
                        file={file}
                    />
                    <div className="flex flex-row items-center justify-between h-14">
{/*                         <CommentPopupButton 
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
                            /> */}
                        <LikeButton 
                            onClick={(e) => {
                                e.stopPropagation();
                                liked ? deleteLikeMutation.mutate() 
                                : createLikeMutation.mutate();
                            }} 
                            active={liked}
                            likes={likes?.length} 
                            />
 {/*                        <BookmarkButton 
                            onClick={(e) => {
                                e.stopPropagation();
                                bookmarked ? deleteBookmarkMutation.mutate() 
                                : bookmarkMutation.mutate();
                            }}
                            active={bookmarked}
                            bookmarks={bookmarks?.length}
                            /> */}
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
                                {'Respondendo à ' + author.name}
                            </p>
                            <div className="flex flex-row pt-2">
                                <div className="w-20 flex justify-center">  
                                    <div className='w-12 h-12'>
                                        <UserImg clickable={false} user={author}/>
                                    </div>
                                </div>
                                <div className="w-full">
                                <PostHeader 
                                    user={author} 
                                    handleUserClick={handleUserClick} 
                                    date={moment(createdAt, 'YYYY-MM-DD HH:mm:ss')
                                            .fromNow(true)
                                        }
                                    />
                                    <p className="text-xl my-1">{title}</p>
                                </div>
                            </div>
                            <CommentForm 
                                parent_post_id={id}
                                onClose={() => setCommentPopup(false)} 
                                />
                        </div>
                    </Popup>
                </div>
            </div>
        </>
    )
}

export default Post;