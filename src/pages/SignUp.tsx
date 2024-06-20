import React, { useRef } from "react";
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
      const response = await axios.post('http://localhost:8001/signup', {
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
      alert("Failed to register user. Please try again.");
    }
  };
  
  return (
    <div className="hero min-h-screen bg-base-200 flex justify-center items-center" >
       <div className="card shadow-lg w-full max-w-sm">
      <div className="card-body " >
        <h1 className="text-2xl font-bold mb-4 text-center">Create a new account</h1>
        <div className="space-y-4  ">
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Name"
              ref={nameRef}
            />
            <input 
              className="input input-bordered w-full"
              type="text"
              placeholder="Email"
              ref={emailRef}
            />
            <input
              className="input input-bordered w-full"
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
