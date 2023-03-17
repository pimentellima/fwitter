import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';
import url from 'url';
import authRouter from './routes/auth.js';
import followRouter from './routes/follow.js';
import likesRouter from './routes/likes.js';
import commentsRouter from './routes/comment.js'
import postsRouter from './routes/posts.js';
import userRouter from './routes/users.js';
import singleRouter from './routes/single.js';
import shareRouter from './routes/share.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());    
app.use(cors());
app.use(cookieParser());

app.use(express.static(__dirname));

const postImgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/post')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
const userImgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/user')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
const userBackgroundImgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/user')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const postImgUpload = multer({ storage: postImgStorage })
const userImgUpload = multer({ storage: userImgStorage })
const userBackgroundImgUpload = multer({ storage: userBackgroundImgStorage })

app.post('/upload/post', postImgUpload.single('file'), (req, res) => {
    res.status(200).json(req.file.filename);
});
app.post('/upload/userProfile', userImgUpload.single('file'), (req, res) => {
    res.status(200).json(req.file.filename);
});
app.post('/upload/userBackground', userBackgroundImgUpload.single('file'), (req, res) => {
    res.status(200).json(req.file.filename);
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use('/follow', followRouter);
app.use('/single', singleRouter);
app.use('/share', shareRouter);

app.listen(5000, (err) => {
    if(err) throw err;
    console.log('working')
});
