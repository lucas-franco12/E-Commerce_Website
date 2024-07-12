import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();

    const handleRemoveFromCart = async (productId) => {
        try {
          await api.delete(`/cart/${productId}`);
          removeFromCart(productId);
        } catch (err) {
          console.error('Error removing cart item', err);
        }
      };
    
      const handleClearCart = async () => {
        try {
          await api.post('/cart/clear');
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
                                <div key={product.id} className="cart--item">
                                    <img src={product.src} alt={product.name} />
                                    <h2>{product.name}</h2>
                                    <p>{`$${product.price}`}</p>
                                    <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cart--options">
                        <Link to="/products" className="form--btn">Continue Shopping</Link>
                        <button onClick={handleClearCart} className="form--btn">Clear Cart</button>
                        <Link to="/checkout" className="form--btn">Proceed to Checkout</Link>
                    </div>
                </div>
        )}
        </div>
    );
}


