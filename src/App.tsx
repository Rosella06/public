import React, { useEffect, useRef, useState } from "react";
import './App.css'; 
import Home from "../src/components/Home";





function SignInSignupWithLocalStorage() {

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showHome, setShowHome] = useState(false);
  const [show, setShow] = useState(false);
  const localSignUp = localStorage.getItem("signUp");
  const localEmail = localStorage.getItem("email");
  const localPassword = localStorage.getItem("password");
  const localName = localStorage.getItem("name");

  useEffect(() => {
    if (localSignUp) {
      setShowHome(true);
    }

    if (localEmail) {
      setShow(true);
    }
  }, []);

  const handleClick = () => {
    if (nameRef.current?.value && emailRef.current?.value && passwordRef.current?.value) {
      localStorage.setItem("name", nameRef.current.value);
      localStorage.setItem("email", emailRef.current.value);
      localStorage.setItem("password", passwordRef.current.value);
      localStorage.setItem("signUp", emailRef.current.value);
      alert("Account created successfully!!");
      setShowHome(true);
    }
  }

  const handleSignIn = () => {
    const localStoredEmail = localStorage.getItem("email");
    const localStoredPassword = localStorage.getItem("password");

    if (emailRef.current?.value === localStoredEmail && passwordRef.current?.value === localStoredPassword) {
      localStorage.setItem("signUp", emailRef.current.value);
      setShowHome(true);
    } else {
      alert("Please enter valid credentials");
    }
  }

  return (
    <div>
      {showHome ? <Home /> :
        (show ?
          <div className="container">
            <h1>สวัสดีคุณ {localName}</h1>
            <div className="input_space">
              <input placeholder="Email" type='text' ref={emailRef} />
            </div>
            <div className="input_space">
              <input placeholder="Password" type='password' ref={passwordRef} />
            </div>
            <button onClick={handleSignIn}>Sign In</button>
          </div>
          :
          <div className="container">
            <div className="input_space">
              <input placeholder="Name" type='text' ref={nameRef} />
            </div>
            <div className="input_space">
              <input placeholder="Email" type='text' ref={emailRef} />
            </div>
            <div className="input_space">
              <input placeholder="Password" type='password' ref={passwordRef} />
            </div>
            <button onClick={handleClick}>Sign Up</button>
          </div>)
      }
    </div>
  );
}

export default SignInSignupWithLocalStorage;
