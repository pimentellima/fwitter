import prisma from "../../../server/prismaClient";

const handler = async (req, res) => {
  const { uid } = req.query;
  const follows = await prisma.follow.findMany({
    where: {
      OR: [{ followed_id: uid }, { follower_id: uid }],
    },
  });
  if (follows) return res.status(200).json(follows);
  return res.status(404).json("Not found");
};

export default handler;
