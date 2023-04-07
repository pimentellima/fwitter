import axios from "axios";
import { useMutation } from "react-query";

export const uploadPostImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await request.post("/upload/post/", formData);
  return res.data;
};

export const useCreatePostMutation = () => useMutation((body) => {
    /* const fileUrl = post_img && post_img[0] ? 
        await uploadPostImg(post_img[0]) : ''; */

    /* const { image, ...other } = data;
    const postData = {
      ...other,
    }; */

    return axios.post('api/post', {...body});
})

export const usePostMutation = () => useMutation(({ options }) => {
    const { url, body, method } = options;
    if(method === 'POST') return axios.post(url, {...body})
    if(method === 'DELETE') return axios.delete(url, { data: {...body} })
  }) 
