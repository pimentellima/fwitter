import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TabLink from "./components/tabLink";
import { AuthContext } from "./contexts/authContext";
import { useNavigate } from "react-router-dom";

const PageLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return (
        <div className="overflow-visible grid grid-flow-col justify-center bg-stone-800 text-white"> 
            <div className="w-60 border-r border-stone-700 text-[22px]"> 
                <nav className='my-10 fixed h-screen grid grid-rows-4 font-sans font-normal tracking-tight'>
                    <ul className="flex flex-col">
                        <li>
                            <TabLink label='Início' pathname='/' location={location}/>
                        </li>
                        <li>
                            <TabLink label='Explorar' pathname='/explore' location={location}/>
                        </li>
                        <li>
                            <TabLink label='Perfil' pathname='/profile' location={location}/>
                        </li>
                        <li>
                            <TabLink label='Configurações' pathname='/settings' location={location}/>
                        </li>
                    </ul> 
                    <button className='h-10 py-1 px-5 text-lg transition ease-out duration-100 font-bold rounded-3xl bg-stone-500 '>
                        Fweet
                    </button>
                    <div onClick={() => handleLogout()} className='justify-self-end self-end row-start-5 w-5/6 text-base mb-10 hover:bg-stone-700 hover:cursor-pointer rounded-3xl py-2 px-6'>
                        <p>{user.name}</p>
                        <p>Sair</p>
                    </div>
                </nav>
            </div>
            <div className='h-fit min-h-screen w-[600px] border-r border-stone-700'>
                <Outlet/>
            </div>
            <div className="w-60 mx-4 mt-10 ">
                <div className="fixed h-80 w-60 bg-stone-700 rounded-2xl p-3">
                    <p className='text-lg font-bold'>Receitas em alta</p>
                </div>
            </div>
        </div>
      )
}

export default PageLayout;