import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  console.log("CartProvider userId:", userId);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
      try {
        console.log("Fetching cart for userId:", userId);
        const response = await api.get(`/cart?userId=${userId}`);
        console.log("Fetched cart data:", response.data);
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart', err);
      }
    };

    fetchCart();
  }, [userId]);

  const addToCart = async (product) => {
    console.log("Adding to cart, product:", product);
    try {
      const response = await api.post('/cart', {
        userId: product.userId,
        productId: product._id
      });
      console.log("Added to cart, response data:", response.data);
      setCart(response.data);
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}?userId=${userId}`);
      setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error('Error removing cart item', err);
    }
  };

  const clearCart = async () => {
    try {
      await api.post(`/cart/clear?userId=${userId}`);
      setCart([]);
    } catch (err) {
      console.error('Error clearing cart', err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
