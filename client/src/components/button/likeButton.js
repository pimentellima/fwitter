const LikeButton = ({ active, likes, onClick }) => {
    return(
        <button 
            onClick={onClick} 
            className='group flex justify-center items-center px-2
                    rounded-full [&:hover_path]:stroke-red-500'
            >
            <div className='transition-all duration-200 bg-red-500 
                            bg-opacity-0 group-hover:bg-opacity-5
                            p-2 rounded-full'>
                <svg 
                    className={`${active && 'fill-red-500'} w-5 h-5`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" 
                        strokeLinejoin="round">
                    </g>
                    <g id="SVGRepo_iconCarrier"> 
                    <path 
                        className={`transition-colors duration-200
                                ${active ? 'stroke-red-500' 
                                : 'stroke-stone-400'}`}
                        strokeWidth="2" 
                        strokeLinejoin="round"
                        d="M4.8824 12.9557L10.5021 19.3071C11.2981 20.2067 12.7019 
                        20.2067 13.4979 19.3071L19.1176 12.9557C20.7905 11.0649 
                        21.6596 8.6871 20.4027 6.41967C18.9505 3.79992 16.2895 
                        3.26448 13.9771 5.02375C13.182 5.62861 12.5294 6.31934 
                        12.2107 6.67771C12.1 6.80224 11.9 6.80224 11.7893 
                        6.67771C11.4706 6.31934 10.818 5.62861 10.0229 
                        5.02375C7.71053 3.26448 5.04945 3.79992 3.59728 
                        6.41967C2.3404 8.6871 3.20947 11.0649 4.8824 12.9557Z" 
                        >
                    </path> 
                    </g>
                </svg>
            </div>
            <p className={`text-sm w-3 transition-colors 
                    duration-200 group-hover:text-red-500 
                    ${active ? 'text-red-500' : 'text-stone-400'}`}>
                {likes > 0 ? likes : ''}
            </p>
        </button>
    )
}


export default LikeButton;