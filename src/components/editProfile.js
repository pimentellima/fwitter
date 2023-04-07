import { XMarkIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input";
import UserBgImg from "../../components/userBgImg";
import UserImg from "../../components/userImg";
import { AuthContext } from "../contexts/authContext";

const EditProfile = ({ onSubmit, onCloseModal }) => {
  const { currentUser } = useContext(AuthContext);
  const [imgPreview, setImgPreview] = useState();
  const [bgPreview, setBgPreview] = useState();
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio,
      profile_img: "",
      profile_bg_img: "",
    },
  });
  const profileImgWatch = watch("profile_img");
  const profileBgImgWatch = watch("profile_bg_img");

  useEffect(() => {
    if (profileImgWatch && profileImgWatch.length) {
      const url = URL.createObjectURL(profileImgWatch[0]);
      setImgPreview(url);
    }
    if (profileBgImgWatch && profileBgImgWatch.length) {
      const url = URL.createObjectURL(profileBgImgWatch[0]);
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
      className="flex w-[600px] flex-col rounded-xl bg-stone-900 pb-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center px-4 py-3">
        <XMarkIcon />
        <h1
          className="ml-4 font-sans text-2xl font-medium tracking-tight 
                                text-white antialiased"
        >
          Editar perfil
        </h1>
        <button type="submit">Salvar</button>
      </div>
      <div className="relative h-64">
        <input
          id="backgroundImage"
          className="hidden"
          type="file"
          {...register("profile_bg_img")}
        />
        <div
          className="absolute flex h-44 
                                w-full items-center justify-center"
        >
          {bgPreview ? (
            <img className="absolute h-full w-full" src={bgPreview} alt="" />
          ) : (
            <UserBgImg user={currentUser} />
          )}
          <label
            htmlFor="backgroundImage"
            className="absolute z-10 h-10 
                                w-1 rounded-full bg-black 
                                bg-opacity-50 p-2 hover:cursor-pointer hover:bg-opacity-40"
          >
            <img src={uploadIcon} alt="" />
          </label>
        </div>
        <input
          id="profileImage"
          className="hidden"
          type="file"
          {...register("profile_img")}
        />
        <div
          className="absolute top-1/2 flex h-32 w-32 
                                items-center justify-center"
        >
          <div className="absolute z-20 h-full w-full p-4">
            {imgPreview ? (
              <img
                className="z-20 h-full w-full rounded-full"
                src={imgPreview}
                alt=""
              />
            ) : (
              <UserImg clickable={false} user={currentUser} />
            )}
          </div>
          <label
            htmlFor="profileImage"
            className="absolute z-30 h-10 
                        w-10 rounded-full bg-black bg-opacity-50 
                        p-2 hover:cursor-pointer hover:bg-opacity-40"
          >
            <ArrowUpIcon />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <label htmlFor="name">Nome</label>
        <Input register={register} name="name" placeholder="Digite aqui... " />
        <label htmlFor="bio">Biografia</label>
        <Input register={register} name="bio" placeholder="Digite aqui... " />
      </div>
    </form>
  );
};

export default EditProfile;
