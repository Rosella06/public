import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../styles/AddProduct.css';

const AddProduct = () => {
    const [id, setid] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newProduct = { name:name, price:price, quantity:quantity, image:image };
           const response =  await axios.post('http://localhost:8001/add-product', newProduct);
           console.log(response) 
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 3000);
            navigate('/about');
        } catch (error) {
            console.error(error);
        }
    }
    
    // const validateImageUrl = (url: string) => {
    //     const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    //     return pattern.test(url);
    // }

    return (
        <div>
            {isAdded && <p className="success-messages">สินค้าถูกเพิ่มเรียบร้อยแล้ว</p>}
            <nav className='nav-containers'>
                <div className='nav-contents'>
                    <button className="btn-hamburgers">
                        <i className="fas fa-barss"></i>
                    </button>
                </div>
                <ul className='barss'>
                    <li><Link to="/resume">Resume</Link></li>
                    <li><Link to="/about">Shopee</Link></li>
                    <li><Link to="/add-product">Add Product</Link></li>
                </ul>
            </nav>

            <div className='form-containers'>
                <h2 className='form-titles'>Add New Product</h2>
                <form onSubmit={handleSubmit} className='product-forms'>
                    <div className='form-groups'>
                        <label>id:</label>
                        <input
                            type="number"
                            value={id}
                            onChange={(e) => setid(parseInt(e.target.value))}
                            required
                            className='form-inputs'
                        />
                    </div>
                    <div className='form-groups'>
                        <label>ชื่อสินค้า:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='form-inputs'
                        />
                    </div>
                    <div className='form-groups'>
                        <label>ราคาสินค้า:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            required
                            className='form-inputs'
                        />
                    </div>
                    <div className='form-groups'>
                        <label>จำนวนคงเหลือ:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            required
                            className='form-inputs'
                        />
                    </div>
                    <div className='form-groups'>
                        <label>ลิงก์รูปภาพ:</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                            className='form-inputs'
                        />
                    </div>
                    <button type="submit" className='form-buttons'>เพิ่มสินค้า</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
