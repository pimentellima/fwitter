import { XMarkIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditProfile = ({ onSubmit, onCloseModal }) => {
  const [imgPreview, setImgPreview] = useState();
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio,
      profile_img: "",
    },
  });

  const imgWatch = watch("profile_img");

  useEffect(() => {
    if (imgWatch?.length) {
      const url = URL.createObjectURL(imgWatch[0]);
      setImgPreview(url);
    }
  }, [imgWatch]);

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
        ></div>
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
              <img src={user.profileImageUrl} />
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
        <input register={register} name="name" placeholder="Digite aqui... " />
        <label htmlFor="bio">Biografia</label>
        <input register={register} name="bio" placeholder="Digite aqui... " />
      </div>
    </form>
  );
};

export default EditProfile;
