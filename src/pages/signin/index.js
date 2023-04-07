import { SignIn } from "@clerk/nextjs";

const Signin = () => {
  return (
    <div
      className="grid min-h-screen 
                items-center justify-center bg-stone-800"
    >
      <SignIn path="/signin" routing="path" signUpUrl="/signup" />
    </div>
  );
};

export default Signin;
