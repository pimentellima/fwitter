import prisma from "../../../server/prismaClient";
import nextConnect from 'next-connect';
import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';
import { getToken } from "next-auth/jwt";

const upload = multer({
  storage: new MulterGoogleCloudStorage({
    bucket: process.env.GCS_BUCKET,
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEYFILE,
    
  }),
});

const handler = nextConnect({
  onError(error, req, res) {
    console.log(error);
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  }
});

handler.use(upload.single('file'));

handler.post(async (req, res) => {
  try {
    const token = await getToken({ req });
    if(!token) return res.status(401).json('Unauthorized');
    const { title, ingredients, author_id } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        ingredients,
        author_id: parseInt(token.user.id),
        imageUrl: req.file?.path
      }
    });
    return res.status(200).json(newPost);
  } 
  catch (err) {
    return res.status(500).json(err);
  }
})

export default handler;

export const config = {
  api: {
    bodyParser: false
  },
};
