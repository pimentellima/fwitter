import express from 'express';
import { createPost, deletePost, getPost  } from '../../controllers/single.js';

const singleRouter = express.Router();

singleRouter.post('/', createPost);
singleRouter.get('/', getPost);
singleRouter.delete('/', deletePost);

export default singleRouter;