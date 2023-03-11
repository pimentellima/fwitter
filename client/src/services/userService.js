import axios from "axios";

export const getUserByUrl = async url => {
    const res = await axios.get(`//localhost:5000/user${url}`);
    return res.data[0];
}

export const getUserById = async id => {
    const res = await axios.get(`//localhost:5000/user/`, {
        params:{ id }
    });
    return res.data[0];
}