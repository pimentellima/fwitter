const PostButton = ({ onClick, type, isValid }) => {
    return (
        <button 
            onClick={onClick}
            type={type ? type : 'button'}
            className={`
                        justify-self-end  h-10 w-full py-1 px-5 text-lg 
                        transition ease-out duration-100 font-bold 
                        rounded-3xl bg-stone-500 
                        ${isValid ? 
                            'hover:cursor-pointer hover:bg-stone-600' 
                            : 
                            'opacity-50 cursor-default'
                        } 
            `}
            >
            Fweet
        </button>
    )
}

export default PostButton;