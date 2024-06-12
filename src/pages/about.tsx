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

interface CartItem {
    id: number;
    sum: number;
}

const About = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartVisible, setCartVisible] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8001/product');
            setProducts(res.data);
        } catch (error) {
            console.log(error);0
        }
    };

    useEffect(() => {
        fetchData();

        const cartlocalStorage = localStorage.getItem('cart');
        if (cartlocalStorage) {
            const cartdata = JSON.parse(cartlocalStorage);
            setCart(cartdata);
        }
    }, []); 

    const handleAddToCart = (product: Product) => {
        const cartIndex = cart.findIndex(x => x.id === product.id);
        if (cartIndex === -1) {
            setCart([...cart, { id: product.id, sum: 1 }]);
        } else {
            const newCart = [...cart];
            newCart[cartIndex].sum += 1;
            setCart(newCart);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };


    const handleRemoveFromCart = (productId: number) => {
        const newCart = cart.filter(item => item.id !== productId);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };
    const handleIncreaseQuantity = (productId: number) => {
        const newCart = cart.map(item => {
            if (item.id === productId) {
                return { ...item, sum: item.sum + 1 };
            }
            return item;
        });
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleDecreaseQuantity = (productId: number) => {
        const newCart = cart.map(item => {
            if (item.id === productId && item.sum > 1) {
                return { ...item, sum: item.sum - 1 };
            }
            return item;
        }).filter(item => item.sum > 0);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    useEffect(() => {
        fetchData();
    //     //     // fetch('http://localhost:8001/product')
    //     //     //     .then((e) => e.json())
    //     //     //     .then((x) => {
    //     //     //         setProduct(x);
    //     //     //     });
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
                    <button className="btn-hamburger"></button>
                    <div className='logo'>
                        <img src={logo} alt="Shopee Logo" />
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
                    <li><Link to="/resume">Resume</Link></li>
                    <li><Link to="/about">Shopee</Link></li>
                    <li><Link to="/add-product">Add Product</Link></li>
                    <li className='nav-profile-cart'>
                        <i className="fas fa-shopping-cart" aria-hidden="true" onClick={() => setCartVisible(true)}></i>
                        {cart.length > 0 && <span className="cartcount">{cart.length}</span>}
                    </li>
                    <button > <Link to="/">LogOut</Link></button>
                    
                </ul>
            </nav>

            <div className='product'>
                {filter.map((e: Product) => (
                    <div className='product-items' key={e.id}>
                        <img src={e.image} alt={e.name} className="product-image" />
                        <p>ID: {e.id}</p>
                        <p className="product-name">ชื่อสินค้า: {e.name}</p>
                        <p>ราคาสินค้า: {e.price}b</p>
                        <p>จำนวนคงเหลือ: {e.quantity}</p>
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

            {isCartVisible && (
                <div className='modal'>
                    <div className='modal-ba' onClick={() => setCartVisible(false)}></div>
                    <div className='modal-page'>
                        <h2>ตะกร้าสินค้า</h2>
                        <div className="cartlist">
                            {cart.map(x => {
                                const currentProduct = products.find(f => f.id === x.id);
                                if (currentProduct) {
                                    return (
                                        <div className='cartlist-items' key={x.id}>
                                            <div className='cartlist-left'>
                                                <img src={currentProduct.image} alt={currentProduct.name} className='modaldesc-img' />
                                                <div className='cartlist-detail'>
                                                    <p>ชื่อสินค้า: {currentProduct.name}</p>
                                                    <p>ราคา: {currentProduct.price}B</p>
                                                    <p>จำนวนคงเหลือ: {currentProduct.quantity}</p>
                                                </div>
                                            </div>
                                            <div className='cartlist-right'>
                                                <p>จำนวน: {x.sum}</p>
                                                <button className='btn' onClick={() => handleIncreaseQuantity(x.id)}>+</button>
                                                <button className='btn' onClick={() => handleDecreaseQuantity(x.id)}>-</button>
                                                <button className='btn-remove' onClick={() => handleRemoveFromCart(x.id)}>ลบจากตะกร้า</button>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className='btn-control'>
                            <button className='btn' onClick={() => setCartVisible(false)}>ปิด</button>
                            <button className='btn btn-buy'>ซื้อสินค้า</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default About;
