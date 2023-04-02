import prisma from "../../server/prismaClient";

const handler = async (req, res) => {
    try {
        const { author_id, post_id } = req.body;
        const share = await prisma.share.create({
            data: {
                author_id,
                post_id
            }
        })
        if(share) return res.status(200).json(share);
        return res.status(500).json("Error creating share")
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export default handler;