import express from 'express';
import { getPosts, getUserPosts, addPost, deletePost  } from '../controllers/post.js';

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', addPost);
postsRouter.get('/:id', getUserPosts)
postsRouter.delete('/', deletePost)

export default postsRouter;