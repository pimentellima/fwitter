import express from 'express';
import { getUserByUsername, getUserById, updateUserProfile } from '../controllers/user.js';
    
const userRouter = express.Router();

userRouter.get('/:username', getUserByUsername);
userRouter.get('/', getUserById);
userRouter.post('/', updateUserProfile);

export default userRouter;