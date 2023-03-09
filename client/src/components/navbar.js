import { useContext } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useContext(AuthContext);
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return(
        <div className='py-10 w-60 border-r border-stone-700 sticky top-0 h-screen flex flex-col font-normal tracking-tight text-[22px]'>
            <ul className="flex flex-col gap-4">
                <li>
                    <Link to='/' className="flex [&:hover_p]:bg-stone-700">
                        <p className={`font-[22px] gap-2 flex pl-4 pr-7 py-2 transition ease-out duration-100 rounded-3xl ${location.pathname === '/' && 'font-medium'}`}>
                            <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00032">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                <g id="SVGRepo_iconCarrier">
                                <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z"/>
                                </g>
                            </svg>
                            Inicio
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/explore' className="flex [&:hover_p]:bg-stone-700">
                        <p className={`font-[22px] gap-2 flex pl-4 pr-7 py-2 transition ease-out duration-100 rounded-3xl ${location.pathname === '/explore' && 'font-medium'}`}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <path d="M21 7.25004H18L18.77 4.18004C18.8177 3.98643 18.7866 3.78179 18.6835 3.61113C18.5803 3.44047 18.4136 3.31777 18.22 3.27004C18.0264 3.2223 17.8217 3.25342 17.6511 3.35657C17.4804 3.45971 17.3577 3.62643 17.31 3.82004L16.45 7.25004H10L10.77 4.18004C10.8177 3.98643 10.7866 3.78179 10.6835 3.61113C10.5803 3.44047 10.4136 3.31777 10.22 3.27004C10.0264 3.2223 9.82175 3.25342 9.65109 3.35657C9.48043 3.45971 9.35774 3.62643 9.31 3.82004L8.41 7.25004H5C4.80109 7.25004 4.61032 7.32905 4.46967 7.46971C4.32902 7.61036 4.25 7.80112 4.25 8.00004C4.25 8.19895 4.32902 8.38971 4.46967 8.53037C4.61032 8.67102 4.80109 8.75004 5 8.75004H8L6.37 15.25H3C2.80109 15.25 2.61032 15.3291 2.46967 15.4697C2.32902 15.6104 2.25 15.8011 2.25 16C2.25 16.1989 2.32902 16.3897 2.46967 16.5304C2.61032 16.671 2.80109 16.75 3 16.75H6L5.23 19.82C5.18226 20.0136 5.21339 20.2183 5.31653 20.3889C5.41968 20.5596 5.58639 20.6823 5.78 20.73C5.97361 20.7778 6.17825 20.7466 6.34891 20.6435C6.51957 20.5404 6.64226 20.3736 6.69 20.18L7.55 16.75H14L13.23 19.82C13.1823 20.0136 13.2134 20.2183 13.3165 20.3889C13.4197 20.5596 13.5864 20.6823 13.78 20.73C13.9736 20.7778 14.1783 20.7466 14.3489 20.6435C14.5196 20.5404 14.6423 20.3736 14.69 20.18L15.55 16.75H19C19.1989 16.75 19.3897 16.671 19.5303 16.5304C19.671 16.3897 19.75 16.1989 19.75 16C19.75 15.8011 19.671 15.6104 19.5303 15.4697C19.3897 15.3291 19.1989 15.25 19 15.25H16L17.63 8.75004H21C21.1989 8.75004 21.3897 8.67102 21.5303 8.53037C21.671 8.38971 21.75 8.19895 21.75 8.00004C21.75 7.80112 21.671 7.61036 21.5303 7.46971C21.3897 7.32905 21.1989 7.25004 21 7.25004ZM16 8.75004L14.37 15.25H8L9.63 8.75004H16Z" fill="#ffffff"/> </g>
                            </svg>
                            Explorar
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to={`/${currentUser.username}`} className="flex [&:hover_p]:bg-stone-700">
                        <p className={`font-[22px] gap-2 flex pl-4 pr-7 py-2 transition ease-out duration-100 rounded-3xl ${`/${currentUser.username}` === location.pathname && 'font-medium'}`}>
                            <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024000000000000003">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier">
                            <path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z"/>
                            </g>
                            </svg>
                            Perfil
                        </p>
                    </Link>
                </li>
                <li>
                <Link to='/settings' className="flex [&:hover_p]:bg-stone-700">
                    <p className={`font-[22px] gap-2 flex pl-4 pr-7 py-2 transition ease-out duration-100 rounded-3xl ${location.pathname === '/settings' && 'font-medium'}`}>
                        <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <path d="M10.5213 3.62368C11.3147 2.75255 12.6853 2.75255 13.4787 3.62368L14.2142 4.43128C14.6151 4.87154 15.1914 5.11025 15.7862 5.08245L16.8774 5.03146C18.0543 4.97645 19.0236 5.94568 18.9685 7.12264L18.9176 8.21377C18.8898 8.80859 19.1285 9.38487 19.5687 9.78582L20.3763 10.5213C21.2475 11.3147 21.2475 12.6853 20.3763 13.4787L19.5687 14.2142C19.1285 14.6151 18.8898 15.1914 18.9176 15.7862L18.9685 16.8774C19.0236 18.0543 18.0543 19.0236 16.8774 18.9685L15.7862 18.9176C15.1914 18.8898 14.6151 19.1285 14.2142 19.5687L13.4787 20.3763C12.6853 21.2475 11.3147 21.2475 10.5213 20.3763L9.78582 19.5687C9.38487 19.1285 8.80859 18.8898 8.21376 18.9176L7.12264 18.9685C5.94568 19.0236 4.97645 18.0543 5.03146 16.8774L5.08245 15.7862C5.11025 15.1914 4.87154 14.6151 4.43128 14.2142L3.62368 13.4787C2.75255 12.6853 2.75255 11.3147 3.62368 10.5213L4.43128 9.78582C4.87154 9.38487 5.11025 8.80859 5.08245 8.21376L5.03146 7.12264C4.97645 5.94568 5.94568 4.97645 7.12264 5.03146L8.21376 5.08245C8.80859 5.11025 9.38487 4.87154 9.78583 4.43128L10.5213 3.62368Z" stroke="#ffffff" strokeWidth="2"/> <circle cx="12" cy="12" r="3" stroke="#ffffff" strokeWidth="2"/> </g>
                        </svg>
                        Configurações
                    </p>
                </Link>
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

export default Navbar;
