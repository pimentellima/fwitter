const CommentButton = ({ active }) => {
    return(
        <button className="p-2 hover:bg-blue-600 hover:bg-opacity-10 [&:hover_path]:stroke-blue-600 transition duration-100 rounded-full ">
            <svg className={`${active && 'fill-blue-600 [&_path]:stroke-blue-600'} w-5 h-5`} viewBox="0 0 24 24" fill="none">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier"> 
            <g clipPath="url(#clip0_429_11233)"> 
            <path className="transition-colors duration-100" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/> </g> <defs> <clipPath id="clip0_429_11233"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </g>
            </svg>
        </button>
    )
}

export default CommentButton;