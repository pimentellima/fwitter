import express from 'express';
import { getPosts, getUserPosts, addPost  } from '../controllers/post.js';

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', addPost);
postsRouter.get('/:id', getUserPosts)

export default postsRouter;