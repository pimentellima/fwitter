import Image from "next/image";
import { ArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import Popup from "reactjs-popup";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import { useSession } from "next-auth/react";

const EditProfileModal = () => {
  const { data: session, update } = useSession();
  const [imgPreview, setImgPreview] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) =>
      await axios.put("../api/user", data, {
        headers: { "content-type": "multipart/form-data" },
      })
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: session?.user?.name,
      bio: session?.user?.bio,
      file: [],
    },
  });

  const imageWatch = watch("file");
  const onSubmit = (data) => {
    mutation.mutate(
      {
        ...data,
        file: data.file ? data.file[0] : null,
      },
      {
        onSuccess: ({ data }) => {
          update({
            name: data.name,
            imageUrl: data.imageUrl,
          });
          queryClient.invalidateQueries([
            "profileUser",
            { username: session?.user?.username },
          ]);
          setOpen(false);
        },
      }
    );
  };

  const handleClose = () => {
    reset()
    setOpen(false)
  }

  useEffect(() => {
    if (imageWatch?.length) {
      const url = URL.createObjectURL(imageWatch[0]);
      setImgPreview(url);
    } else {
      setImgPreview(session?.user.imageUrl || defaultUserImg);
    }
  }, [imageWatch]);

  return (
    <>
      <button
        onClick={() => setOpen((open) => !open)}
        className="mr-2 h-10 
                rounded-full border border-stone-700 
                bg-stone-700 px-4 
                font-bold transition-colors hover:cursor-pointer hover:bg-stone-600 active:border-stone-500"
      >
        Editar perfil
      </button>
      <Popup onClose={handleClose} open={open} modal lockScroll>
        <form
          autoComplete="off"
          className="flex w-screen h-screen sm:h-auto sm:w-[600px] flex-col rounded-xl  bg-stone-900 pb-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-8">
              <button type="button" onClick={() => setOpen(false)}>
                <XMarkIcon className="w-10 rounded-full p-2 transition-all hover:bg-stone-700" />
              </button>
              <p className="text-xl font-semibold">Editar perfil</p>
            </div>
            <button
              disabled={!isValid}
              className={`flex h-8 w-20
              items-center justify-center rounded-3xl bg-stone-100 
              px-5 py-1 text-sm font-bold 
              text-stone-800 transition duration-100 ease-out
              hover:cursor-pointer hover:bg-stone-200 
              disabled:opacity-40 disabled:hover:cursor-default disabled:hover:bg-stone-100`}
            >
              Salvar
            </button>
          </div>
          <div className="relative h-64">
            <div className="absolute flex h-44 w-full items-center justify-center bg-stone-600" />
            <input
              id="file"
              className="hidden"
              type="file"
              {...register("file")}
            />
            <div className="absolute top-1/2 flex h-32 w-32 items-center justify-center">
              <div className="absolute z-20 h-full w-full p-4">
                <Image
                  className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
                  width={120}
                  height={120}
                  src={imgPreview}
                  alt=""
                />
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
              {...register("name", { required: true })}
              name="name"
              className="rounded-md border border-stone-500 bg-inherit p-2
            text-stone-300 transition-shadow placeholder:text-stone-500 
            focus:outline-none focus:ring-1 focus:ring-stone-500"
              placeholder="Digite aqui... "
            />
            <label htmlFor="bio">Biografia</label>
            <input
              {...register("bio")}
              name="bio"
              className="rounded-md border border-stone-500 bg-inherit p-2
            text-stone-300 transition-shadow placeholder:text-stone-500 
            focus:outline-none focus:ring-1 focus:ring-stone-500"
              placeholder="Digite aqui... "
            />
          </div>
        </form>
      </Popup>
    </>
  );
};

export default EditProfileModal;
