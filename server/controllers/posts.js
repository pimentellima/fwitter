import { db } from "../src/db.js";

export const getHomePagePostsByUserId = (req, res) => {
    const follows = `(select followed_user_id from follow 
                        where follower_user_id = ?)`
    const q = `
        (
            select *, "" as share_user_id from post 
                where user_id = ? or user_id in ${follows}
            union 
            (
                select 
                post.id, 
                post.user_id, 
                shares.date, 
                post.description, 
                post.title, 
                post.ingredients, 
                post.file, 
                post.parent_id,
                shares.user_id as share_user_id
                from post inner join shares
                on shares.post_id = post.id 
                    and shares.user_id in ${follows}
            )
        ) order by date desc 
    `
    db.query(q, [req.query.id,req.query.id, req.query.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const getSinglePostById = (req, res) => {
    const q = 'SELECT * from post WHERE id = ?'
    db.query(q, [req.query.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const getUserPostsByUserId = (req, res) => {
    const q = `
        (
            select *, "" as share_user_id from post where user_id = ?
            union 
            (
                select 
                post.id, 
                post.user_id, 
                shares.date, 
                post.description, 
                post.title, 
                post.ingredients, 
                post.file, 
                post.parent_id,
                shares.user_id as share_user_id
                from post inner join shares
                on shares.post_id = post.id and shares.user_id = ?
            )
        ) order by date desc 
    `
    db.query(q, [req.params.id, req.params.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

