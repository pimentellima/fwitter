const Header = ({ children }) => {

    return (
        <div className='sticky top-0 border-b border-stone-700 
        pt-2 pb-4 pl-3 font-medium text-xl 
        z-20 bg-stone-800'>
            {children}
        </div> 
    )
}

export default Header;