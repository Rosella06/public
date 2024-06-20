import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


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
            } catch (error) {
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
        <div className="bg-gray-100 min-h-screen py-6">
            <h1 className="text-center text-amber-500 text-3xl font-bold mt-8">แก้ไขสินค้า</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
                <div className="mb-6">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                        ID:  </label>
                    <input type="number"
                        name="id"
                        value={product.id}
                        onChange={handleChange} required
                        className="input input-bordered w-full" />
                </div>
                <div>
                    <label>ชื่อสินค้า:</label>
                    <input type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange} required
                        className="input input-bordered w-full" />
                </div>
                <div>
                    <label>ราคา:</label>
                    <input type="number"
                        name="price"
                        value={product.price} onChange={handleChange} required
                        className="input input-bordered w-full" />
                </div>
                <div>
                    <label>จำนวน:</label>
                    <input type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange} required
                        className="input input-bordered w-full" />
                </div>
                <div>
                    <label>URL รูปภาพ:</label>
                    <input type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange} required
                        className="input input-bordered w-full" />
                </div>
                <button type="submit" className="btn btn-outline btn-success w-full">
                    บันทึกการเปลี่ยนแปลง
                </button>
                <button type="button" onClick={handleBack} className="btn btn-outline btn-primary w-full">
                    ย้อนกลับ
                </button>

            </form>
        </div>
    );
};

export default EditProduct;
