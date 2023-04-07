import axios from "axios";

export const getUserById = async (userId) => {
  return await axios.get(`api/user/id/${userId}`).then((res) => res.data);
};

export const getUserByUsername = async (username) => {
  return await axios
    .get(`api/user/username/${username}`)
    .then((res) => res.data);
};
