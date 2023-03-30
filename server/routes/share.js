import express from 'express';
import { createShare, deleteShare, getShares } from '../../controllers/share.js';

const shareRouter = express.Router();
shareRouter.get('/', getShares);
shareRouter.post('/', createShare);
shareRouter.delete('/', deleteShare);

export default shareRouter;