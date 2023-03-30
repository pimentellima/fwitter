import express from 'express';
import { getHomePagePostsByUserId, getSinglePostById, getUserPostsByUserId } from '../../controllers/posts.js';

const postsRouter = express.Router();

postsRouter.get('/', getHomePagePostsByUserId);
postsRouter.get('/single', getSinglePostById);
postsRouter.get('/:id', getUserPostsByUserId)

export default postsRouter;