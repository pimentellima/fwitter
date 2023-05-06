import prisma from "../../../prismaClient";

const handler = async (req, res) => {
  try {
    const { uid } = req.query;
    const user = await prisma.user.findUnique({ where: { id: parseInt(uid) } });
    if (!user) return res.status(404).json("User not found");
    const { password, ...other } = user;
    return res.status(200).json(other);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
