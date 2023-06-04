import { getToken } from "next-auth/jwt";
import prisma from "../../../prismaClient";

const handler = async (req, res) => {
  try {
    const { post_id } = req.body;
    const token = await getToken({ req });
    if(!token) return res.status(401).json('Unauthorized');

    if(req.method === 'POST') {
      const like = await prisma.like.create({
        data: {
          author_id: parseInt(token.id),
          post_id: parseInt(post_id),
        },
      });
      if (like) return res.status(200).json(like);
      return res.status(400);
    }
    if(req.method === 'DELETE') {
      const like = await prisma.like.deleteMany({
        where: {
          author_id: parseInt(token.id),
          post_id: parseInt(post_id),
        },
      });
      if(like) return res.status(200).json(like);
      return res.status(404);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default handler;
