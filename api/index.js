import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';
import url from 'url';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import userRouter from './routes/users.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());    
app.use(cors());
app.use(cookieParser());

app.use(express.static(__dirname));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json(req.file.filename);
});

app.use('', userRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.listen(5000, (err) => {
    if(err) throw err;
    console.log('working')
});
