const shareButton = ({ active, shares, onClick }) => {
    return(
        <button 
            onClick={onClick} 
            className='group flex justify-center items-center 
                    rounded-full [&:hover_path]:stroke-lime-500'
            >
            <div className='transition-all duration-200 bg-lime-500 
                            bg-opacity-0 group-hover:bg-opacity-5
                            p-2 rounded-full '>
            <svg 
                className={`${active && 'stroke-lime-500'} w-5 h-5`} 
                viewBox="0 0 24 24" 
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    className={`transition-colors duration-200
                                ${active ? 'stroke-lime-500' 
                                : 'stroke-stone-400'}`}
                    strokeWidth="1.5"
                    d="M8.68439 10.6578L15.3125 7.34375M15.3156 16.6578L8.6938 
                    13.3469M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 
                    7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 
                    21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569
                    3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21
                    18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15
                    16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" 
                    />
            </svg>
            </div>
            <p className={`text-sm w-3 transition-colors 
                    duration-200 group-hover:text-lime-500 
                    ${active ? 'text-lime-500' : 'text-stone-400'}`}>
                {shares > 0 ? shares : ''}
            </p>
        </button>   
    )
}

export default shareButton;   