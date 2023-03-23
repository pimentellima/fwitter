import { useQuery } from "@tanstack/react-query";
import 'moment/locale/pt-br';
import { useEffect, useRef } from "react";
import { useMatch } from "react-router-dom";
import CreateCommentForm from "./createCommentForm";
import PostController from "./postController";
import { getComments } from '../../services/commentsService';
import { getPostById } from "../../services/singleService";
import { getUserById } from "../../services/userService";
import { getPostThread } from '../../utils/getPostThread';

const PostPage = () => {
    const match = useMatch("/post/:id");
    const id = match.params.id;
    const postRef = useRef();

    const { 
        data: post, 
        isFetching: isFetchingPost 
    } = useQuery(['post', { id }], () => 
        getPostById(id)
    )

    const { data: user, isFetching: isFetchingUser } = useQuery(
        ['postUser', { post_id: post?.id }], () => 
            getUserById(post.user_id), {
                enabled: !!post
            }
    );

    const { 
        data: thread, 
        isFetching: isFetchingThread 
    } = useQuery(['postThread', { id }], () => 
        getPostThread(id));
    
    const { 
        data: comments, 
        isFetching: isFetchingComments 
        } = useQuery(['postComments', { parent_id: post?.id }], () => 
            getComments(post.id), {
                enabled: !!post
            }
        )
    
    const scroll = () => {
        if(thread.length == 0) window.scroll(0,0);
        else {
            postRef.current.scrollIntoView({ block:'start' });
            window.scrollBy({ top: -50 })
        } 
    }

    const isFetching = isFetchingPost || isFetchingUser || isFetchingThread || isFetchingComments
    
    useEffect(() => {
        if(!isFetching) scroll();
    }, [isFetching])

    if(isFetching) return <></>

    return (
        <div> 
            <div className='sticky top-0 border-b border-stone-700 
                            pt-2 pb-4 pl-3 font-medium text-xl 
                            z-20 bg-stone-800'>
                <p>Fweet</p>
            </div> 
            {thread && thread.length > 0 && thread.map((post, index) => 
                <div 
                    className={`hover:backdrop-brightness-110 
                                hover:cursor-pointer`}
                    key={post.id}
                    >
                    <PostController isThread={true} post={post}/>
                </div>
            )}
            <div ref={postRef} className="[&_>*]:border-b 
                                        [&_>*]:border-stone-700">
                <PostController post={post}/>
                <CreateCommentForm parent_id={id}/>
            </div>
            {comments && comments.map((post, index) => 
                <div 
                    key={post.id}
                    className='hover:backdrop-brightness-110 
                                hover:cursor-pointer border-b border-stone-700'
                    >
                    <PostController post={post}/>
                </div>
            )}
        </div>
    )
}

export default PostPage;