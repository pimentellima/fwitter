import moment from "moment";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user, date }) => { 
    const navigate = useNavigate();

    const handleUserClick = (e, user) => {
        e.stopPropagation();
        navigate('/' + user.username)
    }

    return (
        <div className="flex justify-between">
            <div 
                className="flex gap-2 items-center"
                onClick={(e) => handleUserClick(e, user)} 
                >
                <p className="font-bold hover:underline hover:cursor-pointer">
                    {user.name}
                </p>
                <div className="hover:cursor-pointer flex flex-row 
                                text-sm text-stone-400 gap-1">
                    <p>{'@' + user.username}</p>
                    <p> 
                        {"· " + moment(date, 'YYYY-MM-DD HH:mm:ss')
                        .fromNow(true)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;