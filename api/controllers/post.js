import { db } from "../db.js";

export const getPosts = (req, res) => {
    const follows = '(SELECT followed_user_id FROM follow WHERE follower_user_id = ?)'
    const shares = `(SELECT post_id FROM shares WHERE user_id IN ${follows})`
    const q = `
        SELECT * FROM posts 
        WHERE user_id = ? 
            OR user_id IN ${follows} 
            OR id IN ${shares}
        ORDER BY date DESC
    `
    db.query(q, [req.query.id, req.query.id, req.query.id], (err, data) => {
        if(err) {
            console.log(err)
            return res.json(err);
        }
        console.log(data)
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

