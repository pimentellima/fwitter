import prisma from "../../../../../server/prismaClient";
import { clerkClient } from "@clerk/nextjs/server";

const handler = async (req, res) => {
  try {
    const author_id = req.query.aid;
    const posts = await prisma.bookmark.findMany({
        where: {
          author_id
        },
        select: {
          post: {
            include: {
                comments: true,
                likes: true,
                shares: true,
                bookmarks: true
            }
          }
        }
      }).then(data => data.map(item => item.post));
    const authorIds = posts.map(post => post.author_id);
    const authors = await clerkClient.users.getUserList({
        userId: authorIds
    });
    const postsWithAuthors = posts.map(post => {
        const author = authors.find(author => author.id === post.author_id);
        return {...post, author};
    });
    if(!postsWithAuthors) return res.status(404).json("Not found");
    return res.status(200).json(postsWithAuthors);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
