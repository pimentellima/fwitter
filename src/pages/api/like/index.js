import prisma from "../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    const { post_id, author_id } = req.body;
    switch (req.method) {
      case "POST":
        const newLike = await prisma.like.create({
          data: {
            author_id,
            post_id,
          },
        });
        if (newLike) return res.status(200).json(newLike);
        return res.status(500).json("Error");
      case "DELETE":
        const deletedLike = await prisma.like.deleteMany({
          where: {
            author_id,
            post_id,
          },
        });
        return res.status(200).json(deletedLike);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
