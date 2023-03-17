import { useQuery } from "@tanstack/react-query";
import 'moment/locale/pt-br';
import { useEffect, useRef } from "react";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import { getComments, getPostById } from "../../services/postsService";
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

    const renderThread = () => postThread.map((post, index) => 
        <div 
            onClick={() => handlePostClick(post)} 
            className={`hover:backdrop-brightness-110 hover:cursor-pointer `}
            key={post.id}
            >
            <Post type='thread' postObj={post}/>
        </div>
    )

    const renderComments = () => commentPosts.map((post, index) => 
        <div 
            onClick={() => handlePostClick(post)} 
            className='hover:backdrop-brightness-110 hover:cursor-pointer border-b border-stone-700'
            key={post.id}
            >
            <Post postObj={post}/>
        </div>
    )
    
    const isFetched = isFetchedThread && isFetchedPost && isFetchedComments;
    
    const scroll = () => {
        if(postThread.length == 0) window.scroll(0,0);
        else {
            postRef.current.scrollIntoView({ block:'start' });
            window.scrollBy({ top: -60 })
        } 
    }
    
    useEffect(() => {
        if(isFetched) scroll();
    }, [id, postThread])

    return (
        <div> 
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                <p>Fweet</p>
            </div> 
            {isFetched && renderThread()}
            {isFetched && <div ref={postRef} className="[&_>*]:border-b [&_>*]:border-stone-700">
                <Post postObj={postObj}/>
                <WriteComment parent_id={postObj.id}/>
            </div>}
            {isFetched && renderComments()}
        </div>
    )
}

export default ViewPost;