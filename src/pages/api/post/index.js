import prisma from "../../../server/prismaClient";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const data = req.body;
      const newPost = await prisma.post.create({
        data,
      });
      return res.status(200).json(newPost);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
};

export default handler;
