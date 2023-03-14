import express from 'express';
import { getComments } from '../controllers/comment.js';

const commentsRouter = express.Router();

commentsRouter.get('/', getComments);

export default commentsRouter;