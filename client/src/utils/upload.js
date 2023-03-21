import { request } from "./axios";

export const uploadPostImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await request.post('/upload/post/', formData);
    return res.data;
}

export const uploadProfileImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await request.post('/upload/userProfile', formData);
    return res.data;
}

export const uploadBackgroundImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await request.post('/upload/userBackground', formData);
    return res.data;
}

