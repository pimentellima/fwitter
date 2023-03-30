import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { request } from "../../utils/axios";
import LoginForm from "./loginForm";

const LoginPage = () => {
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async data => {
        const { username, password } = data;
        const res = await request.post('/user/login', {
            username,
            password
        });
        setCurrentUser(res.data);
        navigate('/');
    }
    
    return(
        <div className="bg-stone-800 grid 
                justify-center items-center min-h-screen">
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}

export default LoginPage;