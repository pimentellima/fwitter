import { Link, useLocation, useNavigate } from "react-router-dom";

const HomeLink = () => {
    const location = useLocation();

    return(
        <Link 
            to='/'
            className="flex group">
            <p className={`font-[22px] gap-2 flex pl-4 pr-7 py-2
                    transition ease-out duration-150 rounded-full
                    group-hover:bg-stone-700 items-center
                    ${location.pathname === '/' && 'font-medium'}`}>
                <svg 
                    fill="#ffffff" 
                    width="30px" 
                    height="30px" 
                    viewBox="0 0 32 32" 
                    xmlns="http://www.w3.org/2000/svg" 
                    stroke="#ffffff" strokeWidth="0.00032">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" 
                    strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 
                        8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16
                        11.543l8.25 6.186z"/>
                    </g>
                </svg>
                Inicio
            </p>
        </Link>
    )
}

export default HomeLink;