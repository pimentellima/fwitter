import { useUser } from "@clerk/nextjs";
import axios from "axios";

const addUserToPosts = async (posts) => {
  const users = await axios.get("api/user").then((res) => res.data);
  return posts.map((post) => {
    const author = users.find((user) => user.id === post.author_id);
    const ingredients = JSON.parse(post.ingredients);
    return { ...post, ingredients, author };
  });
};

export const getHomePagePosts = () => {
  const { user } = useUser();
};

export const getPostById = () => {};

export const getPostsByUserId = async (userId) => {
  const posts = await axios
    .get(`api/post/authorid/${userId}`)
    .then((res) => res.data);
  return addUserToPosts(posts);
};
