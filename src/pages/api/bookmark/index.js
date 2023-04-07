import prisma from "../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    const { post_id, author_id } = req.body;
    switch (req.method) {
      case "POST":
        const newBookmark = await prisma.bookmark.create({
          data: {
            author_id,
            post_id,
          },
        });
        if (newBookmark) return res.status(200).json(newBookmark);
        return res.status(500).json("Error");
      case "DELETE":
        const deletedBookmark = await prisma.bookmark.deleteMany({
          where: {
            author_id,
            post_id,
          },
        });
        if (deletedBookmark) return res.status(200).json(deletedBookmark);
        return res.status(500).json("Error");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
