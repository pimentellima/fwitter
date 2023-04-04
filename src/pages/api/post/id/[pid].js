import prisma from "../../../../server/prismaClient";

const handler = async (req, res) => {
    try {
        if(req.method === 'GET') {
            const id = req.params.id;
            const post = await prisma.post.findMany({
                where: {
                    id
                },
                include: {
                    author: true,
                    comments: true,
                    bookmarks: true,
                    shares: true,
                    likes: true,
                }
            })
            if(!post) return res.status(404).json("Not found");
            return res.status(200).json(post);
        }
        /* if(req.method === 'DELETE') {

        } */
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export default handler;