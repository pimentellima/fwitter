import { Link, useLocation } from "react-router-dom";

const HomeButton = () => {
    const location = useLocation();

    return(
        <Link to='/' className="flex [&:hover_p]:bg-stone-700">
            <p className={`font-[22px] gap-2 flex pl-4 pr-7 py-2 transition ease-out duration-100 rounded-3xl ${location.pathname === '/' && 'font-medium'}`}>
                <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00032">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                    <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z"/>
                    </g>
                </svg>
                Inicio
            </p>
        </Link>
    )
}

export default HomeButton;