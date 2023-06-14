import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    await axios
      .post("/api/auth/signup", {
        name: data.name,
        username: data.username,
        password: data.password,
      })
      .then(() => {
        reset();
        router.push("/");
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
            {...register("name")}
            className="placeholder:text-stone-500 rounded-md bg-inherit h-14
                    text-white align-middle outline-none py-1 text-xl 
                    border px-3 border-stone-700 w-full
                    transition-colors focus:placeholder:invisible 
                    focus:border-stone-500 hover:border-stone-600 
                    "
          />
          <input
            placeholder="Nome de usuario"
            {...register("username")}
            className="placeholder:text-stone-500 rounded-md bg-inherit h-14
                    text-white align-middle outline-none py-1 text-xl 
                    border px-3 border-stone-700 w-full
                    transition-colors focus:placeholder:invisible 
                    focus:border-stone-500 hover:border-stone-600 
                    "
          />
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
            className="placeholder:text-stone-500 rounded-md bg-inherit h-14
                    text-white align-middle outline-none py-1 text-xl 
                    border px-3 border-stone-700 w-full
                    transition-colors focus:placeholder:invisible 
                    focus:border-stone-500 hover:border-stone-600 
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
