import { useContext } from 'react';
import uploadIcon from '../../assets/upload.svg';
import { AuthContext } from '../../contexts/authContext';
import { useEditProfile } from './useEditProfile';

const EditProfile = ({ closePopup }) => {
    const { currentUser } = useContext(AuthContext);

    const { 
        register, 
        onSubmit, 
        profileImgPreview, 
        backgroundImgPreview, 
        handleClose 
    } = useEditProfile(closePopup);
    
    const handleSubmit = () => {
        onSubmit();
        closePopup();
    }

    return(
        <form autoComplete="off" className="flex flex-col w-[600px] bg-stone-900 rounded-xl pb-14" onSubmit={() => handleSubmit()}>
            <div className="flex items-center py-3 px-4">
                <button type='button' className="hover:bg-stone-600 w-2 h-2 rounded-full p-3 flex items-center justify-center transition" onClick={(e) => handleClose(e)}>x</button>
                <h1 className="ml-4 text-2xl font-sans font-medium antialiased tracking-tight text-white ">Editar perfil</h1>
                <button type="submit">Salvar</button>
            </div>
            <div className="relative h-64">
                <input id="backgroundImage" className="hidden" type='file' {...register('backgroundImage')}/>
                <div className="absolute w-full h-44 flex justify-center items-center">
                    <img className="absolute h-full w-full" src={backgroundImgPreview ? backgroundImgPreview : `http://localhost:5000/upload/user/${currentUser.profile_bg_img}`} alt=''/>
                    <label htmlFor="backgroundImage" className="absolute rounded-full hover:cursor-pointer z-10 bg-opacity-50 bg-black hover:bg-opacity-40 p-2 h-10 w-10 ">
                        <img src={uploadIcon} alt=''/>
                    </label>
                </div>
                <input id="profileImage" className="hidden" type='file' {...register('profileImage')}/>
                <div className="absolute top-1/2 w-32 h-32 flex justify-center items-center">
                    <img className="absolute rounded-full p-4 z-20" src={profileImgPreview ? profileImgPreview : `http://localhost:5000/upload/user/${currentUser.profile_img}`} alt=''/>
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

    )
}

export default EditProfile;