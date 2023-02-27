import { Link } from "react-router-dom";

const TabLink = ({ pathname, label, location }) => {
    return(
        <Link to={pathname} className='flex [&:hover>p]:bg-stone-700'> 
            <p className={`font-[22px] px-6 py-2 transition ease-out duration-100 rounded-3xl ${location.pathname === pathname && 'font-medium'}`}>
                {label}
            </p>
        </Link>
    )
}

export default TabLink;