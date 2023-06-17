import { getToken } from "next-auth/jwt";
import prisma from "../../../../prismaClient";

const handler = async (req, res) => {
  try {
    const token = await getToken({ req });
    if (!token) return res.status(401).json("Unauthorized");

    const followings = await prisma.follow
      .findMany({
        where: { follower_id: parseInt(token.id) },
      })
      .then((follows) => follows.map((follow) => follow.followed_id));

    const shares = await prisma.share.findMany({
      where: { author_id: { in: followings } },
      select: {
        createdAt: true,
        author: {
          select: {
            name: true,
            username: true
          },
        },
        post: {
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
                password: false,
              },
            },
          },
        },
      },
      take: 15,
    });

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { author_id: { in: followings } },
          { author_id: parseInt(token.id) },
        ],
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
            password: false,
          },
        },
      },
      take: 15,
    });

    const postsWithShares = [
      ...posts.map((post) => ({
        ...post,
        ingredients: JSON.parse(post.ingredients),
        type: "post",
      })),
      ...shares.map(({ createdAt, author, post }) => ({
        ...post,
        ingredients: JSON.parse(post.ingredients),
        shareAuthor: author,
        sharedAt: createdAt,
        type: "share",
      })),
    ].sort((a, b) => {
      const aValue = a.type === "post" ? a.createdAt : a.sharedAt;
      const bValue = b.type === "post" ? b.createdAt : b.sharedAt;
      if (aValue < bValue) return 1;
      if (aValue > bValue) return -1;
      else return 0;
    });

    return res.status(200).json(postsWithShares);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default handler;
