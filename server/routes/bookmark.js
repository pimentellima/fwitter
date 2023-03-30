import express from 'express';
import { 
    createBookmark, 
    deleteBookmark, 
    getPostBookmarks, 
    getBookmarkedPosts 
} from '../../controllers/bookmarks.js';

const bookmarksRouter = express.Router();

bookmarksRouter.get('/:user_id', getBookmarkedPosts);
bookmarksRouter.get('/', getPostBookmarks);
bookmarksRouter.post('/', createBookmark);
bookmarksRouter.delete('/', deleteBookmark);

export default bookmarksRouter;