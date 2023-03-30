import bcrypt from 'bcryptjs';
import prisma from '../prismaClient.js'

export const createUser = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            } 
        });
        
        if(existingUser) {
            return res.status(409).json('Username already exists');
        }
    
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
    
        const newUser = await prisma.user.create({ 
            data: { 
                name, 
                username, 
                password: hash 
            }
        })
        return res.status(200).json(newUser);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json(err);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        console.log(user)
        if(!user) return res.status(404).json("User not found");
        const isPasswordCorrect = bcrypt.compareSync(
            password, 
            user.password
        );
        if(!isPasswordCorrect) {
            return res.status(400).json("Incorrect password")
        }
        const { password: p, createdAt, ...other } = user;
        return res.status(200).json(other);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    } 
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id
            } 
        });
        if(!user) return res.status(404).json("User not found");
        return res.status(204).json(user);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    } 
}

export const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await prisma.user.findUnique({
            where: {
                username
            } 
        });
        if(!user) return res.json(error);
        return res.status(204).json(user);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    } 
}