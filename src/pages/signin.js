import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Signin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onBlur" });

  const router = useRouter();

  const onSubmit = async (data) => {
    const { username, password } = data;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res.ok) {
      router.push("/");
    } else {
      setError("username", {
        message: "Login inválido",
      });
    }
  };

  return (
    <div
      className="grid min-h-screen 
              items-center justify-center bg-stone-800"
    >
      <form
        autoComplete="false"
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-screen w-screen flex-col bg-stone-900 
        px-8 pt-11 sm:h-auto sm:w-96 sm:rounded-lg sm:px-12 sm:pb-24"
      >
        <h1
          className="font-sans text-3xl font-medium tracking-tight 
                          text-white antialiased"
        >
          Entrar no fwitter
        </h1>
        <div className="mt-10 flex flex-col gap-3">
          <div>
            <input
              placeholder="Nome de usuário"
              {...register("username", { required: true })}
              className="h-14 w-full rounded-md border
                        border-stone-700 bg-inherit px-3 py-1 align-middle
                        text-xl text-white outline-none transition-colors
                        placeholder:text-stone-500 hover:border-stone-600
                        focus:border-stone-500 focus:placeholder:invisible
                        "
            />
            {errors.username && (
              <span className="text-sm text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>

          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
            className="h-14 w-full rounded-md border
                      border-stone-700 bg-inherit px-3 py-1 align-middle 
                      text-xl text-white outline-none transition-colors
                      placeholder:text-stone-500 hover:border-stone-600 
                      focus:border-stone-500 focus:placeholder:invisible 
                      "
          />
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
          <p>Ainda não tem uma conta?</p>
          <Link className="text-stone-500 hover:underline" href="/signup">
            Inscrever-se
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
