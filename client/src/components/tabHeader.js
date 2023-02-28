const TabHeader = ({ children }) => {
    return(
        <div className=' border-b border-stone-700'>
            <div className='mt-2 mb-4 ml-3 font-medium text-xl'>
                {children}
            </div>  
        </div>
    )
}

export default TabHeader;