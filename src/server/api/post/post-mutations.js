import axios from "axios";
import { useMutation } from "react-query";

export const uploadPostImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios
    .post("https://ik.imagekit.io/fwitter", formData)
    .then((res) => res.url);
};

export const useCreatePostMutation = () =>
  useMutation(async (body) => {
    const fileUrl = post_img ? await uploadPostImg(post_img[0]) : "";

    const { image, ...other } = data;

    const postData = {
      /* imageUrl: fileUrl, */
      ...other,
    };

    return axios.post("api/post", { ...body });
  });

export const usePostMutation = () =>
  useMutation(({ options }) => {
    const { url, body, method } = options;
    if (method === "POST") return axios.post(url, { ...body });
    if (method === "DELETE") return axios.delete(url, { data: { ...body } });
  });
