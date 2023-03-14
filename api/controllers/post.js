import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = 'SELECT * FROM posts WHERE user_id = ? OR user_id IN (SELECT followed_user_id FROM follow WHERE follower_user_id = ?) ORDER BY date DESC'
    db.query(q, [req.query.id, req.query.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const getUserPosts = (req, res) => {
    const q = 'SELECT * FROM posts WHERE user_id = ? ORDER BY date DESC'
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

