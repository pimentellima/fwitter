import prisma from "../../../prismaClient";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  try {
    const token = await getToken({ req });
    if(!token) return res.status(401).json('Unauthorized');

    const { title, post_id } = req.body;
    const comment = await prisma.comment.create({
      data: {
        title,
        author_id: parseInt(token.user.id),
        post_id: parseInt(post_id)
      }
    });
    if(!comment) return res.status(400).json("Error creating comment");
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

export default handler;
