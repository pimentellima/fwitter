import Popup from "reactjs-popup"
import {  useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/authContext';
import axios from "axios";
import uploadIcon from '../assets/upload.svg'

const EditProfile = ({ onSubmitForm , onClose}) => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {    
            name: currentUser.name,
            bio: currentUser.bio,
            profileImage: '',
            backgroundImage: '',
        }
    });

    const [profileImgPreview, setProfileImgPreview] = useState();
    const [backgroundImgPreview, setBackgroundImgPreview] = useState();
    const profileImgWatch = watch('profileImage');
    const backgroundImgWatch = watch('backgroundImage');

    useEffect(() => {
        if(profileImgWatch && profileImgWatch.length) {
            const url = URL.createObjectURL(profileImgWatch[0])
            setProfileImgPreview(url);
        }
        if(backgroundImgWatch && backgroundImgWatch.length) {
            const url = URL.createObjectURL(backgroundImgWatch[0])
            setBackgroundImgPreview(url);
        }
    }, [profileImgWatch, backgroundImgWatch])

    const handleClose = (e) => {
        e.preventDefault();
        reset();
        onClose();
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

    const updateUser = async (res, userData) => {
        const {name, bio, profileImage, backgroundImage} = userData;
        setCurrentUser(currentUser => ({
            ...currentUser,
            name,
            bio,
            profile_img: profileImage,
            profile_bg_img: backgroundImage
        }));
    }
    
    const onSubmit = async (data) => {
        const {name, bio, profileImage, backgroundImage} = data;
        const profileImageUrl = profileImage[0] ? await uploadProfileImg(profileImage[0]) : '';
        const backgroundImageUrl = backgroundImage[0] ? await uploadBackgroundImg(backgroundImage[0]) : '';
        const userData = {
            name,
            bio,
            id: currentUser.id,
            profileImage: profileImageUrl ? profileImageUrl : currentUser.profile_img,
            backgroundImage: backgroundImageUrl ? backgroundImageUrl : currentUser.profile_bg_img
        }
        const res = await axios.post('//localhost:5000/user', userData)
        updateUser(res, userData);
        reset();
        onSubmitForm();
    }

    return(
        <form autoComplete="off" className="flex flex-col w-[600px] bg-stone-900 rounded-xl pb-14" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center py-3 px-4">
                <button type='button' className="hover:bg-stone-600 w-2 h-2 rounded-full p-3 flex items-center justify-center transition" onClick={(e) => handleClose(e)}>x</button>
                <h1 className="ml-4 text-2xl font-sans font-medium antialiased tracking-tight text-white ">Editar perfil</h1>
                <button type="submit">Salvar</button>
            </div>
            <div className="relative h-44">
                <label>
                    <img className="absolute h-full w-full" src={backgroundImgPreview ? backgroundImgPreview : `http://localhost:5000/upload/user/${currentUser.profile_bg_img}`} alt=''/>
                    <input className="hidden" type='file' {...register('backgroundImage')}/>
                    <div className="hover:cursor-pointer absolute z-10 h-32 w-32 p-11 ">
                        <div className="rounded-full bg-opacity-50 bg-black hover:bg-opacity-40">
                            <img className="p-2 h-full w-full" src={uploadIcon} alt=''/>
                        </div>
                    </div>
                </label>
                <label>
                    <input className="hidden" type='file' {...register('profileImage')}/>
                    <div className="hover:cursor-pointer absolute top-2/3 z-10  h-32 w-32 p-11 ">
                        <div className="rounded-full bg-opacity-50 bg-black hover:bg-opacity-40">
                            <img className="p-2 h-full w-full" src={uploadIcon} alt=''/>
                        </div>
                    </div>
                    <div className="absolute top-2/3 h-32 w-32 p-4">
                        <img className="rounded-full h-full w-full" src={profileImgPreview ? profileImgPreview : `http://localhost:5000/upload/user/${currentUser.profile_img}`} alt=''/>
                    </div>
                </label>
            </div>
            <div className="flex flex-col pt-16 px-4 gap-2">
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

    )
}

export default EditProfile;