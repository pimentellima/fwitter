import axios from "axios";

export const getHomePagePostsByUserId = async (userId) =>
  axios.get(`api/post/home/${userId}`).then((res) => res.data);

export const getBookmarkedPostsByUserId = async (userId) =>
  axios.get(`api/post/bookmark/${userId}`).then((res) => res.data);

export const getPostById = async (postId) => {
  const url = `http://localhost:3000/api/post/pid/${postId}`
  return axios.get(url).then((res) => res.data);
}

export const getPostsByUserId = async (userId) =>
  axios.get(`api/post/authorid/${userId}`).then((res) => res.data);
