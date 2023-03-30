import express from 'express';
import { 
    createUser, 
    getUserById, 
    getUserByUsername, 
    login
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/:id', getUserById);
userRouter.get('/username/:username', getUserByUsername);
userRouter.post('/signup', createUser);
userRouter.post('/login', login);


export default userRouter;