import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uploadIcon from '../../assets/upload.svg';
import Input from "../../components/input";
import RemoveButton from '../../components/removeButton';
import UserBgImg from "../../components/userBgImg";
import UserImg from "../../components/userImg";
import { AuthContext } from "../contexts/authContext";

const EditProfileForm = ({ onSubmit, onCloseModal }) => {
    const { currentUser } = useContext(AuthContext);
    const [imgPreview, setImgPreview] = useState();
    const [bgPreview, setBgPreview] = useState();
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {    
            name: currentUser.name,
            bio: currentUser.bio,
            profile_img: '',
            profile_bg_img: '',
        }
    });
    const profileImgWatch = watch('profile_img');
    const profileBgImgWatch = watch('profile_bg_img');

    useEffect(() => {
        if(profileImgWatch && profileImgWatch.length) {
            const url = URL.createObjectURL(profileImgWatch[0])
            setImgPreview(url);
        }
        if(profileBgImgWatch && profileBgImgWatch.length) {
            const url = URL.createObjectURL(profileBgImgWatch[0])
            setBgPreview(url);
        }
    }, [profileImgWatch, profileBgImgWatch]);

    const handleClose = () => {
        onCloseModal();
        reset();
    };

    return (
        <form 
            autoComplete="off" 
            className="flex flex-col w-[600px] bg-stone-900 rounded-xl pb-14" 
            onSubmit={handleSubmit(onSubmit)}
            >
            <div className="flex items-center py-3 px-4">
                <RemoveButton onClick={() => handleClose()}/>
                <h1 className="ml-4 text-2xl font-sans font-medium antialiased 
                                tracking-tight text-white">
                    Editar perfil
                </h1>
                <button type="submit">Salvar</button>
            </div>
            <div className="relative h-64">
                <input 
                    id="backgroundImage" 
                    className="hidden" 
                    type='file' 
                    {...register('profile_bg_img')}
                    />
                <div className="absolute w-full h-44 
                                flex justify-center items-center">
                    {bgPreview ? 
                        <img 
                            className="absolute h-full w-full" 
                            src={bgPreview} 
                            alt=''
                            />
                        :
                        <UserBgImg user={currentUser}/>
                    }
                    <label 
                        htmlFor="backgroundImage" 
                        className="absolute rounded-full hover:cursor-pointer 
                                z-10 bg-opacity-50 bg-black 
                                hover:bg-opacity-40 p-2 h-10 w-1"
                        >
                        <img src={uploadIcon} alt=''/>
                    </label>
                </div>
                <input 
                    id="profileImage" 
                    className="hidden" 
                    type='file' 
                    {...register('profile_img')}
                    />
                <div className="absolute top-1/2 w-32 h-32 flex 
                                justify-center items-center">
                    <div className='absolute p-4 z-20 w-full h-full'>
                        {imgPreview ? 
                            <img 
                                className="rounded-full w-full h-full z-20" 
                                src={imgPreview} 
                                alt=''/>
                            :
                            <UserImg clickable={false} user={currentUser}/>
                        }
                    </div>
                    <label 
                        htmlFor="profileImage" 
                        className="absolute rounded-full hover:cursor-pointer 
                        z-30 bg-opacity-50 bg-black hover:bg-opacity-40 
                        p-2 h-10 w-10"
                        >
                        <img src={uploadIcon} alt=''/>
                    </label>
                </div>
            </div>
            <div className="flex flex-col px-4 gap-2">
                <label htmlFor="name">Nome</label>
                <Input 
                    register={register}
                    name='name'
                    placeholder="Digite aqui... "
                    />
                <label htmlFor="bio">Biografia</label>
                <Input 
                    register={register}
                    name='bio'
                    placeholder="Digite aqui... "
                    />
            </div>
        </form>
    )
}

export default EditProfileForm;