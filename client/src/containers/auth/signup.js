import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { AuthContext } from '../../contexts/authContext';

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const { signupUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        signupUser(data).then(() =>
            navigate('/login')
        );
    };

    return(
        <div className="bg-stone-800 grid 
                        justify-center items-center min-h-screen">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="box-content flex flex-col w-96 
                        pt-11 pb-24 px-24 bg-stone-900 rounded-lg">
                <h1 className="text-3xl font-sans font-medium 
                                antialiased tracking-tight text-white">
                    Criar conta
                </h1>
                <div className='flex flex-col gap-3 mt-10'>
                    <Input
                        placeholder='Nome de usuário'
                        name='username'
                        register={register}
                        border={true}
                        />
                    <Input
                        placeholder='Seu nome'
                        name='name'
                        register={register}
                        border={true}
                        />
                    <Input
                        placeholder='Senha'
                        name='password'
                        type='password'
                        register={register}
                        border={true}
                        />
                </div>
                <div>
                    <button className="text-black mt-6 bg-gray-50 
                            hover:bg-gray-200 active:bg-gray-200 
                            rounded-2xl font-bold w-full h-9
                            transition-colors">
                        Avançar
                    </button>
                </div>
                <div className="font-sm mt-16 flex text-gray-100 gap-1">
                    <p>Já é cadastrado? </p>
                    <Link to='/login'>
                        <p className="text-stone-500 hover:underline">
                            Fazer login
                        </p>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;