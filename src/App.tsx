import { useEffect, useRef, useState } from "react";
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
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="you@example.com"
              type="text"
              ref={emailRef}
            />
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Password"
              type="password"
              ref={passwordRef}
            />
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            .
            <button
              type="button"
              className="btn  btn-info "
              onClick={handleSignUpPage}
            >
              Sign Up
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInSignupWithLocalStorage;
