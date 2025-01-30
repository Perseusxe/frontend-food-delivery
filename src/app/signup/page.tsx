import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    SignUp,
  } from "@clerk/nextjs";
  
  export default function SignupPage() {
    return (
      <div className="w-screen bg-white h-screen flex justify-center items-center gap-12">
        <div>
          <SignUp />
        </div>
        <div className="w-[856px] h-[904px] bg-[url(/login-bg.png)] bg-cover bg-no-repeat bg-center rounded-lg"></div>
      </div>
    );
  }