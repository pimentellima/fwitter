import axios from "axios";

export const getUserById = async (userId) => {
  return axios.get(`api/user/id/${userId}`).then((res) => res.data);
};

export const getUserByUsername = async (username) => {
  const res = await axios
    .get(`api/user/username/${username}`);
  return res.data;
};
