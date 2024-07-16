
import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';

export default function Cart() {
  const { cart, setCart, removeFromCart, clearCart } = useCart();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(`/cart?userId=${userId}`);
        setCart(response.data);
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
      removeFromCart(productId);
    } catch (err) {
      console.error('Error removing cart item', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await api.post(`/cart/clear?userId=${userId}`);
      clearCart();
    } catch (err) {
      console.error('Error clearing cart', err);
    }
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="cart--container">
            <div className="cart--items">
              {cart.map((product) => (
                <div key={product._id} className="cart--item">
                  <img src={product.product.src} alt={product.product.name} />
                  <h2>{product.product.name}</h2>
                  <p>{`$${product.product.price}`}</p>
                  <button onClick={() => handleRemoveFromCart(product.product._id)}>Remove</button>
                </div>
              ))}
            </div>
          </div>

                    <div className="cart--options">
                      <Link to={`/products?userId=${userId}`} className="form--btn">Continue Shopping</Link>
                      <button onClick={handleClearCart} className="form--btn">Clear Cart</button>
                      <Link to={`/checkout?userId=${userId}`} className="form--btn">Proceed to Checkout</Link>
                    </div>
                </div>
        )}
        </div>
    );
}


