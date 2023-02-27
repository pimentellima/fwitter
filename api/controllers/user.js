import { db } from "../db.js";

export const getUsers = (req, res) => {
    db.query('SELECT * FROM users', (error, data) => {
        if(error) return res.json(error);
        return res.status(200).json(data);
    })
}

