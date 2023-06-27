import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SignInPage = () => {
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
              items-center justify-center bg-gray-300 text-slate-950"
    >
      <form
        autoComplete="false"
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-screen w-screen flex-col bg-white 
        px-8 pt-11 sm:h-auto sm:w-96 sm:rounded-lg sm:px-12 sm:pb-24"
      >
        <h1
          className="font-sans text-3xl font-medium tracking-tight 
                          antialiased"
        >
          Entrar no fwitter
        </h1>
        <div className="mt-10 flex flex-col gap-3">
          <div>
            <input
              placeholder="Nome de usuário"
              {...register("username", { required: true })}
              className="h-14 w-full rounded-lg border border-gray-300 bg-inherit
              pl-2 text-lg transition
              placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
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
            className="h-14 w-full rounded-lg border border-gray-300 bg-inherit
              pl-2 text-lg transition
              placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
        </div>
        <button
          disabled={!isValid}
          className={`mt-6 h-8 cursor-pointer rounded-full
              border border-gray-300 bg-gray-900 px-4 font-semibold
              text-white
              transition-colors enabled:hover:bg-gray-700 disabled:bg-gray-500 
              disabled:opacity-90 disabled:hover:cursor-default`}
        >
          Avançar
        </button>
        <div className="font-sm mt-16 flex gap-1">
          <p>Ainda não tem uma conta?</p>
          <Link className="hover:underline text-sky-500" href="/signup">
            Inscrever-se
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
