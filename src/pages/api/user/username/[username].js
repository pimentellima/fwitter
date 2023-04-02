import { clerkClient } from "@clerk/nextjs/server";

const handler = async (req, res) => {
    try {
        const { username } = req.query;
        const users = await clerkClient.users.getUserList({
            username
        })
        if(!users) return res.status(404).json("User not found");
        return res.status(200).json(users[0]);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export default handler;