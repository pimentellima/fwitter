import { db } from "../src/db.js";

export const getLikes = (req, res) => {
    const q = 'SELECT * FROM like WHERE post_id = ?'
    db.query(q, [req.query.post_id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const createLike = (req, res) => {
    const q = 'INSERT INTO like(`post_id`, `user_id`) VALUES (?)'
    db.query(q, [[req.body.post_id, req.body.user_id]], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const deleteLike = (req, res) => {
    const q = 'DELETE FROM like WHERE (post_id = ? AND user_id = ?)'
    db.query(q, [req.body.post_id, req.body.user_id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}