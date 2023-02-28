import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import TabLink from "./tabLink";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return(
        <nav className="w-60 border-r border-stone-700 "> 
            <div className='my-10 fixed h-screen flex flex-col font-normal tracking-tight text-[22px]'>
                <ul className="flex flex-col gap-4">
                    <li>
                        <TabLink label='Início' icon='home.svg' pathname='/' location={location}/>
                    </li>
                    <li>
                        <TabLink label='Explorar' icon='explore.svg' pathname='/explore' location={location}/>
                    </li>
                    <li>
                        <TabLink label='Perfil' icon='profile.svg' pathname='/profile' location={location}/>
                    </li>
                    <li>
                        <TabLink label='Configurações' icon='settings.svg' pathname='/settings' location={location}/>
                    </li>
                </ul> 
                <input type='button' value='Fweet' className='submit-button w-48 my-10'/>
                <div onClick={() => handleLogout()} className='justify-self-end row-start-5 w-5/6 hover:bg-stone-700 hover:cursor-pointer rounded-3xl py-2 px-6'>
                    <p className="text-base">{user.name}</p>
                    <p className="text-base">Sair</p>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
