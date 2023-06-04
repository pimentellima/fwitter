import { getToken } from "next-auth/jwt";
import prisma from "../../../../prismaClient";

const handler = async (req, res) => {
  try {
    const token = await getToken({ req });
    if (!token) return res.status(401).json("Unauthorized");

    const following = await prisma.follow
      .findMany({
        where: { follower_id: parseInt(token.id) },
      })
      .then((follows) => follows.map((follow) => follow.followed_id));

    const posts = await prisma.post.findMany({
      where: {
        OR: [{ author_id: { in: following } }, { author_id: parseInt(token.id) }],
      },
      include: {
        bookmarks: true,
        comments: true,
        likes: true,
        shares: true,
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            username: true,
            password: false
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(
      posts.map((post) => ({
        ...post,
        ingredients: JSON.parse(post.ingredients),
      }))
    );
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

export default handler;
