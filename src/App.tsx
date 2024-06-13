import React, { useEffect, useRef, useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";
import Resume from "./pages/Resume";
import Home from "./components/Home";

function SignInSignupWithLocalStorage() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showResume, setShowResume] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true); 
  const localSignUp = localStorage.getItem("signUp");
  const localEmail = localStorage.getItem("email");
  // const localPassword = localStorage.getItem("password");
  // const localName = localStorage.getItem("name");


  useEffect(() => {
    if (localSignUp) {
      setShowResume(true);
    }

    if (localEmail) {
      setShowSignIn(true);
    }
  }, []);

  const handleClick = () => {
    if (nameRef.current?.value && emailRef.current?.value && passwordRef.current?.value) {
      localStorage.setItem("name", nameRef.current.value);
      localStorage.setItem("email", emailRef.current.value);
      localStorage.setItem("password", passwordRef.current.value);
      localStorage.setItem("signUp", emailRef.current.value);
      alert("Account created successfully!!");
      navigate('/about');
      setShowResume(true);
    }
  }

  const handleSignIn = () => {
    const localStoredEmail = localStorage.getItem("email");
    const localStoredPassword = localStorage.getItem("password");

    if (emailRef.current?.value === localStoredEmail && passwordRef.current?.value === localStoredPassword) {
      localStorage.setItem("signUp", emailRef.current.value);
      navigate('/about');
      setShowResume(true);
    } else {
      // alert("Please enter valid credentials"); 

      const errorMessage = document.createElement('div');
      errorMessage.textContent = "Please enter valid credentials";
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
  }

  return (
    <div className="signin-page ">
      {showResume ? (
        <Home />
      ) : (
        showSignIn ? (
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
        ) : (
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
            <button onClick={handleClick}>Sign Up</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default SignInSignupWithLocalStorage;
