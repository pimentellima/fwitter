import prisma from "../../../../prismaClient";

const handler = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.query.username,
      },
    });
    if (user) return res.status(200).json({ taken: true });
    else return res.status(200).json({ taken: false });
  } catch (error) {
    return res.status(500).json("Error getting user");
  }
};

export default handler;
