import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Resume from './pages/Resume.tsx';
import Home from './components/Home.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './pages/about.tsx';
import AddProduct from './pages/AddProduct.tsx';
import EditProduct from './pages/EditProduct.tsx';
// import Cart from './pages/cart.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "resume",
    element: <Resume />
  },
  {
    path: "about",
    element: <About />
  },
  {
    path: "add-product",
    element: <AddProduct />
  },
  {
    path: "edit-product/:id",
    element: <EditProduct />
  },

  {
    path: "Home",
    element: <Home />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
