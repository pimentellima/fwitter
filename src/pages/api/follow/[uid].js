import prisma from "../../../server/prismaClient";

const handler = async (req, res) => {
    const { followed_id } = req.params;
    const follows = await prisma.follow.findMany({
        where: {
            followed_id
        }
    });
    if(follows) return res.status(200).json(follows);
    return res.status(404).json("Not found")
}

export default handler;