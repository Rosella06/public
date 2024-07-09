import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginType, responseLogin } from "../type/logintype";
import axios, { AxiosError } from "axios";
import { response } from "../type/generic";
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<loginType>({
        userName: "",
        passWord: "",
    })


    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();

        const { userName, passWord } = userData;

        if (userName !== "" && passWord !== "") {
            try {

                const res = await axios.post<response<responseLogin>>(`${import.meta.env.VITE_APP_API}/auth`, {
                    username: userName,
                    password: passWord
                });
                localStorage.setItem("token", res.data.data.token);
                navigate("/");
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error("AxiosError:", error.response?.data.message);
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: error.response?.data.message || "An error occurred",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    console.log("Username or password is empty!");
                }
            }
        }
    };

    const handleSignUpPage = () => {
        navigate("/signUp");
    };

    return (
        <div className="hero min-h-screen bg-base-200 flex justify-center items-center">
            <div className="card shadow-lg w-full max-w-sm">
                <div className="card-body">
                    <h1 className="text-2xl font-bold mb-4 text-center ">Login</h1>
                    <div className="space-y-4">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-primary">
                            Name
                        </span>
                        <input
                            className="input mt-1 px-3 py-2 bg-text-primary border shadow-sm border-warning block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="Name Surname"
                            type="text"
                            value={userData.userName}
                            onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                        />
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-primary">
                            Password
                        </span>
                        <input
                            className="input mt-1 px-3 py-2 bg-text-primary border shadow-sm   border-warning block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="Password"
                            type="password"
                            value={userData.passWord}
                            onChange={(e) => setUserData({ ...userData, passWord: e.target.value })}
                        />
                    </div>

                    <div className="mt-5 flex gap-2 ">
                        <button
                            type="button"
                            className="btn btn-success "
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            className="btn  btn-info  "
                            onClick={handleSignUpPage}
                        >
                            Sign Up
                        </button>
                    </div>
                    {/* {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )} */}
                </div>
            </div>
        </div>
    );
}

export default Login;
