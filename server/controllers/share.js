import { db } from "../src/db.js";

export const getShares = (req, res) => {
    const q = 'select * from share where post_id = ?'
    db.query(q, [req.query.post_id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const deleteShare = (req, res) => {
    const q = 'delete from share WHERE post_id = ? and user_id = ?'
    db.query(q, [req.body.post_id, req.body.user_id], ((err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    }))
}

export const createShare = (req, res) => {
    const q = 'insert into share(`post_id`, `user_id`, `date`) values (?)'
    db.query(q, [[req.body.post_id, req.body.user_id, req.body.date]], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json('Post created');
    })
}
