const ShareButton = ({ active, shares, onClick }) => {

    return(
        <button onClick={onClick} className="flex gap-2 p-2 hover:bg-green-400 hover:bg-opacity-10 [&:hover_svg]:fill-green-400 transition duration-100 rounded-full ">
            <svg className={`${active ? 'fill-green-400 [&_path]:stroke-green-400' : 'fill-white'}  w-5 h-5`} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.013 22.033v-7.972h3.932l-5.902-6.892-6.026 6.893h3.947v11.896h17.468l-3.923-3.924h-9.496zM28.036 19.001v-11.958h-17.531l3.986 3.985h9.496v7.973h-3.932l5.901 6.893 6.026-6.893h-3.946z"></path>
            </svg>
            {shares}
        </button>   
    )
}

export default ShareButton;   