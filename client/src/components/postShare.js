const PostShare = ({ shareUser, onClick }) => {
    return (
        <p onClick={(e) => onClick(e, shareUser)} 
            className='align-middle w-fit text-sm text-stone-400 
                        font-medium ml-4 mb-2 hover:underline'
            >
            {`${shareUser.name} refweetou`}
        </p>
    )
}

export default PostShare;