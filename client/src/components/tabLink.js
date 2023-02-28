import { Link } from "react-router-dom";

const TabLink = ({ icon, pathname, label, location }) => {
    const svgPath = icon ? require(`../assets/${icon}`) : '';

    return(
        <Link to={pathname} className='flex [&:hover>p]:bg-stone-700'> 
            <p className={`font-[22px] flex pl-4 pr-7 py-2 transition ease-out duration-100 rounded-3xl ${location.pathname === pathname && 'font-medium'}`}>
                <img className="mr-3" src={svgPath} alt=''/>
                {label}
            </p>
        </Link>
    )
}

export default TabLink;