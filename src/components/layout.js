import NavigationBar from "./navigationBar";

const Layout = ({ children }) => {
    return (
        <div className='flex flex-row justify-center bg-stone-800'> 
            <NavigationBar/>
            <div className='flex flex-col min-h-[130vh] w-[600px] 
                    border-r border-stone-700'>
                {children}
            </div>
            <div className="ml-4 sticky top-10  h-60 w-60 bg-stone-700 
                            rounded-2xl p-3">
                <p className='text-lg font-bold'>Receitas em alta</p>
            </div>
        </div>
      )
}

export default Layout;