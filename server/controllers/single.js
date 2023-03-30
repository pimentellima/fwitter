import { db } from "../src/db.js";

export const getPost = (req, res) => {
    const q = 'SELECT * from share WHERE id = ?'
    db.query(q, [req.query.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const deletePost = (req, res) => {
    const q = 'DELETE FROM share WHERE id = ?'

    db.query(q, [req.body.id], ((err, data) => {
        if(err) {
            console.log(err)
            return res.json(err);
            
        } 
        return res.status(200).json(data);
    }))
}

export const createPost = (req, res) => {
    const q = 'INSERT INTO share(`user_id`, `parent_id`, `title`, `description`, `ingredients`, `date`, `file`) VALUES (?)'

    const values = [
        req.body.user_id,
        req.body.parent_id,
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
