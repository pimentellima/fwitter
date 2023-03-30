import { db } from "../src/db.js";

export const getComments = (req, res) => {
    const q = 'SELECT * FROM posts WHERE parent_id = ?'
    db.query(q, [req.query.parent_id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}
