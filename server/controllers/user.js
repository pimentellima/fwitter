import { db } from "../src/db.js";

export const getUserByUsername = (req, res) => {
    const q = 'SELECT `id`, `name`, `username`, `bio`, `profile_img`, `profile_bg_img` FROM user WHERE username = ?';
    db.query(q, [req.params.username], (error, data) => {
        if(error) return res.json(error);
        return res.status(200).json(data);
    })
}

export const getUserById = (req, res) => {
    const q = 'SELECT `id`, `name`, `username`, `bio`, `profile_img`, `profile_bg_img` FROM user WHERE id = ?';
    db.query(q, [req.query.id], (error, data) => {
        if(error) return res.json(error);
        return res.status(200).json(data);
    })
}

export const updateUserProfile = (req, res) => {
    const q = 'UPDATE USERS SET name = ?, bio = ?, profile_img = ?, profile_bg_img = ? WHERE id = ?'
    db.query(q, [req.body.name, req.body.bio, req.body.profile_img, req.body.profile_bg_img, req.body.id], (error, data) => {
        if(error) return res.json(error);
        return res.status(204).json(data);
    })
}
    

