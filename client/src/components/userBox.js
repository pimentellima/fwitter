import UserImg from "./userImg";

const UserBox = ({ user, isThread=false }) => {
    return (
        <div className="w-20 flex flex-col items-center">  
            <div className='w-12 h-12'>
                <UserImg clickable={true} user={user}/>
            </div>
            {isThread && 
                <div className='h-full'>
                    <div className='w-[2px] rounded-full h-full
                            bg-stone-600'>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserBox;