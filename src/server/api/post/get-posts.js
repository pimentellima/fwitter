import axios from "axios";

export const getHomePagePosts = () => {};

export const getBookmarkedPostsByUserId = async (userId) => {
  return await axios
    .get(`api/post/authorid/bookmark/${userId}`)
    .then(res => res.data.map(post => ({
      ...post,
      ingredients: JSON.parse(post.ingredients)
    })))
};

export const getPostById = () => {};

export const getPostsByUserId = async (userId) => {
  return await axios
    .get(`api/post/authorid/${userId}`)
    .then((res) =>
      res.data.map((post) => ({
        ...post,
        ingredients: JSON.parse(post.ingredients),
      }))
    );
};
