import prisma from "../../../prismaClient";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
  try {
    console.log(req)
      const user = await prisma.user.findFirst({
        where: {
          username: req.body.username
        }
      })

      if(!user) return res.status(404).json('User not found');
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      if (isPasswordCorrect) {
        const { password, ...other } = user;
        return res.status(200).json(other);
      }
      return res.status(403).json("Incorrect password");
      
    }
    catch(error) {
      console.log(error)
      return res.status(500).json("Error signing in")
    }
};

export default handler;
