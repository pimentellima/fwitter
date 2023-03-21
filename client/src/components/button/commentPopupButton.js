const CommentPopupButton = ({ onClick, comments }) => {
    return(
        <button 
            onClick={onClick} 
            className='group flex justify-center items-center px-2
                    rounded-full [&:hover_path]:stroke-sky-500'
            >
            <div className='transition-all duration-200 bg-sky-500 
                            bg-opacity-0 group-hover:bg-opacity-5
                            p-2 rounded-full'>
                <svg 
                    className='w-5 h-5'
                    viewBox="0 0 24 24" fill="none"
                    >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        />
                    <g id="SVGRepo_iconCarrier"> 
                    <g clipPath="url(#clip0_429_11233)"> 
                        <path className="stroke-stone-400 
                                transition-colors duration-100" 
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 
                            16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 
                            3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 
                            20.6391 10.5124 21 12 21Z" 
                            strokeWidth="1.8" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"/> 
                    </g> 
                        <defs> 
                            <clipPath id="clip0_429_11233"> 
                                <rect width="24" height="24" fill="white"/> 
                            </clipPath> 
                        </defs> 
                    </g>
                </svg>
            </div>
            <p className='text-sm w-3 transition-colors 
                    duration-200 group-hover:text-sky-500 
                    text-stone-400'>
                {comments > 0 ? comments : ''}
            </p>
        </button>
    )
}

export default CommentPopupButton;