import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const router = useRouter();

  const isUsernameAvailable = async (username) => {
    const res = await axios.get("api/user/username/" + username);
    if (res.data.taken) return false;
    else return true;
  };

  const onSubmit = async ({ name, username, password }) => {
    await axios
      .post("/api/auth/signup", {
        name,
        username,
        password,
      })
      .then(() => {
        reset();
        router.push("/");
      })
      .catch((err) => {
        console.log(err)
      });
  };
  return (
    <div
      className="grid min-h-screen 
                  items-center justify-center bg-stone-800"
    >
      <form
        autoComplete="false"
        onSubmit={handleSubmit(onSubmit)}
        className="box-content flex w-72 sm:w-96 flex-col
                          rounded-lg bg-stone-900 px-12 sm:px-24 pb-24 pt-11"
      >
        <h1
          className="font-sans text-3xl font-medium tracking-tight 
                          text-white antialiased"
        >
          Inscrever-se
        </h1>
        <div className="mt-10 flex flex-col gap-3">
          <input
            placeholder="Nome"
            {...register("name", { required: true })}
            className="placeholder:text-stone-500 rounded-md bg-inherit h-14
                        text-white align-middle outline-none py-1 text-xl
                        border px-3 border-stone-700 w-full
                        transition-colors focus:placeholder:invisible
                        focus:border-stone-500 hover:border-stone-600
                        "
          />
          <div>
            <input
              placeholder="Nome de usuario"
              {...register("username", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Digite um nome de usuário válido",
                },
                validate: isUsernameAvailable,
              })}
              className="placeholder:text-stone-500 rounded-md bg-inherit h-14
                        text-white align-middle outline-none py-1 text-xl
                        border px-3 border-stone-700 w-full
                        transition-colors focus:placeholder:invisible
                        focus:border-stone-500 hover:border-stone-600
                        "
            />
            {errors.username && (
              <span className="text-sm text-red-600">
                {errors.username.message}
              </span>
            )}
            {errors.username && errors.username.type === "validate" && (
              <span className="text-sm text-red-600">
                O nome de usuário não está disponível
              </span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              {...register("password", {
                required: true,
                minLength: { value: 6, message: "Digite uma senha válida" },
              })}
              className="placeholder:text-stone-500 rounded-md bg-inherit h-14
                        text-white align-middle outline-none py-1 text-xl
                        border px-3 border-stone-700 w-full
                        transition-colors focus:placeholder:invisible
                        focus:border-stone-500 hover:border-stone-600
                        "
            />
            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <button
            disabled={!isValid}
            className="mt-6 h-9 w-full 
                          rounded-2xl bg-gray-50 font-bold 
                          text-black transition-colors enabled:hover:bg-gray-200
                          enabled:active:bg-gray-200 disabled:cursor-default disabled:opacity-40"
          >
            Avançar
          </button>
        </div>
        <div className="font-sm mt-16 flex gap-1 text-gray-100">
          <p>Já tem uma conta?</p>
          <Link className="text-stone-500 hover:underline" href="/signin">
            Fazer login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
