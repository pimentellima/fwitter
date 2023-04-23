import prisma from "../../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { author_id: parseInt(req.query.aid) },
    });
    const posts = await prisma.post.findMany({
      where: {
        author_id: { in: bookmarks.map(b => b.author_id) },
      },
      include: {
          comments: true,
          likes: true,
          shares: true,
          bookmarks: true,
          author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(posts);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
