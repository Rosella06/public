import React from "react";
import '../styles/Home.css';
import { Link } from 'react-router-dom';

// function Shopee() {
//   return (
//     <nav>
//       <button className="btn-hamburger">
//         <i className="fas fa-bars"></i>
//       </button>
//       <ul className='bars'>
//         <li><Link to="/">Resume</Link></li>
//         <li><Link to="/about">Shopee</Link></li>
//       </ul>
//     </nav>
//   );
// }

function Home () {
    const logout = () => {
        localStorage.removeItem("signUp");
        window.location.reload();
    }

    const deleteAccount = () => { 
        localStorage.clear();
        window.location.reload();
    }
    
    return (
           
        <div className="container">
            <h1>Welcome {localStorage.getItem('name')}</h1>
            <button onClick={logout} className="logout">LogOut</button>
            <button onClick={deleteAccount} className="delete">Delete</button>
        </div>

    );
}

export default Home ;
