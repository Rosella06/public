import { createContext } from "react";
import { contextType } from "./type/contexttype";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authroute } from "./auth/authroute";
import Resume from "./pages/Resume";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import SignUp from "./pages/SignUp";
import Login from "./components/login";
import ProductHome from "./pages/productHome"
import Notfound from "./pages/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authroute />,
    children: [
      {
        path: "/",
        element: <ProductHome />
      },
      {
        path: "resume",
        element: <Resume />
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />
      },
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "SignUp",
    element: <SignUp />
  },
  {
    path: "*",
    element: <Notfound/>
  },
]);

export const ThemeContext = createContext<contextType | null>(null)
function Routes() {
  const [theme, setTheme] = useState(String(localStorage.getItem("Theme")));
  useEffect(() => {
    localStorage.setItem("Theme", theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default Routes;
