import React, { useEffect, useRef, useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

function SignInSignupWithLocalStorage() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Check local storage for existing sign-up
    const localSignUp = localStorage.getItem("signUp");
    if (localSignUp) {
      navigate('/about'); // Redirect to about page if signed up
    }
  }, [navigate]);

  const handleSignIn = () => {
    const localStoredEmail = localStorage.getItem("email");
    const localStoredPassword = localStorage.getItem("password");

    if (
      emailRef.current?.value === localStoredEmail &&
      passwordRef.current?.value === localStoredPassword
    ) {
      localStorage.setItem("signUp", emailRef.current!.value);
      navigate('/about');
    } else {
      setErrorMessage("Please enter valid credentials.");
    }
  };

  const handleSignUpPage = () => {
    navigate("/signUp");
  };

  return (
    <div className="hero min-h-screen bg-base-200 flex justify-center items-center">
      <div className="card shadow-lg w-full max-w-sm">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <div className="space-y-4">
            <input
              className="input input-bordered w-full"
              placeholder="Email"
              type="text"
              ref={emailRef}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Password"
              type="password"
              ref={passwordRef}
            />
          </div>

          <button
            type="button"
            className="btn btn-outline btn-success w-full"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn btn-outline btn-info w-full"
            onClick={handleSignUpPage}
          >
            Sign Up
          </button>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInSignupWithLocalStorage;
