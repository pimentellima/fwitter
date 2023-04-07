import prisma from "../../../../server/prismaClient";
import { clerkClient } from "@clerk/nextjs/server";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const id = req.params.id;
      const post = await prisma.post.findMany({
        where: {
          id,
        },
        include: {
          comments: true,
          bookmarks: true,
          shares: true,
          likes: true,
        },
      });
      const author = await clerkClient.users.getUser(post.author_id);
      if (!post || !author) return res.status(404).json("Not found");
      return res.status(200).json({...post, author});
    }
    /* if(req.method === 'DELETE') {

        } */
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
