import prisma from "../../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(req.query.pid)
        },
        include: {
          comments: true,
          bookmarks: true,
          shares: true,
          likes: true,
          author: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              username: true,
              password: false
            }
          },
        },
      });
      
      if(!post) return res.status(404).json('Not found');
      return res.status(200).json({
        ...post,
        ingredients: JSON.parse(post.ingredients)
      });
    }
    /* if(req.method === 'DELETE') {

        } */
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handler;
