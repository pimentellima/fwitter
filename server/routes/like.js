import express from 'express';
import { createLike, deleteLike, getLikes } from '../../controllers/like.js';

const likesRouter = express.Router();

likesRouter.get('/', getLikes);
likesRouter.post('/', createLike);
likesRouter.delete('/', deleteLike);

export default likesRouter;