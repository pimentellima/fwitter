import axios from "axios";

export const getHomePagePostsByUserId = async (userId) => {
  return axios.get(`api/post/home/${userId}`).then((res) =>
    res.data.map((post) => ({
      ...post,
      ingredients: JSON.parse(post.ingredients),
    }))
  );
};

export const getBookmarkedPostsByUserId = async (userId) => {
  return axios.get(`api/post/bookmark/${userId}`).then((res) =>
    res.data.map((post) => ({
      ...post,
      ingredients: JSON.parse(post.ingredients),
    }))
  );
};

export const getPostById = () => {};

export const getPostsByUserId = async (userId) => {
  return axios.get(`api/post/authorid/${userId}`).then((res) =>
    res.data.map((post) => ({
      ...post,
      ingredients: JSON.parse(post.ingredients),
    }))
  );
};
