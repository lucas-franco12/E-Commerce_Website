import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children, userId }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return; // Ensure userId is available
      try {
        const response = await api.get(`/cart?userId=${userId}`);
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart', err);
      }
    };

    fetchCart();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product) => {
    try {
      const response = await api.post('/cart', {
        userId,
        productId: product._id
      });
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
