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
      navigate("/about");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to register user. Please try again.");
    }
  };
  

  return (
    <div className="signin-page ">
    <div className="container-n">
      <h1> Create a new account</h1>
      <div className="input_space">
        <input placeholder="Name" type='text' ref={nameRef} />
      </div>
      <div className="input_space">
        <input placeholder="Email" type='text' ref={emailRef} />
      </div>
      <div className="input_space">
        <input placeholder="Password" type='password' ref={passwordRef} />
      </div>
      <div className="Sign-n">
        <button onClick={signUpUser}>Sign Up</button>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
