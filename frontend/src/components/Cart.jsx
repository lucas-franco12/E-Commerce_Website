import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart } = useCart();

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
                                    <button onClick={() => removeFromCart(product.id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cart--options">
                        {/* <button onClick={clearCart}>Clear Cart</button> */}
                        <Link to="/products" className="form--btn">Continue Shopping</Link>
                        <Link to="/checkout" className="form--btn">Proceed to Checkout</Link>
                    </div>
                </div>
        )}
        </div>
    );
}


