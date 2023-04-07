import { useRouter } from "next/router";
import { SignUp } from "@clerk/nextjs";

const Signup = () => {
  const router = useRouter();

  return (
    <div
      className="grid min-h-screen 
                items-center justify-center bg-stone-800"
    >
      <SignUp path="/signup" routing="path" signInUrl="/signin" />
    </div>
  );
};

export default Signup;
