import axios from "axios";

export const getUserByUrl = async(url) => {
    try {
        const res = await axios.get(`//localhost:5000/user${url}`);
        return res.data[0];
    } catch(err) {
        console.error(err);
    }
}

export const getUserById = async(id) => {
    try {
        const res = await axios.get(`//localhost:5000/user/`, {
            params:{ id }
        });
        return res.data[0];
    } catch(err) {
        console.error(err);
    }
}