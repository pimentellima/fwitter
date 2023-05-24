import prisma from "../../../../prismaClient";

const handler = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        author: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: 5,
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
