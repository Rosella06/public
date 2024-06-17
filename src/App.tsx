import React, { useEffect, useRef, useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "../src/pages/SignUp";
import axios from "axios";

function SignInSignupWithLocalStorage() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showResume, setShowResume] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true); 
  const localSignUp = localStorage.getItem("signUp");
  const localEmail = localStorage.getItem("email");

  useEffect(() => {
    if (localSignUp) {
      setShowResume(true);
    }

    if (localEmail) {
      setShowSignIn(true);
    }
  }, []);

  const handleClick =  async () => {
    if (nameRef.current?.value &&
       emailRef.current?.value &&
        passwordRef.current?.value
      ) {
        await axios.post("http://localhost:8001/signup", {
          name: nameRef.current?.value,
          password: passwordRef.current?.value,
          email: emailRef.current?.value,
        });
        
      localStorage.setItem("name", nameRef.current.value);
      localStorage.setItem("email", emailRef.current.value);
      localStorage.setItem("password", passwordRef.current.value);
      localStorage.setItem("signUp", emailRef.current.value);
      alert("Account created successfully!!");
      navigate('/about');
      setShowResume(true);
    }
  }

  const handleSignIn = async () => {
    await axios.post("http://localhost:8001/signin", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      
    });
    const localStoredEmail = localStorage.getItem("email");
    const localStoredPassword = localStorage.getItem("password");
    console.log (emailRef.current!.value);
    console.log (localStoredEmail);
    console.log (emailRef.current!.value == localStoredEmail);
    // axios.post('signin',){
    //   email:localStoredEmail,
    //   password : localStoredpassword
    // }
    if (
      emailRef.current!.value === localStoredEmail && 
      passwordRef.current?.value === localStoredPassword
    ) {
      console.log("login")
      localStorage.setItem("signUp", emailRef.current!.value);
     
      navigate('/about');
      setShowResume(true);
    } else {

      const errorMessage = document.createElement('div');
      errorMessage.textContent = "Please entera valid credentials";
      errorMessage.style.color = 'red';
      const container = document.querySelector('.container-n');
      if (container) {
        container.appendChild(errorMessage);
      } else {
        console.error("Container element not found.");
      }
    }
    
  };

  const handleSignUpPage = () => {
    setShowSignIn(false);
    navigate("/signUp");
    // window.location.reload()
  }
  return (
    <div className="signin-page ">
     (
          <div className="container-n">
             <h1>Login</h1>
            <div className="input_space">
              <input placeholder="Email" type='text' ref={emailRef} />
            </div>
            <div className="input_space">
              <input placeholder="Password" type='password' ref={passwordRef} />
            </div>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignUpPage}>Sign Up</button>
          </div>
        )
    </div>
  );
}

export default SignInSignupWithLocalStorage;
