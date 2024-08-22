
import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';
import Navbar from './Navbar';

export default function Cart() {
  const { cart, setCart, removeFromCart, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(`/cart?userId=${userId}`);
        setCart(response.data);
        calculateTotal(response.data);
      } catch (err) {
        console.error('Error fetching cart', err);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId, setCart]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}?userId=${userId}`);
      removeFromCart(productId)
      const updatedCart = cart.filter(item => item.product._id !== productId);
      setCart(updatedCart);
      calculateTotal(updatedCart);
    } catch (err) {
      console.error('Error removing cart item', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await api.post(`/cart/clear?userId=${userId}`);
      clearCart();
      setTotal(0);
    } catch (err) {
      console.error('Error clearing cart', err);
    }
  }; 

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((total, item) => total + item.product.price, 0);
    setTotal(totalAmount);
  };

  return (
    <>
      <Navbar userType='customer' userId={userId}/>
      <div className="cart">
          <h1>Your Cart</h1>
          {cart.length === 0 ? (
            <div className="empty--items">
              <p className="empty--message">No orders yet!</p>
              <Link to={`/products?userId=${userId}`} className="form--btn">Continue Shopping</Link>
            </div>
          ) : (
            <div>
              <table className="table">
                <tbody>
                  {cart.map((product) => (
                    <tr key={product._id}>
                      <td><img className="cart--img" src={product.product.src} alt={product.product.name} /></td>
                      <td>{product.product.name}</td>
                      <td>{`$${product.product.price}`}</td>
                      <td>
                        <i className="bi bi-trash cart--delete" onClick={() => handleRemoveFromCart(product.product._id)}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> 

              <div className="cart--options">
                <p><strong>Total Cost:</strong></p>
                <p><strong>{`$${total}`}</strong></p>
              </div>

              <div className="cart--options">
                <Link to={`/products?userId=${userId}`} className="form--btn">Continue Shopping</Link>
                <div onClick={handleClearCart} className="form--btn">Clear Cart</div>
                <Link to={`/checkout?userId=${userId}`} className="form--btn">Proceed to Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </>
    );
}


