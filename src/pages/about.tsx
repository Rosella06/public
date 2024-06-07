import React, { useEffect } from 'react';
import "../styles/about.css";
import { Link } from "react-router-dom";
import logo from "../img/Shopee.svg.png";
import axios from 'axios';

interface Product {
    image: string;
    name: string;
    price: number;
    quantity: number;
    id: number;
}

const About = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [search, setSearch] = React.useState<string>('');

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8001/product');
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
        //     // fetch('http://localhost:8001/product')
        //     //     .then((e) => e.json())
        //     //     .then((x) => {
        //     //         setProduct(x);
        //     //     });
    }, []);

    // const handleDelete = async (productId: number) => {
    //     try {
    //         await axios.delete(`http://localhost:8001/product/${productId}`);
    //         fetchData();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const handleDelete = async (productId: number) => {
        const confirmed = window.confirm("คุณแน่ใจหรือไม่ที่ต้องการลบสินค้านี้?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8001/product/${productId}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    

    const filter = products.filter((s) => s.name.includes(search) || s.price.toString().includes(search));

    return (
        <div>
            <nav className='nav'>
                <div className='nav-container'>
                    <button className="btn-hamburger">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className='logo'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='sidebar'>
                        <input
                            type='text'
                            className='sidebar-search'
                            placeholder='Search..'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                
                <ul className='bars'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">Shopee</Link></li>
                    <li><Link to="/add-product">Add Product</Link></li>
                </ul>

            </nav>

            <div className='product'>

                {
                    filter.map((e: Product) => (
                        <div className='product-items' key={e.id}>
                            <img src={e.image} alt="" className="product-image" />
                            <p>ID : {e.id}</p>
                            <p className="product-name">ชื่อสินค้า : {e.name}</p>
                            <p>ราคาสินค้า : {e.price}$</p>
                            <p>จำนวนคงเหลือ : {e.quantity}</p>

                            <div className="button-group">
                            <Link to={`/edit-product/${e.id}`} className="edit-link">แก้ไข</Link>
                            </div>

                            <div className="button-groups">
                                <button onClick={() => handleDelete(e.id)}>ลบ</button>
                            </div>

                        </div>

                    ))
                }
            </div>
        </div>
    );
}

export default About;
