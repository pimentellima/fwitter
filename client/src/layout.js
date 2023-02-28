import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";

const Layout = () => {
    return (
        <div className="flex flex-row justify-center"> 
            <NavBar/>
            <div className='min-h-screen w-[600px] border-r border-stone-700'>
                <Outlet/>
            </div>
            <div className="w-60 mx-4 mt-10">
                <div className="fixed h-80 w-60 bg-stone-700 rounded-2xl p-3">
                    <p className='text-lg font-bold'>Receitas em alta</p>
                </div>
            </div>
        </div>
      )
}

export default Layout;