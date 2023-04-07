import axios from "axios";

export const getUserById = async (userId) => {
  return await axios.get(`api/user/${userId}`).then((res) => res.data);
};

export const getUserByUsername = async (username) => {
  return await axios
    .get("api/user")
    .then((res) => res.data.find((user) => user.username === username));
};
