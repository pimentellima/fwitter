import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import HomeButton from "./buttons/homeButton";
import ProfileButton from "./buttons/profileButton";
import ExploreButton from './buttons/exploreButton'
import SettingsButton from './buttons/settingsButton'

const NavBar = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return(
        <div className='py-10 w-60 border-r border-stone-700 sticky top-0 h-screen flex flex-col font-normal tracking-tight text-[22px]'>
            <ul className="flex flex-col gap-4">
                <li>
                    <HomeButton/>
                </li>
                <li>
                    <ExploreButton/>
                </li>
                <li>
                    <ProfileButton/>
                </li>
                <li>
                    <SettingsButton/>
                </li>
            </ul> 
            <input type='button' value='Fweet' className='h-10 hover:cursor-pointer hover:bg-stone-600 py-1 px-5 text-lg transition ease-out duration-100 font-bold rounded-3xl bg-stone-500 w-48 my-10'/>
            <div onClick={() => handleLogout()} className='justify-self-end row-start-5 w-5/6 hover:bg-stone-700 hover:cursor-pointer rounded-3xl py-2 px-6'>
                <p className="text-base">{currentUser.name}</p>
                <p className="text-base">Sair</p>
            </div>
        </div>
    )
}

export default NavBar;
