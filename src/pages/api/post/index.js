import multer, { memoryStorage } from "multer";
import { getToken } from "next-auth/jwt";
import nextConnect from "next-connect";
import prisma from "../../../prismaClient";
import uploadFile from "../../../utils/uploadFile";

const handler = nextConnect({
  onError(error, req, res) {
    console.log(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
});

const upload = multer({ storage: memoryStorage() });

handler.use(upload.single("file"));

handler.post(async (req, res) => {
  try {
    const token = await getToken({ req });
    if (!token) return res.status(401).json("Unauthorized");

    if (req.file) {
      req.file.path = await uploadFile(req.file);
    }
    const { title, ingredients } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        ingredients,
        author_id: parseInt(token.id),
        imageUrl: req.file?.path,
      },
    });
    return res.status(200).json(newPost);
  } catch (err) {
    return res.status(500).json('Internal error');
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
