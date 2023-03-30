import express from 'express';
import { 
    createComment,
    createLike,
    createPost, 
    deleteLike, 
    getHomePagePostsByUserId, 
    getPostById 
} from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/post/:id', getPostById);
postRouter.get('/:id', getHomePagePostsByUserId);
postRouter.post('/', createPost);
postRouter.post('/comment', createComment);
postRouter.post('/like', createLike);
postRouter.delete('/like', deleteLike);

export default postRouter;