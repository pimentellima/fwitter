import prisma from "../../../../prismaClient";

const handler = async (req, res) => {
  try {
    const author_id = req.query.aid;
    const posts = await prisma.post
      .findMany({
        where: {
          author_id: parseInt(author_id),
        },
        include: {
          comments: true,
          likes: true,
          shares: true,
          bookmarks: true,
          author: true,
        },
        take: 15,
        orderBy: {
          createdAt: "desc",
        },
      })
    if (!posts) return res.status(404).json("Not found");
    return res.status(200).json(posts.map(post => ({
      ...post,
      ingredients: JSON.parse(post.ingredients)
    })));
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
