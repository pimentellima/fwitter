import prisma from "../../../prismaClient";

const handler = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await prisma.user.findFirst({ 
        where: { username },
        include: {
            followers: true,
            following: true,
            posts: {
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
                createdAt: 'desc'
              }
            }
        }
     });
    if (!user) return res.status(404).json("User not found");
    const { password, ...other } = user;
    const posts = other.posts.map(post => ({
      ...post,
      ingredients: JSON.parse(post.ingredients)
    }));
    return res.status(200).json({
      ...other,
      posts
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
