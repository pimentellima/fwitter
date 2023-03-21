import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
    return (
        <div className='flex flex-row justify-center '> 
            <Navbar/>
            <div className='flex flex-col min-h-[115vh] w-[600px] 
                            border-r border-stone-700'>
                <Outlet/>
            </div>
            <div className="ml-4 sticky top-10  h-60 w-60 bg-stone-700 
                            rounded-2xl p-3">
                <p className='text-lg font-bold'>Receitas em alta</p>
            </div>
        </div>
      )
}

export default Layout;