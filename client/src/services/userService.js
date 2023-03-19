import { request } from '../utils/axios';

export const getUserByUsername = async username => {
    const res = await request.get('/user/' + username);
    return res.data[0];
}

export const getUserById = async id => {
    const res = await request.get('/user', {
        params:{ id }
    });
    return res.data[0];
}

