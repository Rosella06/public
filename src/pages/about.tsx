import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/Shopee.svg.png';
import '@fortawesome/fontawesome-free/css/all.css';

interface Product {
  p_id: number,
  p_product_name: string,
  p_quantity: number,
  p_price: number,
  p_image: string
}

interface CartItem {
  id: number;
  sum: number;
}

const About = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartVisible, setCartVisible] = useState(false);

  const openModal = useRef<HTMLDialogElement>(null)

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/product');
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const isLoggedIn = localStorage.getItem('signUp') !== null;
    if (!isLoggedIn) {
      navigate('/');
    }
    const cartLocalStorage = localStorage.getItem('cart');
    if (cartLocalStorage) {
      const cartData = JSON.parse(cartLocalStorage);
      setCart(cartData);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartIndex = cart.findIndex((x) => x.id === product.p_id);
    if (cartIndex === -1) {
      const updatedCart = [...cart, { id: product.p_id, sum: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      const newCart = [...cart];
      newCart[cartIndex].sum += 1;
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    const newCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleIncreaseQuantity = (productId: number) => {
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, sum: item.sum + 1 };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleDecreaseQuantity = (productId: number) => {
    const newCart = cart
      .map((item) => {
        if (item.id === productId && item.sum > 1) {
          return { ...item, sum: item.sum - 1 };
        }
        return item;
      })
      .filter((item) => item.sum > 0);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleDelete = async (productId: number) => {
    const confirmed = window.confirm('คุณแน่ใจหรือไม่ที่ต้องการลบสินค้านี้?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8001/product/${productId}`);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('signUp');
    navigate('/');
  };

  const filter = products.filter((s) => s.p_product_name.includes(search) || s.p_price.toString().includes(search));

  return (
    <div>
      <nav className='nav bg-orange-500 py-5 px-10 shadow-md relative'>
        <div className='flex items-center justify-between'>
          <button className='btn-hamburger'></button>
          <div className='logo'>
            <img src={logo} alt='Shopee Logo' className='w-48' />
          </div>
          <div className='sidebar flex-grow text-center'>
            <input
              type='text'
              className='sidebar-search w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500'
              placeholder='Search..'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className='bars flex items-center space-x-4'>
            <li>
              <Link to='/resume' className='text-white hover:text-gray-200 text-lg'>Resume</Link>
            </li>
            <li>
              <Link to='/about' className='text-white hover:text-gray-200 text-lg'>Shopee</Link>
            </li>
            <li>
              <Link to='/add-product' className='text-white hover:text-gray-200 text-lg'>Add Product</Link>
            </li>
            <li className='indicator'>
              <i className='fas fa-shopping-cart text-white' aria-hidden='true' onClick={() => {
                if (openModal.current) {
                  openModal.current.showModal()
                }
              }}></i>
              {cart.length > 0 && (
                <span className='badge badge-sm indicator-item bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
                  {cart.length}
                </span>
              )}
            </li>
            <li>
              <Link to='/' onClick={logout} className='LogOut text-white hover:text-gray-200 text-lg'>Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={openModal} className="modal fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-60">

        <div className="modal-page bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">ตะกร้าสินค้า</h2>
          <div className="cartlist max-h-96 overflow-y-auto">
            {cart.map((x: CartItem) => {
              const currentProduct = products.find(f => f.p_id === x.id);
              if (currentProduct) {
                return (
                  <div className="cartlist-items border border-gray-300 p-4 rounded-lg flex items-center justify-between mb-4" key={x.id}>
                    <div className="cartlist-left flex items-center">
                      <img src={currentProduct.p_image} alt={currentProduct.p_product_name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                      <div className="cartlist-detail">
                        <p className="font-semibold text-gray-900">ชื่อสินค้า: {currentProduct.p_product_name}</p>
                        <p className="text-sm text-gray-700">ราคา: {currentProduct.p_price}B</p>
                        <p className="text-sm text-gray-700">จำนวนคงเหลือ: {currentProduct.p_quantity}</p>
                      </div>
                    </div>
                    <div className="cartlist-right text-right">
                      <p className="text-sm text-gray-700">จำนวน: {x.sum}</p>
                      <button className="btn bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md" onClick={() => handleIncreaseQuantity(x.id)}>+</button>
                      <button className="btn bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md" onClick={() => handleDecreaseQuantity(x.id)}>-</button>
                      <button className="btn-remove bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md" onClick={() => handleRemoveFromCart(x.id)}>ลบจากตะกร้า</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="modal-action mt-4 flex justify-center space-x-4">
            <form method="dialog">
              <button className="btn btn-primary" onClick={() => setCartVisible(false)}>ปิด</button>

            </form>
            <button className="btn">ซื้อสินค้า</button>

          </div>
        </div>
      </dialog>

      <div className='product grid grid-cols-1 md:grid-cols-5 gap-4 mt-8'>
        {filter.map((e: Product) => (
          <div className='product-items border border-gray-300 p-4 rounded-lg text-center bg-white' key={e.p_id}>
            <img src={e.p_image} alt={e.p_product_name} className='card w-48 h-48 bg-base-100 shadow-xl object-cover mx-auto rounded-lg' />

            <p className='text-sm font-semibold text-gray-700'>ID: {e.p_id}</p>
            <p className='product-name text-lg text-gray-900 mb-2'>{e.p_product_name}</p>
            <p className='text-sm text-gray-700'>ราคาสินค้า: {e.p_price}B</p>
            <p className='text-sm text-gray-700'>จำนวนคงเหลือ: {e.p_quantity}</p>
            <div className='button-group mt-4'>
              <Link to={`/edit-product/${e.p_id}`} className='edit-link text-yellow-500 hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-md'>แก้ไข</Link>
              <button className='edit-link text-orange-400 hover:bg-orange-400 hover:text-white px-2 py-1 rounded-md' onClick={() => handleAddToCart(e)}>
                เพิ่มลงตะกร้า
              </button>
              <button onClick={() => handleDelete(e.p_id)} className='edit-link text-red-600 hover:bg-red-600 hover:text-white px-2 py-1 rounded-md'>
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* {isCartVisible && (
        <div className='z-100 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60'>
          <div onClick={() => setCartVisible(false)} className='modal-ba absolute top-0 left-0 w-full h-full cursor-pointer'></div>
          <div className='modal-page bg-white rounded-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4 text-gray-900'>ตะกร้าสินค้า</h2>
            <div className='cartlist max-h-96 overflow-y-auto'>
              {cart.map((x: CartItem) => {
                const currentProduct = products.find(f => f.id === x.id);
                if (currentProduct) {
                  return (
                    <div className='cartlist-items border border-gray-300 p-4 rounded-lg flex items-center justify-between mb-4' key={x.id}>
                      <div className='cartlist-left flex items-center'>
                        <img src={currentProduct.image} alt={currentProduct.name} className='w-16 h-16 object-cover rounded-lg mr-4' />
                        <div className='cartlist-detail'>
                          <p className='font-semibold text-gray-900'>ชื่อสินค้า: {currentProduct.name}</p>
                          <p className='text-sm text-gray-700'>ราคา: {currentProduct.price}B</p>
                          <p className='text-sm text-gray-700'>จำนวนคงเหลือ: {currentProduct.quantity}</p>
                        </div>
                      </div>
                      <div className='cartlist-right text-right'>
                        <p className='text-sm text-gray-700'>จำนวน: {x.sum}</p>
                        <button className='btn bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md' onClick={() => handleIncreaseQuantity(x.id)}>+</button>
                        <button className='btn bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md' onClick={() => handleDecreaseQuantity(x.id)}>-</button>
                        <button className='btn-remove bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => handleRemoveFromCart(x.id)}>ลบจากตะกร้า</button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className='btn-control mt-auto pt-4 flex justify-center'>
              <button className='btn bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md mr-4' onClick={() => setCartVisible(false)}>ปิด</button>
              <button className='btn-buy bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-md'>ซื้อสินค้า</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default About;

