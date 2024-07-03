import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/Shopee.svg.png';
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';

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
  const THEMES = [
    "light", "dark",];
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
    const confirmed = window.confirm();
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8001/api/product/${productId}`);
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


  const [theme, setTheme] = React.useState('light');
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleThemeChange = (e: any) => {
    const val = e.target.getAttribute('data-set-theme');
    setTheme(val);
  };


  return (
    <div>
      <nav className='nav bg-orange-500 px-10 shadow-md relative'>
        <div>
          <header className='py-1 sticky top-0 z-50 '>
            <div className='container'>
              <div className='navbar px-0 '>
                <div className='p-1 flex items-center justify-between '>
                  <div className='logo md:w-[300px] sm:w-[300px]'>
                    <img src={logo} alt='Shopee Logo' className='w-48' />
                  </div>
                  <div>
                    <div>
                      <input
                        type='text'
                        className='sidebar-search max-w-md px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500'
                        placeholder='Search..'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='dropdown'>
                  <label tabIndex={0} className='btn btn-circle border-t-2 border-b-2 border-l-2 border-r-2 rounded-md  md:hidden mr-1 '>
                    <i className="fa-solid fa-bars"></i>
                  </label>
                  <ul className='dropdown-content mt-2 w-30 menu menu-compact p-2 bg-base-200 shadow rounded-box '>
                    <li>
                      <Link to='/resume'>Resume</Link>
                    </li>
                    <li>
                      <Link to='/about'>Shopee</Link>
                    </li>
                    <li>
                      <Link to='/add-product'>Add Product</Link>
                    </li>
                    <li>
                      <Link to='/' onClick={logout} className=''>
                        Log Out
                      </Link>
                    </li>
                   
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn">
                        {THEMES.length} Themes
                      </label>
                      <ul className="dropdown-content mt-1 w-52 max-h-96 overflow-y-auto menu menu-compact p-2 bg-base-200 shadow rounded-box">
                        {THEMES.map((theme, i) => (
                          <li key={theme + i}>
                            <button data-set-theme={theme} onClick={handleThemeChange} className="font-medium capitalize">
                              {i + 1}. {theme}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ul>
                </div>
                
                

                <div className='navbar-center hidden md:flex justify-end px-10'>
                  <ul className='menu menu-horizontal p-0 font-medium space-x-5 '>
                    <li className='ml-auto'>
                      <Link to='/resume' className='text-white hover:text-gray-200 text-xl'>
                        Resume
                      </Link>
                    </li>
                    <li>
                      <Link to='/about' className='text-white hover:text-gray-200 text-xl'>
                        Shopee
                      </Link>
                    </li>
                    <li>
                      <Link to='/add-product' className='text-white hover:text-gray-200 text-xl'>
                        Add Product
                      </Link>
                    </li>
                    <li className='relative'>
                      <button
                        className='text-white hover:text-gray-200 focus:outline-none text-xl'
                        onClick={() => {
                          if (openModal.current) {
                            openModal.current.showModal();
                          }
                        }}
                      >
                        <i className='fas fa-shopping-cart text-2xl'></i>
                        {cart.length > 0 && (
                          <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
                            {cart.length}
                          </span>
                        )}
                      </button>
                    </li>
                    <li className=''>
                      <Link to='/' onClick={logout} className='text-white hover:text-gray-200 focus:outline-none text-xl'>
                        Log Out
                      </Link>
                    </li>
                  </ul>
                  <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn">
                        {THEMES.length} Themes
                      </label>
                      <ul className="dropdown-content mt-1 w-52 max-h-96 overflow-y-auto menu menu-compact p-2 bg-base-200 shadow rounded-box">
                        {THEMES.map((theme, i) => (
                          <li key={theme + i}>
                            <button data-set-theme={theme} onClick={handleThemeChange} className="font-medium capitalize">
                              {i + 1}. {theme}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              
            </div>
          </header>
        </div>
      </nav>




      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={openModal} className="modal fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-60">

        <div className="modal-page bg-white p-4 rounded-lg shadow-lg max-w-sm w-full ">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 ">ตะกร้าสินค้า</h2>
          <div className="cartlist max-h-96 overflow-y-auto">
            {cart.map((x: CartItem) => {
              const currentProduct = products.find(f => f.p_id === x.id);
              if (currentProduct) {
                return (
                  <div className="cartlist-items border border-gray-300 p-3 rounded-lg flex items-center justify-between mb-6" key={x.id}>
                    <div className="cartlist-left flex items-center">
                      <img src={currentProduct.p_image} alt={currentProduct.p_product_name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                      <div className="cartlist-detail">
                        <p className="font-semibold text-gray-900">{currentProduct.p_product_name}</p>
                        <p className="text-sm text-gray-700">ราคา: {currentProduct.p_price}B</p>
                        <p className="text-sm text-gray-700">จำนวนคงเหลือ: {currentProduct.p_quantity}</p>
                      </div>
                    </div>
                    <div className="cartlist-right text-right">
                      <p className="text-sm text-gray-700">จำนวน: {x.sum}</p>
                      <button className=" bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md" onClick={() => handleIncreaseQuantity(x.id)}><i className="fa-solid fa-plus"></i></button>
                      <button className=" bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md" onClick={() => handleDecreaseQuantity(x.id)}><i className="fa-solid fa-minus"></i></button>
                      <button className="btn-remove bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md" onClick={() => handleRemoveFromCart(x.id)}><i className="fas fa-trash"></i></button>
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

      <div className=' p-4 flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 lg:gap-8 xl:gap-10 '>
        {filter.map((e: Product) => (
          <div key={e.p_id} className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-[400px]  xl:w-[320px] sm:w-[300px] md:w-[250px] ">
            <div className="card-body items-center text-center gap-4 ">
              <div className='product-items border border-gray-300 p-4 rounded-lg text-center bg-white w-[350px] xl:w-[250px]  sm:w-[250px] md:w-[200px]   '>
                <img src={e.p_image} alt={e.p_product_name} className='card w-48 h-48 bg-base-100 shadow-xl object-cover mx-auto rounded-lg' />
                <br></br>
                <p className='text-sm text-gray-700 mb-1'>ID: {e.p_id}</p>
                <p className='product-name text-lg text-gray-900 mb-2'>{e.p_product_name}</p>
                <p className='text-sm text-gray-700 mb-2'>ราคาสินค้า: {e.p_price}B</p>
                <p className='text-sm text-gray-700'>จำนวนคงเหลือ: {e.p_quantity}</p>
                <div className='button-group mt-2.5'>
                  <Link to={`/edit-product/${e.p_id}`} className='edit-link text-yellow-500 hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-md'>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button className='edit-link text-orange-400 hover:bg-orange-400 hover:text-white px-2 py-1 rounded-md' onClick={() => handleAddToCart(e)}>
                    <i className="fas fa-shopping-basket"></i>
                  </button>
                  <button onClick={() => handleDelete(e.p_id)} className='edit-link text-red-600 hover:bg-red-600 hover:text-white px-2 py-1 rounded-md'>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
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
    </div >
  );
};

export default About;

