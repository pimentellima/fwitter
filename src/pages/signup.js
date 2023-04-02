import { useRouter } from 'next/router';
import { SignUp } from '@clerk/nextjs';

const Signup = () => {
    const router = useRouter();

    return(
        <div className="bg-stone-800 grid 
                justify-center items-center min-h-screen">
            <SignUp path="/signup" routing="path" signInUrl="/signin" /> 
        </div>
    )
}

export default Signup;