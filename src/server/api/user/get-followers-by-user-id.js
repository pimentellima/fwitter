import { request } from "../../../utils/axios"

export const getFollowersByUserId = async (userId) => 
    await request.get('/api/follow')
        .then(res => res.data.length > 0 ? 
            res.data
            .filter(follow => follow.followed_id === userId)
            .map(follow => follow.follower_id)
            : [])
        

    