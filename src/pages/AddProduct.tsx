import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


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
            const newProduct = { p_product_name: name, p_price: price, p_quantity: quantity, p_image: image };
            const response = await axios.post('http://localhost:8001/api/product/add-product', newProduct);
            console.log(response)
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 3000);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    const handleBack = () => {
        navigate(-1);
    };
    // const validateImageUrl = (url: string) => {
    //     const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    //     return pattern.test(url);
    // }.

    const handleChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        if (value.length < 46) {
            setName(value);
        }
    };

    return (
        <div>
            {isAdded && <p className="success-messages">สินค้าถูกเพิ่มเรียบร้อยแล้ว</p>}
            <nav className=' p-3 flex justify-between items-center'>
                <div className='nav-contents'>
                </div>
                <ul className='barss flex space-x-6'>
                    <li><Link to="/resume" className="btn btn-outline border-t-2  text-primary  ">Resume</Link></li>
                    <li><Link to="/" className="btn btn-outline border-t-2  text-primary  ">Shopee</Link></li>
                </ul>
            </nav>
            <div className='flex   justify-center'>
                <div className="card w-full p-6 bg-base-100 shadow-xl mt-1 max-w-lg text-primary">
                    <div className='text-xl font-semibold '>Add New Product</div>
                    <div className="divider mt-2"></div>
                    <div className="h-full w-full pb-6 bg-base-100">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="id" className="label-text text-base-content">ID:</label>
                                <input
                                    type="number"
                                    id="id"
                                    value={id}
                                    onChange={(e) => setid(parseInt(e.target.value))}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="name" className="label-text text-base-content">ชื่อสินค้า:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={handleChange}
                                    required
                                    className={`input input-bordered w-full ${name.length >= 45 ? 'border-red-500' : ''}`}
                                />
                                {name.length >= 45 && (
                                    <p className="text-red-500 text-sm mt-1">คุณพิมพ์ครบ 45 ตัวอักษรแล้ว</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="label-text text-base-content">ราคาสินค้า:</label>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="quantity" className="label-text text-base-content">จำนวนคงเหลือ:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="image" className="label-text text-base-content">ลิงก์รูปภาพ:</label>
                                <input
                                    type="text"
                                    id="image"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className=' btn btn-primary '>เพิ่มสินค้า</button>
                            </div>
                            <button type="button" onClick={handleBack} className="btn border-neutral-600">
                                ย้อนกลับ
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default AddProduct;
