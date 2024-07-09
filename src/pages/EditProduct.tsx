import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        p_id: 0,
        p_product_name: '',
        p_price: 0,
        p_quantity: 0,
        p_image: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/api/product/${id}`);
                setProduct({
                    p_id: res.data.data.p_id,
                    p_product_name: res.data.data.p_product_name,
                    p_price: res.data.data.p_price,
                    p_quantity: res.data.data.p_quantity,
                    p_image: res.data.data.p_image,
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setProduct({ ...product, p_product_name: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8001/api/product/edit-product/${id}`, product);
            console.log(res.data.data)
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (<div className='flex   justify-center'>
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-1 max-w-lg ">
            <div className="text-xl font-semibold text-primary">แก้ไขสินค้า</div>
            <div className="divider mt-2"></div>
            <div className="h-full w-full pb-6 bg-base-100">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="id" className="label-text text-base-content"> ID:  </label>
                        <input type="number"
                            name="id"
                            value={product.p_id}
                            onChange={handleChange} required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="product-name" className="label-text text-base-content">ชื่อสินค้า:</label>
                        <input
                            type="text"
                            id="product-name"
                            name="product-name"
                            value={product.p_product_name}
                            onChange={(e) => {
                                if (e.target.value.length <= 45) {
                                    setProduct({ ...product, p_product_name: e.target.value });
                                }
                            }}
                            maxLength={45}
                            required
                            className={`input input-bordered w-full ${product.p_product_name.length >= 45 ? 'border-red-500' : ''}`}
                        />
                        {product.p_product_name.length >= 45 && (
                            <p className="text-red-500 text-sm mt-1">คุณพิมพ์ครบ 45 ตัวอักษรแล้ว</p>
                        )}
                    </div>
                    <div>
                        <label>ราคา:</label>
                        <input type="number"
                            name="price"
                            value={product.p_price} onChange={(e) => setProduct({ ...product, p_price: Number(e.target.value) })} required
                            className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label>จำนวน:</label>
                        <input type="number"
                            name="quantity"
                            value={product.p_quantity}
                            onChange={(e) => setProduct({ ...product, p_quantity: Number(e.target.value) })} required
                            className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label>URL รูปภาพ:</label>
                        <input type="text"
                            name="image"
                            value={product.p_image}
                            onChange={(e) => setProduct({ ...product, p_image: e.target.value })} required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="mt-5 ">
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-success ">
                                บันทึกการเปลี่ยนแปลง
                            </button>
                        </div>
                        <button type="button" onClick={handleBack} className="btn btn-primary ">
                            ย้อนกลับ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    );
};

export default EditProduct;
