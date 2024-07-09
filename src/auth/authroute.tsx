
import { getToken } from "./authentication"
import { Navigate, Outlet } from "react-router-dom"



export const Authroute = () => {
    return getToken() ? <Outlet /> : <Navigate to={"/login"} />
}