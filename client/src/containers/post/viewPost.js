import { useQuery } from "@tanstack/react-query";
import 'moment/locale/pt-br';
import { useEffect, useRef } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { getComments } from '../../services/commentsService';
import { getPostById } from "../../services/singleService";
import { getUserById } from "../../services/userService";
import { getPostThread } from '../../utils/getPostThread';
import WriteComment from "../write/writeComment";
import Post from "./post";

const ViewPost = () => {
    const match = useMatch("/post/:id");
    const id = match.params.id;
    const navigate = useNavigate();
    const postRef = useRef();

    const { 
        data: postObj, 
        isFetched: isFetchedPost 
    } = useQuery(['post', { id }], () => 
        getPostById(id)
    )

    const { data: user, isFetched: isFetchedUser } = useQuery(
        ['postUser', { id: postObj?.user_id }], () => 
            getUserById(postObj.user_id), {
                enabled: !!postObj
            }
    );

    const {
        data: postThread,
        isFetched: isFetchedThread
    } = useQuery(['postThread', { id }], () => getPostThread(id));
    
    const {
        data: commentPosts,
        isFetched: isFetchedComments
    } = useQuery(['postComments', { parent_id: postObj?.id }], () => 
        getComments(postObj.id),
        {
            enabled: isFetchedPost
        }
    )

    const handlePostClick = (post) => {
        navigate('/post/' + post.id)
    }
    
    const isFetched = isFetchedThread && isFetchedPost 
                    && isFetchedComments && isFetchedUser;
    
    const scroll = () => {
        if(postThread.length == 0) window.scroll(0,0);
        else {
            postRef.current.scrollIntoView({ block:'start' });
            window.scrollBy({ top: -60 })
        } 
    }
    
    useEffect(() => {
        if(isFetched) scroll();
    }, [id, isFetched])

    return (
        <div> 
            <div className='sticky top-0 border-b border-stone-700 
                            pt-2 pb-4 pl-3 font-medium text-xl 
                            z-20 bg-stone-800'>
                <p>Fweet</p>
            </div> 
            {isFetched && postThread.map((post, index) => 
                <div 
                    onClick={() => handlePostClick(post)} 
                    className={`hover:backdrop-brightness-110 
                                hover:cursor-pointer`}
                    key={post.id}
                    >
                    <Post type='thread' postObj={post}/>
                </div>
            )}
            {isFetched && 
                <div ref={postRef} className="[&_>*]:border-b 
                                            [&_>*]:border-stone-700">
                    <Post postObj={postObj}/>
                    <WriteComment user={user} post={postObj}/>
                </div>
            }
            {isFetched && commentPosts.map((post, index) => 
                <div 
                    onClick={() => handlePostClick(post)} 
                    key={post.id}
                    className='hover:backdrop-brightness-110 
                                hover:cursor-pointer border-b border-stone-700'
                    >
                    <Post postObj={post}/>
                </div>
            )}
        </div>
    )
}

export default ViewPost;