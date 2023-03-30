import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HomeLink from '../../components/link/homeLink'
import ExploreLink from '../../components/link/exploreLink'
import ProfileLink from '../../components/link/profileLink'
import BookmarksLink from '../../components/link/bookmarksLink'
import SettingsLink from '../../components/link/settingsLink'
import PostButton from '../../components/postButton'

import { AuthContext } from '../../contexts/authContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <div className='py-10 w-60 border-r border-stone-700 sticky top-0 
                        h-screen flex flex-col font-normal 
                        tracking-tight text-[22px]'>
            <ul className="flex flex-col gap-4 mb-10">
                <li>
                    <HomeLink/>
                </li>
                <li>
                    <ExploreLink/>
                </li>
                <li>
                    <ProfileLink/>
                </li>
                <li>
                    <BookmarksLink/>
                </li>
                <li>
                    <SettingsLink/>
                </li>
            </ul> 
            <PostButton onClick={() => {}}/>
            <div 
                onClick={() => handleLogout()} 
                className='justify-self-end row-start-5 w-5/6 
                hover:bg-stone-700 hover:cursor-pointer 
                rounded-3xl py-2 px-6'
                >
                <p className="text-base">{currentUser?.name}</p>
                <p className="text-base">Sair</p>
            </div>
        </div>
    )
}

export default Navbar;
