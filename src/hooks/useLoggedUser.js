import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export const useLoggedUser = () => {
  const { data } = useSession();
  return useQuery(
    ["loggedUser"],
    async () => axios.get(`../api/user/${data?.user.id}`).then((res) => res.data),
    {
      enabled: !!data,
    }
  );
};
