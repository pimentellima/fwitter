import { db } from "../db.js";

export const addFollow = (req, res) => {
    const q = 'INSERT INTO follow(`followed_user_id`, `follower_user_id`) VALUES (?)';
    const values = [req.body.followed_user_id, req.body.follower_user_id];
    db.query(q, [values], (error, data) => {
        if(error) console.log(error)
        if(error) return res.json(error);
        return res.status(200).json(data);
    })
}

export const deleteFollow = (req, res) => {
    const q = 'DELETE FROM follow WHERE (follower_user_id = ? AND followed_user_id = ?)';
    db.query(q, [req.body.follower_user_id, req.body.followed_user_id], (error, data) => {
        if(error) return res.json(error);
        return res.status(200).json(data);
    })
}

export const getFollowers = (req, res) => {
    const q = 'SELECT follower_user_id FROM follow WHERE followed_user_id = ?';
    db.query(q, [req.query.followed_user_id], (error, data) => {
        if(error) return res.json(error);
        return res.status(200).json(data);
    })
}


