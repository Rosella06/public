import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signUpUser = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8001/api/auth/signup', {
        name,
        email,
        password,
      });
      console.log(response.data);
      alert("User registered successfully!");
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("signUp", email);
      // window.location.reload()
      navigate("/about");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Name and email already taken.");
    }
  };
  
  return (
    <div className="hero min-h-screen bg-base-200 flex justify-center items-center " >
       <div className="card shadow-lg w-full max-w-sm">
      <div className="card-body " >
        <h1 className="text-2xl font-bold mb-4 text-center">Create a new account</h1>
        <div className="space-y-4  ">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
        Name 
  </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Name Surname"
              ref={nameRef}
            />
             <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
             Email 
  </span>
            <input 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="you@example.com"
              ref={emailRef}
            />
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            password 
  </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-success"
            onClick={signUpUser}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
    </div>
  );  
};

export default SignUp;
