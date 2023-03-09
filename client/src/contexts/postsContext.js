import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { getPostsById } from "../services/posts";
import { AuthContext } from "./authContext";

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(currentUser) {
            fetchPosts();
        }
    }, [])

    const fetchPosts = async() => {
        const posts = await getPostsById(currentUser.id);
        setPosts(posts);
    }

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsProvider;