import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('//localhost:5000/auth/register', {
                username,
                name,
                password,
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="bg-stone-800 grid justify-center items-center min-h-screen">
            <form onSubmit={(e) => handleSubmit(e)} className="box-content flex flex-col w-96 pt-11 pb-24 px-24 bg-stone-900 rounded-lg">
            <h1 className="text-3xl font-sans font-medium antialiased tracking-tight text-white ">Criar conta</h1>
                <input 
                    className='mt-10 text-gray-300 placeholder:text-gray-300 align-middle outline-none h-14 bg-inherit border border-stone-700 py-1 pl-2 focus:placeholder:invisible focus:border-stone-500 hover:border-stone-600 transition-colors'
                    placeholder="Email"
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    />
                <input 
                    className='mt-3 text-gray-300 placeholder:text-gray-300 align-middle outline-none h-14 bg-inherit border border-stone-700 py-1 pl-2 focus:placeholder:invisible focus:border-stone-500 hover:border-stone-600 transition-colors'
                    placeholder="Nome de usuário"
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                    />
                <input 
                    className='mt-3 text-gray-300 placeholder:text-gray-300 align-middle outline-none h-14 bg-inherit border border-stone-700 py-1 pl-2 focus:placeholder:invisible focus:border-stone-500 hover:border-stone-600 transition-colors'
                    placeholder="Senha"
                    type='password' 
                    onChange={e => setPassword(e.target.value)} 
                    value={password}
                    />
                <div>
                    <button className="mt-6 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-2xl font-bold w-full h-9">Avançar</button>
                </div>
                <div className="font-sm mt-20 flex text-gray-100 gap-1">
                    <p>Já é cadastrado? </p>
                    <Link to='/login'>
                        <p className="text-stone-500 hover:underline">Fazer login</p>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register;