import { SignIn } from "@clerk/nextjs";

const Signin = () => {
    
    return(
        <div className="bg-stone-800 grid 
                justify-center items-center min-h-screen">
            <SignIn path="/signin" routing="path" signUpUrl="/signup" />
        </div>
    )
}

export default Signin;