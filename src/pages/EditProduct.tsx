import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        image: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/product/${id}`);
                setProduct({
                    id: res.data[0]?.id,
                    name: res.data[0]?.name,
                    price: res.data[0]?.price,
                    quantity: res.data[0]?.quantity,
                    image: res.data[0]?.image,
                });
            } catch (error)  {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8001/edit-product/${id}`, product);
            console.log(res.data)
            navigate('/about');
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div>
            <h1>แก้ไขสินค้า</h1>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>id:</label>
                    <input type="number" name="id" value={product.id} onChange={handleChange} required />
                </div>
                <div>
                    <label>ชื่อสินค้า:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>ราคา:</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>จำนวน:</label>
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                </div>
                <div>
                    <label>URL รูปภาพ:</label>
                    <input type="text" name="image" value={product.image} onChange={handleChange} required />
                </div>
                <button type="submit">บันทึกการเปลี่ยนแปลง</button>
                <button type="button" onClick={handleBack} className="back-button">ย้อนกลับ</button>
            </form>
        </div>
    );
};

export default EditProduct;
