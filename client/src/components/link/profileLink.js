import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ProfileLink = () => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);

    return(
        <Link 
            to={`/` + currentUser.username} 
            className="flex [&:hover_p]:bg-stone-700"
            >
            <p className={`font-[22px] gap-2 flex pl-4 pr-7 py-2
                    transition ease-out duration-150 rounded-full
                    items-center
                    ${location.pathname === '/' + currentUser.username && 'font-medium'}`}>
                <svg 
                    fill="#ffffff" 
                    width="25px" 
                    height="25px" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg" 
                    stroke="#ffffff" 
                    strokeWidth="0.00024000000000000003">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z"/>
                    </g>
                </svg>
                Perfil
            </p>
        </Link>
    )
}

export default ProfileLink;