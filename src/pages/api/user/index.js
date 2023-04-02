import { clerkClient } from "@clerk/nextjs/server";

const handler = async (req, res) => {
    try {
        const users = await clerkClient.users.getUserList();
        if(!users) return res.status(404).json("Not found users");
        return res.status(200).json(users);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export default handler;