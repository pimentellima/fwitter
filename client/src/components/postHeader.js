const PostHeader = ({ user, date, handleUserClick }) => { 

    return (
        <div className="flex justify-between">
        {/* {parentUser && 
                        <div className='text-sm text-stone-400 '>
                            <p className='inline'>{'Respondendo à '}</p>
                            <p onClick={(e) => handleUserClick(e, parentUser)}
                                className='inline hover:cursor-pointer 
                                hover:underline text-stone-200'
                                >
                                @{parentUser.username}
                            </p>
                        </div>
                    } */}
            <div 
                className="flex gap-2 items-center"
                onClick={handleUserClick} 
                >
                <p className="font-bold hover:underline hover:cursor-pointer">
                    {user?.name}
                </p>
                <div className="hover:cursor-pointer flex flex-row 
                                text-sm text-stone-400 gap-1">
                    <p>{'@' + user?.username}</p>
                    <p> 
                        {"· " + date}
                    </p>
                </div>
            </div>
            {/* {user.id === currentUser.id && 
                            <button
                                onClick={(e) => handleRemove(e)}
                                >
                                ...
                            </button>
                        } */}
        </div>
    )
}

export default PostHeader;