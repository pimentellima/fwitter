import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/authContext';

export const useEditProfile = (onClose) => {
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
        onClose();
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
    }
    
    return { handleClose, onSubmit: handleSubmit(onSubmit), register, profileImgPreview, backgroundImgPreview }
}