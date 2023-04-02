import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import { request } from '../utils/axios';
import Reactions from './reactions';

const Post = ({ post, children }) => {
    const { 
        author_id,
        createdAt,
        title,
        ingredients,
    } = post;

    const { 
        data: author, 
        isFetching 
    } = useQuery(['user', { id: author_id }], () => 
            request.get(`/api/user/id/${author_id}`)
                .then(res => res.data));

    if(isFetching) return <></>

    return (
        <div className="flex flex-row py-3">
            <img 
                className='user-img hover:cursor-pointer'
                src={author.profileImageUrl} 
                alt='profileImage'
                />
            <div className='flex flex-col w-full mr-6'>
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p className="font-bold hover:underline hover:cursor-pointer">
                            {author?.firstName}
                        </p>
                        <div className="hover:cursor-pointer flex flex-row 
                                        text-sm text-stone-400 gap-1">
                            <p>{'@' + author?.username}</p>
                            <p> {". " + 
                                moment(createdAt, 'YYYY-MM-DD HH:mm:ss')
                                .fromNow(true)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-xl my-1">{title}</p>
                        <p className="font-medium mt-1">
                            {'Ingredientes: '}
                        </p>
                        {ingredients.map((ingredient, index) => (
                            <p key={index} className="inline">  {
                                    ingredient.qt + " " + 
                                    ingredient.unity + " " + 
                                    ingredient.name
                                }
                            </p>
                        ))}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Post;