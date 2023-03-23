import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { request } from "../../utils/axios";
import LoginForm from "./loginForm";

const LoginController = () => {
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async data => {
        const { username, password } = data;
        return request.post('/auth/login', {
            username,
            password
        }).then(res => {
            setCurrentUser(res.data);
            navigate('/')
        });
    }
    
    return(
        <div className="bg-stone-800 grid 
                justify-center items-center min-h-screen">
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}

export default LoginController;