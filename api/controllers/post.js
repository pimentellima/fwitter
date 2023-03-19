import { db } from "../db.js";

export const getPosts = (req, res) => {
    const follows = `(select followed_user_id from follow where follower_user_id = ?)`
    const q = `
        (
            select *, "" as share_user_id from posts where user_id = ? or user_id in ${follows}
            union 
            (
                select 
                posts.id, 
                posts.user_id, 
                shares.date, 
                posts.description, 
                posts.title, 
                posts.ingredients, 
                posts.file, 
                posts.parent_id,
                shares.user_id as share_user_id
                from posts inner join shares
                on shares.post_id = posts.id and shares.user_id in ${follows}
            )
        ) order by date desc 
    `
    db.query(q, [req.query.id,req.query.id, req.query.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const getUserPosts = (req, res) => {
    const q = `
        (
            select *, "" as share_user_id from posts where user_id = ?
            union 
            (
                select 
                posts.id, 
                posts.user_id, 
                shares.date, 
                posts.description, 
                posts.title, 
                posts.ingredients, 
                posts.file, 
                posts.parent_id,
                shares.user_id as share_user_id
                from posts inner join shares
                on shares.post_id = posts.id and shares.user_id = ?
            )
        ) order by date desc 
    `
    db.query(q, [req.params.id, req.params.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

