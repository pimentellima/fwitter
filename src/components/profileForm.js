import { XMarkIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import defaultPicUrl from "../utils/defaultPicUrl";
import axios from "axios";

const ProfileForm = ({ loggedUser, closeModal }) => {
  const [imgPreview, setImgPreview] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) => await axios.put("../api/user", data, {
      headers: { 'content-type': 'multipart/form-data' }
    })
  );

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: loggedUser.name,
      bio: loggedUser.bio,
      file: [],
    },
  });

  const imageWatch = watch("file");

  const onSubmit = (data) => {
    mutation.mutate({
        ...data,
        file: data.file[0],
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(["loggedUser"]);
          queryClient.invalidateQueries([
            "user",
            { username: loggedUser.username },
          ]);
          closeModal();
        },
      }
    );
  };

  useEffect(() => {
    if (imageWatch?.length) {
      const url = URL.createObjectURL(imageWatch[0]);
      setImgPreview(url);
    }
  }, [imageWatch]);

  return (
    <form
      autoComplete="off"
      className="flex w-[600px] flex-col rounded-xl bg-stone-900 pb-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-8">
          <button type="button" onClick={() => closeModal()}>
            <XMarkIcon className="w-10 rounded-full p-2 transition-all hover:bg-stone-700" />
          </button>
          <p className="text-xl font-semibold">Editar perfil</p>
        </div>
        <button
          className="flex h-8
          w-20
            items-center justify-center rounded-3xl bg-stone-100 
            px-5 py-1 text-sm font-bold
            text-stone-800 transition duration-100 ease-out
            hover:cursor-pointer hover:bg-stone-200"
        >
          Salvar
        </button>
      </div>
      <div className="relative h-64">
        <div className="absolute flex h-44 w-full items-center justify-center bg-stone-600" />
        <input id="file" className="hidden" type="file" {...register("file")} />
        <div className="absolute top-1/2 flex h-32 w-32 items-center justify-center">
          <div className="absolute z-20 h-full w-full p-4">
            {imgPreview ? (
              <img
                className="z-20 h-full w-full rounded-full"
                src={imgPreview}
                alt=""
              />
            ) : (
              <img
                className="z-20 h-full w-full rounded-full"
                src={loggedUser.imageUrl ? loggedUser.imageUrl : defaultPicUrl}
                alt=""
              />
            )}
          </div>
          <label
            htmlFor="file"
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
        <input
          {...register("name")}
          name="name"
          placeholder="Digite aqui... "
        />
        <label htmlFor="bio">Biografia</label>
        <input {...register("bio")} name="bio" placeholder="Digite aqui... " />
      </div>
    </form>
  );
};

export default ProfileForm;
