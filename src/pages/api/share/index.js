import prisma from "../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    const { author_id, post_id } = req.body;
    switch (req.method) {
      case "POST":
        const newShare = await prisma.share.create({
          data: {
            author_id,
            post_id,
          },
        });
        if (newShare) return res.status(200).json(newShare);
        return res.status(500).json("Error creating share");
      case "DELETE":
        const deletedShare = await prisma.share.deleteMany({
          where: {
            author_id,
            post_id,
          },
        });
        if (deletedShare) return res.status(200).json(deletedShare);
        return res.status(500).json("Error");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
