import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { register, responseLogin } from "../type/logintype";
import { response } from "../type/generic";
import Swal from "sweetalert2";


const SignUp = () => {
  // const usernameRef = useRef<HTMLInputElement>(null);
  // const ageRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<register>({
    userName: "",
    passWord: "",
    age: 0
  })
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    const { userName, passWord, age } = userData
    if (userName !== "" && passWord !== "" && age !== 0) {
      try {
        const res = await axios.post<response<responseLogin>>(`${import.meta.env.VITE_APP_API}/auth/signup`, {
          username: userName,
          password: passWord,
          age: age
        })
        Swal.fire({
          title: 'success',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      } catch (error) {
        if (error instanceof AxiosError) {
          Swal.fire({
            title: 'error',
            icon: 'error',
            // text: error.response?.data.message,
            text: "The name is already in use.!",
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          console.error("uknown: ", error)
        }
      }
    } else {
      console.log("user or pass is wrong!")
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSignIn}>
      <div className="hero min-h-screen bg-base-200 flex justify-center items-center" >
        <div className="card shadow-lg w-full max-w-sm ">
          <div className="card-body " >
            <h1 className="text-2xl font-bold mb-4 text-center">Create a new account</h1>
            <div className="space-y-4  ">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-primary">
                Name
              </span>
              <input
                type="text"
                className="input mt-1 px-3 py-2 bg-text-primary border shadow-sm border-warning block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Name Surname"
                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
              />
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-primary">
                Password
              </span>
              <input
                type="password"
                className="input mt-1 px-3 py-2 bg-text-primary border shadow-sm border-warning block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="password"
                onChange={(e) => setUserData({ ...userData, passWord: e.target.value })}
              />
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-primary">
                Age
              </span>
              <input
                className="input mt-1 px-3 py-2 bg-text-primary border shadow-sm border-warning block w-full rounded-md sm:text-sm focus:ring-1"
                type="number"
                placeholder="0"
                onChange={(e) => setUserData({ ...userData, age: Number(e.target.value) })}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-success"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4 ">
              <button type="button" onClick={handleBack} className="btn border-neutral-600 ">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
