import { db } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if(err) res.status(500).json(err);
        const len = data.length;
        if(len) return res.status(409).json('Username already exists');

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = 'INSERT INTO users(`username`, `name`, `password`) VALUES (?)';
        const values = [req.body.username, req.body.name, hash];

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json('Account created successfully')
        })
    })
}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err);
        const len = data.length;
        if(len === 0) {
            return res.status(404).json('Not found');
        }
        
        if(!req.body.password) return res.status(204).json('Invalid password')

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        )
        
        if(!isPasswordCorrect) {
            return res.status(400).json("Incorrect password")
        }
        
        const {password, ...other} = data[0];

        const token = jwt.sign({id: data[0].id}, "jwtkey");

        res.status(200).json(other);
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Logged out")
  };