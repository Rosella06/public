import React, { useEffect, useState } from 'react';
import "../styles/about.css";
import { Link } from "react-router-dom";
import logo from "../img/Shopee.svg.png";
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

interface Product {
    image: string;
    name: string;
    price: number;
    quantity: number;
    id: number;
}

const About = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>('');
    const [cart, setCart] = useState<Product[]>([]);

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

    const handleAddToCart = (product: Product) => {
        setCart([...cart, product]);
    }

    const handleRemoveFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    }

    const filter = products.filter((s) => s.name.includes(search) || s.price.toString().includes(search));

    return (
        
        <div>
            <nav className='nav'>
                <div className='nav-container'>
                    <button className="btn-hamburger">
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
                    <li className='nav-profile-cart'>
                        <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                        {cart.length > 0 && <span className="cartcount">{cart.length}</span>}

                    </li>
                </ul>

            </nav>

            {/* <div className='modal' >
                <div className='modal-ba'></div>
                <div className='modal-page'>
                    <h2>รายละเอียดสินค้า</h2>
                    <br></br>
                    <div className="modaldesc-content">
                        <img src={logos} alt="" className='modaldesc-img' />
                        <div className="modaldesc-detail">
                            <p>ID </p>
                            <p>ชื่อสินค้า </p>
                            <p>ราคาสินค้า </p>
                            <p>จำนวนคงเหลือ </p>
                        </div>
                    </div>
                    <div className="btn-control">
                        <button className='btn'>
                            close
                        </button>
                        <button className='btn btn-buy'>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div className='modal'>
                <div className='modal-ba'></div>
                <div className='modal-page'>
                    <h2>My cart</h2>
                    <br></br>
                    <div className="cartlist">
                        <div className="cartlist-items">
                            <div className='cartlist-left'>
                                <img src={logos} alt="" className='modaldesc-img' />
                                <div className='cartlist-detail'>
                                    <p> Product Name</p>
                                    <p>5000</p>
                                </div>
                            </div>
                            <div className='cartlist-right'>
                                <p className='btnc'> -</p>
                                <p>1</p>
                                <p className='btnc'> +</p>
                            </div>
                        </div>
                        <div className="cartlist-items">
                            <div className='cartlist-left'>
                                <img src={logos} alt="" className='modaldesc-img' />
                                <div className='cartlist-detail'>
                                    <p> Product Name</p>
                                    <p>5000</p>
                                </div>
                            </div>
                            <div className='cartlist-right'>
                                <p className='btnc'> -</p>
                                <p>1</p>
                                <p className='btnc'> +</p>
                            </div>
                        </div>
                        <div className="cartlist-items">
                            <div className='cartlist-left'>
                                <img src={logos} alt="" className='modaldesc-img' />
                                <div className='cartlist-detail'>
                                    <p> Product Name</p>
                                    <p>5000</p>
                                </div>
                            </div>
                            <div className='cartlist-right'>
                                <p className='btnc'> -</p>
                                <p>1</p>
                                <p className='btnc'> +</p>
                            </div>
                        </div><div className="cartlist-items">
                            <div className='cartlist-left'>
                                <img src={logos} alt="" className='modaldesc-img' />
                                <div className='cartlist-detail'>
                                    <p> Product Name</p>
                                    <p>5000</p>
                                </div>
                            </div>
                            <div className='cartlist-right'>
                                <p className='btnc'> -</p>
                                <p>1</p>
                                <p className='btnc'> +</p>
                            </div>
                        </div><div className="cartlist-items">
                            <div className='cartlist-left'>
                                <img src={logos} alt="" className='modaldesc-img' />
                                <div className='cartlist-detail'>
                                    <p> Product Name</p>
                                    <p>5000</p>
                                </div>
                            </div>
                            <div className='cartlist-right'>
                                <p className='btnc'> -</p>
                                <p>1</p>
                                <p className='btnc'> +</p>
                            </div>
                        </div><div className="cartlist-items">
                            <div className='cartlist-left'>
                                <img src={logos} alt="" className='modaldesc-img' />
                                <div className='cartlist-detail'>
                                    <p> Product Name</p>
                                    <p>5000</p>
                                </div>
                            </div>
                            <div className='cartlist-right'>
                                <p className='btnc'> -</p>
                                <p>1</p>
                                <p className='btnc'> +</p>
                            </div>
                        </div>
                    </div>
                    <div className='btn-control'>
                        <button className='btn'>
                            cancel
                        </button>
                        <button className='btn btn-buy'>
                            Buy
                        </button>
                    </div>
                </div>
            </div> */}

            <div className='product'>
                {filter.map((e: Product) => (
                    <div className='product-items' key={e.id}>
                        <img src={e.image} alt="" className="product-image" />
                        <p>ID : {e.id}</p>
                        <p className="product-name">ชื่อสินค้า : {e.name}</p>
                        <p>ราคาสินค้า : {e.price}$</p>
                        <p>จำนวนคงเหลือ : {e.quantity}</p>
                        <div className="button-group">
                            <Link to={`/edit-product/${e.id}`} className="edit-link">แก้ไข</Link>
                        </div>
                        <div className="button-groupst">
                            <button className="btn-add-to-cart" onClick={() => handleAddToCart(e)}>เพิ่มลงตะกร้า</button>
                        </div>

                        <div className="button-groups">
                            <button onClick={() => handleDelete(e.id)}>ลบ</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default About;
