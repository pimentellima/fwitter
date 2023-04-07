import prisma from "../../../../server/prismaClient";
import { clerkClient } from "@clerk/nextjs/server";

const handler = async (req, res) => {
    try {
        const user_id = req.query.uid;

        const following = await prisma.follow.findMany({
            where: { follower_id: user_id },
        }).then(follows => follows.map(follow => follow.followed_id));

        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { author_id: { in: following } },
                    { author_id: user_id }
                ]
            },
            include: {
                comments: true,
                likes: true,
                shares: true,
                bookmarks: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
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
    }
    catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
} 

export default handler;