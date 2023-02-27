import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = 'SELECT * FROM posts WHERE user_id = ? OR user_id IN (SELECT followed_user_id from follow WHERE follower_user_id = ?) ORDER BY date DESC'
    db.query(q, [req.query.id, req.query.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const addPost = (req, res) => {
    const q = 'INSERT INTO posts(`user_id`, `user_name`, `user_username`, `title`, `description`, `ingredients`, `date`, `file`) VALUES (?)'

    const values = [
        req.body.user_id,
        req.body.user_name,
        req.body.user_username,
        req.body.title,
        req.body.description,
        req.body.ingredients,
        req.body.date,
        req.body.file
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json('Post created');
    })
}
