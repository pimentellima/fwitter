import prisma from "../../server/prismaClient";

const handler = async (req, res) => {
    try {
        const { follower_id, followed_id } = req.body;
        switch(req.method) {
            case 'GET':
                const follows = await prisma.follow.findMany();
                if(follows) return res.status(200).json(follows);
                return res.status(404).json("Not found")
            case 'POST':
                const newFollow = await prisma.follow.create({
                    data: {
                        follower_id,
                        followed_id
                    }
                });
                if(newFollow) return res.status(200).json(newFollow);
                return res.status(500).json("Error");
            case 'DELETE':
                const deletedFollow = await prisma.follow.deleteMany({
                    where: {
                        follower_id,
                        followed_id
                    }
                });
                if(deletedFollow) return res.status(200).json(deletedFollow);
                return res.status(600).json("Error")
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export default handler;