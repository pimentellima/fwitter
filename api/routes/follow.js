import express from 'express';
import { addFollow, deleteFollow, getFollowers } from '../controllers/follow.js';

const followRouter = express.Router();

followRouter.post('/', addFollow);
followRouter.get('/', getFollowers);
followRouter.delete('/', deleteFollow);

export default followRouter;