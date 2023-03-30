import prisma from '../prismaClient.js'

export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await prisma.post.findMany({
            where: {
                id
            },
            include: {
                author: true,
                comments: true,
                bookmarks: true,
                shares: true,
                likes: true,
                comment: {
                    include: {
                        parent_post: {
                            include: {
                                author: true
                            }
                        }
                    }
                }
            }
        })
        if(posts) return res.status(200).json(posts);
        return res.status(404).json("Not found");
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export const createLike = async (req, res) => {
    try {
        const data = req.body;
        const newLike = await prisma.like.create({
            data
        })
        return res.status(200).json(newLike);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export const deleteLike = async (req, res) => {
    try {
        const { author_id, post_id } = req.body;
        console.log(req.body)
        const deletedLike = await prisma.like.deleteMany({
            where: {
                author_id,
                post_id
            }
        })
        return res.status(200).json(deletedLike);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export const createPost = async (req, res) => {
    try {
        const data = req.body;
        const newPost = await prisma.post.create({
            data
        })
        return res.status(200).json(newPost);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export const createComment = async (req, res) => {
    try {
        const data = req.body;
        const newComment = await prisma.post.create({
            data
        });
        return res.status(200).json(newComment);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}

export const getHomePagePostsByUserId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: {
                id
            }, 
            include: {
                posts: {
                    include: {
                        author: {
                            select: {
                                name: true,
                                username: true
                            }
                        },
                        comments: true,
                        likes: true,
                        shares: true,
                        bookmarks: true
                    }
                }
            }
        })
        if(!user) return res.status(404).json("User not found");
        return res.status(200).json(user.posts);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Error");
    }
}



