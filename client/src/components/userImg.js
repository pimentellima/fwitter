import { useNavigate } from "react-router-dom";
import { baseURL, defaultUserImgURL } from "../utils/urls";

const UserImg = ({ user, clickable }) => {
    const navigate = useNavigate();

    const handleUserClick = (e, user) => {
        e.stopPropagation();
        navigate('/' + user.username)
    }

    return(
        <img 
            onClick={clickable ? (e) => handleUserClick(e, user) : () => {}}
            className={`h-full w-full rounded-full 
                ${clickable && 'hover:cursor-pointer'}`}
            src={
                user?.profile_img ? 
                baseURL + '/upload/user/' + user.profile_img 
                : 
                defaultUserImgURL
            } 
            alt={defaultUserImgURL}
            />
    )
}

export default UserImg;