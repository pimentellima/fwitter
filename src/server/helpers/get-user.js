import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export const getUserById = async (userId) => {
  return axios.get(`api/user/id/${userId}`).then((res) => res.data);
};

export const getUserByUsername = async (username) => {
  const res = await axios.get(`api/user/username/${username}`);
  return res.data;
};

export const useLoggedUser = () => {
  const { data } = useSession();
  return useQuery(
    ["loggedUser"],
    async () => axios.get(`../api/user/id/${data?.user.id}`).then((res) => res.data),
    {
      enabled: !!data,
    }
  );
};
