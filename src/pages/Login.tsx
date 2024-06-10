import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: (isLoggedIn: boolean) => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'your_username' && password === 'your_password') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <ul className='barss'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">Shopee</Link></li>
                    <li><Link to="/add-product">Add Product</Link></li>
                </ul>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
