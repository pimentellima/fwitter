import prisma from "../../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) return res.status(404).json("User not found");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
