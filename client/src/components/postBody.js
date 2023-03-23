import { baseURL } from "../utils/constants";
import UserBox from "./userBox";
import UserInfo from "./userInfo";
import PostShare from '../components/postShare'
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const PostBody = (props) => {
    const { currentUser } = useContext(AuthContext);

    const { 
        title,
        date,
        user,
        ingredients, 
        description, 
        file, 
        shareUser, 
        isThread,
        parentUser,
        handleUserClick,
        handleRemove,
        children
    } = props;

    return (
        <>
            {shareUser && <PostShare shareUser={shareUser} onClick={handleUserClick}/>}
            <div className="flex flex-row">
                <UserBox user={user} isThread={isThread}/>
                <div className="w-full">
                    <div className='flex justify-between'>
                        <UserInfo user={user} date={date}/>
                        {user.id === currentUser.id && 
                            <button
                                onClick={(e) => handleRemove(e)}
                                >
                                ...
                            </button>
                        }
                    </div>
                    {parentUser && 
                        <div className='text-sm text-stone-400 '>
                            <p className='inline'>{'Respondendo à '}</p>
                            <p onClick={(e) => handleUserClick(e, parentUser)}
                                className='inline hover:cursor-pointer 
                                hover:underline text-stone-200'
                                >
                                @{parentUser.username}
                            </p>
                        </div>
                    }
                    <div className="flex flex-col">
                        <p className="text-xl my-1">{title}</p>
                        {ingredients && ingredients.length > 0 && 
                            <div className="flex flex-col">
                                <p className="font-medium mt-1">
                                    {'Ingredientes: '}
                                </p>
                                {ingredients.map((ingredient, index) => (
                                    <p key={index} className="inline">  {
                                            ingredient.quantity + " " + 
                                            ingredient.unity + " " + 
                                            ingredient.name
                                        }
                                    </p>
                                ))}
                            </div>
                        }
                        {description && 
                            <div>
                                <p className="font-medium mt-2">
                                    {'Descrição: '}
                                </p>
                                <p>{description}</p>
                            </div>
                        }
                        {file && 
                            <img 
                                className="rounded-xl max-h-[500px] mt-4" 
                                src={baseURL + '/upload/post/' + file} 
                                alt=''
                            />
                        }
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostBody;