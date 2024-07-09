import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './App.tsx';

// import Cart from './pages/cart.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
);
