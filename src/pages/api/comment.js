import prisma from "../../server/prismaClient";

const handler = async (req, res) => {
    try {
        const { data, parentId } = req.body;
        const newPost = await prisma.post.create({
            data
        })
        if(newPost) {
            const comment = await prisma.comment.create({
                data: {
                    post_id: newPost.id,
                    parent_post_id: parentId
                }
            })
            if(comment) return res.status(200).json(comment);
            return res.status(200).json("Error creating comment relation")
        } 
        return res.status(200).json("Error creating post")
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export default handler;