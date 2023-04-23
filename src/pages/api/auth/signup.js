import prisma from "../../../server/prismaClient";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
        where: {
          username: req.body.username
        }
    });

    if(user.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    const createdUser = await prisma.user.create({
      data: {
        username: req.body.username,
        name: req.body.name,
        password: hash
      }
    })

    return res.status(200).json(createdUser);
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json("Error creating user");
  }
};

export default handler;
