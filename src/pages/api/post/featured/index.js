import prisma from "../../../../prismaClient";

const handler = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
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
      take: 15,
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: 15,
    });
    return res.status(200).json(
      posts.map((post) => ({
        ...post,
        ingredients: JSON.parse(post.ingredients),
      }))
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export default handler;
