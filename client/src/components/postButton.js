const PostButton = ({ onClick, type }) => {
    return (
        <button 
            onClick={onClick}
            type={type ? type : 'button'}
            className=' hover:cursor-pointer hover:bg-stone-600 py-1 px-5 text-lg transition ease-out duration-100 font-bold rounded-3xl bg-stone-500 w-24'
            >
            Fweet
        </button>
    )
}

export default PostButton;