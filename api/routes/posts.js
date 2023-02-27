import express from 'express';
import { getPosts, addPost } from '../controllers/post.js';

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', addPost)

export default postsRouter;