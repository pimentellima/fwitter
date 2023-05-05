import axios from "axios";

export const getHomePagePostsByUserId = async (userId) =>
  axios.get(`api/post/home/${userId}`).then((res) => res.data);

export const getBookmarkedPostsByUserId = async (userId) =>
  axios.get(`api/post/bookmark/${userId}`).then((res) => res.data);

export const getPostById = async (postId) => 
  axios.get(`../api/post/pid/${postId}`).then((res) => res.data);

export const getPostsByUserId = async (userId) =>
  axios.get(`api/post/authorid/${userId}`).then((res) => res.data);
