import express from 'express';
import { getPosts, getUserPosts } from '../controllers/post.js';

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getUserPosts)

export default postsRouter;