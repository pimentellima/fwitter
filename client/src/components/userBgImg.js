import { baseURL } from "../utils/urls";

const UserBgImg = ({ user }) => {
    return(
        <>
            {user.profile_bg_img ?
                <img 
                    className='h-44 w-full' 
                    src={baseURL + '/upload/user/' + user.profile_bg_img} 
                    alt=''/>
                :
                <div className='bg-stone-600 w-full h-44'></div>
            }
        </>
    )
}

export default UserBgImg;