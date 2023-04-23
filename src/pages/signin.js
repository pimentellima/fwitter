import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../components/spinner";

const Signin = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { status } = useSession();

  const onSubmit = async (data) => {
    const { username, password } = data;
    await signIn("credentials", { username, password });
    router.push('/');
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  if(status !== 'unauthenticated') return <Spinner/>

  return (
    <div
      className="grid min-h-screen 
                items-center justify-center bg-stone-800"
    >
      <form
        autoComplete="false"
        onSubmit={handleSubmit(onSubmit)}
        className="box-content flex w-96 flex-col 
                        rounded-lg bg-stone-900 px-24 pb-24 pt-11"
      >
        <h1
          className="font-sans text-3xl font-medium tracking-tight 
                        text-white antialiased"
        >
          Entrar no fwitter
        </h1>
        <div className="mt-10 flex flex-col gap-3">
          <input
            placeholder="Digite aqui ..."
            {...register("username")}
            className="h-14 w-full rounded-md border
                    border-stone-700 bg-inherit px-3 py-1 align-middle 
                    text-xl text-white outline-none transition-colors
                    placeholder:text-stone-500 hover:border-stone-600 
                    focus:border-stone-500 focus:placeholder:invisible 
                    "
          />
          <input
            type="password"
            placeholder="Digite aqui ..."
            {...register("password")}
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
            className="mt-6 h-9 w-full 
                        rounded-2xl bg-gray-50 font-bold 
                        text-black transition-colors hover:bg-gray-200
                        active:bg-gray-200"
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
