import { getToken } from "next-auth/jwt";
import prisma from "../../../prismaClient";

const handler = async (req, res) => {
  try {
    const { post_id } = req.body;
    const token = await getToken({ req });
    if(!token) return res.status(401).json('Unauthorized');

    if (req.method === "POST") {
      const newBookmark = await prisma.bookmark.create({
        data: {
          author_id: parseInt(token.user.id),
          post_id: parseInt(post_id),
        },
      });
      if (newBookmark) return res.status(200).json(newBookmark);
      return res.status(500).json("Error");
    }
    if (req.method === "DELETE") {
      const deletedBookmark = await prisma.bookmark.deleteMany({
        where: {
          author_id: parseInt(token.user.id),
          post_id: parseInt(post_id),
        },
      });
      if (deletedBookmark) return res.status(200).json(deletedBookmark);
      return res.status(500).json("Error");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
