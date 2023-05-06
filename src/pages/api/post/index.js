import { getToken } from "next-auth/jwt";
import nextConnect from 'next-connect';
import prisma from "../../../prismaClient";
import upload from '../../../utils/upload';

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
    console.log(err);
    return res.status(500).json(err);
  }
})

export default handler;

export const config = {
  api: {
    bodyParser: false
  },
};
