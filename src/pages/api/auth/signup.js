import { z } from "zod";
import prisma from "../../../prismaClient";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    z.object({
      username: z.string().min(6),
      password: z.string().min(6),
      name: z.string(),
    }).parse({
      username,
      name,
      password,
    });

    const user = await prisma.user.findMany({
      where: {
        username,
      },
    });

    if (user.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        password: hash,
      },
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error creating user");
  }
};

export default handler;
