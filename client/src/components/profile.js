import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import uploadIcon from '../assets/upload.svg';
import { AuthContext } from "../contexts/authContext";
import { getFollowedById } from "../services/follow";
import { getUserPostsById } from "../services/posts";
import { getUserByUrl } from "../services/user";
import Post from "./post";

const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {    
            name: currentUser.name,
            bio: currentUser.bio,
            profileImage: '',
            backgroundImage: '',
        }
    });
    const profileImgWatch = watch('profileImage');
    const backgroundImgWatch = watch('backgroundImage');
    const [profileImgPreview, setProfileImgPreview] = useState();
    const [backgroundImgPreview, setBackgroundImgPreview] = useState();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const location = useLocation();
    const [followed, setFollowed] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        if(!user) {
            fetchUser();
        }
        if(user) {
            fetchPosts();
            fetchFollow();
        }
        if(profileImgWatch && profileImgWatch.length) {
            const url = URL.createObjectURL(profileImgWatch[0])
            setProfileImgPreview(url);
        }
        if(backgroundImgWatch && backgroundImgWatch.length) {
            const url = URL.createObjectURL(backgroundImgWatch[0])
            setBackgroundImgPreview(url);
        }
    }, [user, profileImgWatch, backgroundImgWatch]);

    const fetchFollow = async() => {
        const followedUsers = await getFollowedById(user.id);
        followedUsers.forEach((item) => {
            if(item.follower_user_id === currentUser.id) {
                setFollowed(true);
            } 
        })
    }
    
    const fetchUser = async() => {
        const user = await getUserByUrl(location.pathname);
        setUser(user);
    }

    const fetchPosts = async () => {
        const posts = await getUserPostsById(user.id);
        setPosts(posts);
    }

    const handleFollow = async() => {
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
    }

    const handleClose = (e) => {
        e.preventDefault();
        setOpenPopup(false);
        reset();
    };

    const uploadProfileImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post('//localhost:5000/upload/userProfile', formData);
            return res.data;
        } 
        catch(err) {
            console.error(err);
        }
    }

    const uploadBackgroundImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post('//localhost:5000/upload/userBackground', formData);
            return res.data;
        } 
        catch(err) {
            console.error(err);
        }
    }
    
    const onSubmit = async (data) => {
        const {name, bio, profileImage, backgroundImage} = data;
        const profileImageUrl = profileImage[0] ? await uploadProfileImg(profileImage[0]) : '';
        const backgroundImageUrl = backgroundImage[0] ? await uploadBackgroundImg(backgroundImage[0]) : '';

        const userData = {
            name,
            username: currentUser.username,
            bio,
            id: currentUser.id,
            profile_img: profileImageUrl ? profileImageUrl : currentUser.profile_img,
            profile_bg_img: backgroundImageUrl ? backgroundImageUrl : currentUser.profile_bg_img
        };
        
        axios.post('//localhost:5000/user', userData)
        .then(setCurrentUser(userData))
        .catch(err => {
            console.log(err)
        });
        setOpenPopup(false);
        reset();
    }

    
    return ( 
        <>
            <div className='sticky top-0 border-b border-stone-700 pt-2 pb-4 pl-3 font-medium text-xl z-20 bg-stone-800'>
                {user && <p>{user.name}</p>}
            </div>  
            <div className="flex flex-col">
                    {user &&
                        <div className="h-[450px] flex flex-col border-b border-stone-700">
                            <div className="relative h-64">
                                <img className="absolute h-44 w-full" src={`http://localhost:5000/upload/user/${user.profile_bg_img}`} alt=''/>
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
            <Popup
                open={openPopup}
                onOpen={() => setOpenPopup(true)}
                onClose={() => setOpenPopup(false)}
                {...{overlayStyle}}
                >   
                <form autoComplete="off" className="flex flex-col w-[600px] bg-stone-900 rounded-xl pb-14" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center py-3 px-4">
                        <button type='button' className="hover:bg-stone-600 w-2 h-2 rounded-full p-3 flex items-center justify-center transition" onClick={(e) => handleClose(e)}>x</button>
                        <h1 className="ml-4 text-2xl font-sans font-medium antialiased tracking-tight text-white ">Editar perfil</h1>
                        <button type="submit">Salvar</button>
                    </div>
                    <div className="relative h-64">
                        <input id="backgroundImage" className="hidden" type='file' {...register('backgroundImage')}/>
                        <div className="absolute w-full h-44 flex justify-center items-center">
                            <img className="absolute h-full w-full" src={backgroundImgPreview ? backgroundImgPreview : currentUser.profile_img && `http://localhost:5000/upload/user/${currentUser.profile_bg_img}`} alt=''/>
                            <label htmlFor="backgroundImage" className="absolute rounded-full hover:cursor-pointer z-10 bg-opacity-50 bg-black hover:bg-opacity-40 p-2 h-10 w-10 ">
                                <img src={uploadIcon} alt=''/>
                            </label>
                        </div>
                        <input id="profileImage" className="hidden" type='file' {...register('profileImage')}/>
                        <div className="absolute top-1/2 w-32 h-32 flex justify-center items-center">
                            <img className="absolute rounded-full w-full h-full p-4 z-20" src={profileImgPreview ? profileImgPreview : currentUser.profile_bg_img && `http://localhost:5000/upload/user/${currentUser.profile_img}`} alt=''/>
                            <label htmlFor="profileImage" className="absolute rounded-full hover:cursor-pointer z-30 bg-opacity-50 bg-black hover:bg-opacity-40 p-2 h-10 w-10 ">
                                <img src={uploadIcon} alt=''/>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 gap-2">
                        <label htmlFor="name">Nome</label>
                        <input 
                            id='name'
                            placeholder="Digite aqui... "
                            className='placeholder:text-stone-500 rounded-md text-gray-300 align-middle outline-none h-14 bg-inherit border border-stone-700 py-1 pl-2 focus:placeholder:invisible focus:border-stone-500 hover:border-stone-600 transition-colors'
                            {...register('name')}
                            />
                        <label htmlFor="bio">Biografia</label>
                        <input 
                            id='bio'
                            placeholder="Digite aqui... "
                            className='placeholder:text-stone-500 rounded-md text-gray-300 align-middle outline-none h-14 bg-inherit border border-stone-700 p2-1 pl-2 focus:placeholder:invisible focus:border-stone-500 hover:border-stone-600 transition-colors'
                            {...register('bio')}
                            />
                    </div>
                </form>
            </Popup>
        </>
    )
}


export default Profile;