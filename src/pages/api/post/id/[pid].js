import prisma from "../../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(req.params.id)
        },
        include: {
          comments: true,
          bookmarks: true,
          shares: true,
          likes: true,
          author: true,
        },
      });
      if(!post) return res.status(404).json('Not found');
      return res.status(200).json(post);
    }
    /* if(req.method === 'DELETE') {

        } */
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
