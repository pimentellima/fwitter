import express from 'express';
import { getUser, getUserById, updateUserProfile } from '../controllers/user.js';
    
const userRouter = express.Router();

userRouter.get('/:username', getUser);
userRouter.get('/', getUserById);
userRouter.post('/', updateUserProfile);

export default userRouter;