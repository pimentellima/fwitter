import { db } from "../db.js";

export const getPostBookmarks = (req, res) => {
    const q = 'select * from bookmarks where post_id = ?'
    db.query(q, [req.query.post_id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const getBookmarkedPosts = (req, res) => {
    const q = `select * from posts where id in (
        select post_id from bookmarks where user_id = ?
    ) order by date desc`
    db.query(q, [req.params.user_id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const deleteBookmark = (req, res) => {
    const q = 'delete from bookmarks where user_id = ? and post_id = ?'
    db.query(q, [req.body.user_id, req.body.post_id], ((err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    }))
}

export const createBookmark = (req, res) => {
    const q = 'insert into bookmarks(`post_id`, `user_id`) values (?)'
    db.query(q, [[req.body.post_id, req.body.user_id]], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json('Post created');
    })
}
