import React, { useState } from "react";
import LoginBannerBg from "../../assets/images/LoginSection/loginBanner.png";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const Banner = ({ title, description, buttonText, onClick }) => (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={LoginBannerBg}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-8">
        <h1 className="text-5xl font-bold mb-6">{title}</h1>

        <p className="text-lg max-w-md mb-10 leading-relaxed">{description}</p>

        <button
          onClick={onClick}
          className="
            w-[250px]
            h-[60px]
            rounded-full
            border-2
            border-white
            text-white
            font-semibold
            hover:bg-white
            hover:text-[#004b73]
            transition-all
            duration-300
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {isSignIn ? (
        <>
          {/* Sign In Section */}
          <div className="w-3/5 flex items-center justify-center bg-white transition-all duration-500">
            <div className="w-full max-w-[530px] px-8">
              <SignIn />
            </div>
          </div>

          {/* Right Banner */}
          <div className="w-2/5 transition-all duration-500">
            <Banner
              title="Hello Friend!"
              description="Enter your personal details and start your journey with us"
              buttonText="SIGN UP"
              onClick={() => setIsSignIn(false)}
            />
          </div>
        </>
      ) : (
        <>
          {/* Left Banner */}
          <div className="w-2/5 transition-all duration-500">
            <Banner
              title="Welcome Back!"
              description="To keep connected with us please login with your personal information"
              buttonText="SIGN IN"
              onClick={() => setIsSignIn(true)}
            />
          </div>

          {/* Sign Up Section */}
          <div className="w-3/5 flex items-center justify-center bg-white transition-all duration-500">
            <div className="w-full max-w-[530px] px-8">
              <SignUp />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
