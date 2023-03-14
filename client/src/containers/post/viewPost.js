import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import 'moment/locale/pt-br';
import { useContext } from "react";
import { useMatch } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { getComments, getPostById } from "../../services/postsService";
import { baseURL } from "../../utils/constants";
import WriteComment from "../write/writeComment";
import Post from "./post";

const ViewPost = () => {
    const match = useMatch("/post/:id");
    const id = match.params.id;
    const { currentUser } = useContext(AuthContext);

    const { 
        data: postObj, 
        isFetched: isFetchedPost 
    } = useQuery(['post', { id }], () => 
        getPostById(id).then(post => ({
                ...post, 
                ingredients: JSON.parse(post.ingredients),
                date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
            }
        ))
    )

    const {
        data: comments,
        isFetched: isFetchedComments
    } = useQuery(['postComments', { parent_id: id }], () => 
        getComments(postObj.id),
        {
            enabled: isFetchedPost
        }
    )

    return (
        <div> 
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                <p>Fweet</p>
            </div> 
            {isFetchedPost && <Post postObj={postObj}/>}
            <div className="flex flex-row py-2 pr-3  border-b border-stone-700">
                <div className="w-20 flex justify-center">  
                    <img 
                        className='w-12 h-12 rounded-[40px]' 
                        src={baseURL + '/upload/user/' + currentUser.profile_img}
                        alt=''
                        />
                </div>
                <div className="w-full">
                    {isFetchedPost && <WriteComment postObj={postObj}/>}
                </div>
            </div>
            {isFetchedComments && isFetchedPost && comments.map(comment => 
            <div key={comment.id}>
                <Post postObj={comment}/>
            </div>)
            }
        </div>
    )
}

export default ViewPost;