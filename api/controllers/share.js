import { db } from "../db.js";

export const getShares = (req, res) => {
    const q = 'SELECT * from shares WHERE post_id = ?'
    db.query(q, [req.query.post_id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const deleteShare = (req, res) => {
    const q = 'DELETE FROM shares WHERE id = ?'
    db.query(q, [req.body.id], ((err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    }))
}

export const createShare = (req, res) => {
    const q = 'INSERT INTO shares(`post_id`, `user_id`, `date`) VALUES (?)'
    db.query(q, [[req.body.post_id, req.body.user_id, req.body.date]], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json('Post created');
    })
}
