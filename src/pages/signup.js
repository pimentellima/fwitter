import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
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
        router.push("/signin");
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
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
          Inscrever-se
        </h1>
        <div className="mt-10 flex flex-col gap-3">
          <input
            placeholder="Nome"
            {...register("name", { required: true, maxLength: 50 })}
            className="h-14 w-full rounded-lg border border-gray-300 bg-inherit
              pl-2 text-lg transition
              placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
          <div>
            <input
              placeholder="Nome de usuario"
              {...register("username", {
                required: true,
                minLength: {
                  value: 6,
                  message: "O nome de usuário deve ser maior",
                },
                maxLength: {
                  value: 15,
                  message: "O nome de usuário deve ser menor",
                },
                validate: isUsernameAvailable,
              })}
              className="h-14 w-full rounded-lg border border-gray-300 bg-inherit
              pl-2 text-lg transition
              placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
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
              className="h-14 w-full rounded-lg border border-gray-300 bg-inherit
              pl-2 text-lg transition
              placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
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
          <p>Já tem uma conta?</p>
          <Link className="text-sky-500 hover:underline" href="/signin">
            Fazer login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
