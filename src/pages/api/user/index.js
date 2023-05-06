import { getToken } from "next-auth/jwt";
import prisma from "../../../server/prismaClient";
import upload from "../../../utils/upload";
import nextConnect from "next-connect";

const handler = nextConnect({
  onError(error, req, res) {
    console.log(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
});

handler.use(upload.single("file"));

handler.put(async (req, res) => {
  try {
    const { name, bio } = req.body;
    const token = await getToken({ req });
    if(!token) return res.status(401).json('Unauthorized');
    console.log('file:' + req.file)

    const user = await prisma.user.update({
      where: { id: parseInt(token.user.id) },
      data: {
        name,
        bio,
        imageUrl: req.file?.path
      },
    });
    if (!user) return res.status(500);
    const { password, ...other } = user;
    return res.status(200).json(other);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
});

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler;
