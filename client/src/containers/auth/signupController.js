import { useNavigate } from "react-router-dom";
import { request } from "../../utils/axios";
import SignupForm from "./signupForm";

const SignupController = () => {
    const navigate = useNavigate();

    const onSubmit =  async data => {
        const { username, name, password } = data;
        return request.post('/auth/register', {
            username,
            name,
            password
        }).then(() => navigate('/user'));
    }
    
    return(
        <div className="bg-stone-800 grid 
                justify-center items-center min-h-screen">
            <SignupForm onSubmit={onSubmit}/>
        </div>
    )
}

export default SignupController;