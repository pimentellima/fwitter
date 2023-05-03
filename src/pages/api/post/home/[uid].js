import prisma from "../../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    const user_id = req.query.uid;

    const following = await prisma.follow
      .findMany({
        where: { follower_id: parseInt(user_id) },
      })
      .then((follows) => follows.map((follow) => follow.followed_id));

    const posts = await prisma.post.findMany({
      where: {
        OR: [{ author_id: { in: following } }, { author_id: parseInt(user_id) }],
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
    return res.status(200).json(posts.map(post => ({
      ...post,
      ingredients: JSON.parse(post.ingredients)
    })));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default handler;
