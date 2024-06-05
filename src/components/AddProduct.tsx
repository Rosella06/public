import '../styles/Home.css';
import { Link } from "react-router-dom";

function AddProduct() {
  return (
    <nav>
      <button className="btn-hamburger">
        <i className="fas fa-bars"></i>
      </button>
      <ul className='bars'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">Shopee</Link></li>
        <li><Link to="/AddProduct">AddProduct</Link></li>
      </ul>
    </nav>
  );
}

export default AddProduct;
