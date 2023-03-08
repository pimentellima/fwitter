import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";
import Post from "./post";
import moment from "moment";
import { useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import EditProfile from "./editProfile";

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const location = useLocation();
    const [openPopup, setOpenPopup] = useState(false);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        if(!user) {
            fetchUser();
        }
        else {
            fetchPosts();
            fetchFollow();
        }
    }, [user])

    const fetchFollow = async() => {
        try {
            const res = await axios.get('//localhost:5000/follow', {
                params: {
                    followed_user_id: user.id
                }
            })

            res.data.forEach((item) => {
                if(item.follower_user_id === currentUser.id) {
                    setFollowed(true);
                } 
            })
        } catch(err) {
            console.error(err);
        }
    }

    const handleFollow = async() => {
        try {
            followed ? 
                axios.delete('//localhost:5000/follow', {
                    data: {
                        follower_user_id: currentUser.id,
                        followed_user_id: user.id
                    }
                }).then(() => setFollowed(false))
            :
                axios.post('//localhost:5000/follow', {
                    follower_user_id: currentUser.id,
                    followed_user_id: user.id
                }).then(() => setFollowed(true))
        } catch(err) {
            console.error(err);
        }
    }

    const fetchUser = async() => {
        try {
            const res = await axios.get(`//localhost:5000/user${location.pathname}`);
            setUser(res.data[0]);
        } catch(err) {
            console.error(err);
        }
    }

    const fetchPosts = async() => {
        try {
            const res = await axios.get(`//localhost:5000/posts/${user.id}`);
            const posts = res.data.map(post => ({
                ...post, 
                ingredients: JSON.parse(post.ingredients),
                date: moment(post.date).format('YYYY-MM-DD HH:mm:ss')
            }))
            setPosts(posts)
        } 
        catch(err) {
            console.log(err);
        }
    }

    const onSubmitForm = async () => {
        fetchUser();
        setOpenPopup(false);
    }

    return( 
        <div className="">
            <Popup
                open={openPopup}
                onOpen={() => setOpenPopup(true)}
                onClose={() => setOpenPopup(false)}
                {...{overlayStyle}}
                >   
                <EditProfile onSubmitForm={onSubmitForm} onClose={() => setOpenPopup(false)}/>
            </Popup>
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                {user && <p>{user.name}</p>}
            </div>  
            <div className="flex flex-col">
                    {user &&
                        <div className="h-[450px] flex flex-col border-b border-stone-700">
                            <div className="relative h-64">
                                <img className="bg-stone-500 h-44 w-full" src={`http://localhost:5000/upload/user/${user.profile_bg_img}`} alt=''/>
                                <div className="absolute top-1/2 flex justify-between w-full items-end">
                                    <img className='h-32 w-32 ml-4 rounded-full' src={`http://localhost:5000/upload/user/${user.profile_img}`} alt=''/>
                                    {user.id === currentUser.id ? 
                                        <button 
                                            onClick={() => setOpenPopup(true)}
                                            className='h-10 hover:bg-stone-600 hover:cursor-pointer hover:border-stone-500 py-1 px-4 text-md transition ease-in-out duration-300 font-bold rounded-3xl my-2 mr-2 border border-stone-600'
                                        >
                                            Editar perfil
                                        </button>
                                        :
                                        followed ? 
                                            <button onClick={() => handleFollow()}
                                                className='h-10 hover:bg-stone-600 hover:cursor-pointer hover:border-stone-500 py-1 px-4 text-md transition ease-in-out duration-300 font-bold rounded-3xl my-2 mr-2 border border-stone-600'
                                                >
                                                Deixar de seguir
                                            </button>
                                        :
                                            <button onClick={() => handleFollow()}
                                                className='h-10 hover:bg-stone-600 hover:cursor-pointer hover:border-stone-500 py-1 px-4 text-md transition ease-in-out duration-300 font-bold rounded-3xl my-2 mr-2 border border-stone-600'
                                                >
                                                Seguir
                                            </button>
                                    }
                                </div>
                            </div>
                            <div className="mt-3 pl-5 flex flex-col">
                                <p className=" text-2xl">{user.name + "  "}</p>
                                <p className="text-stone-400">{'@' + user.username}</p>
                                <p className="mt-2 text-md">{user.bio}</p>
                            </div>  
                        </div>
                    }
                {posts && posts.map(post => <Post postObj={post} key={post.id}/>)}
            </div>
        </div>
    )
}


export default Profile;