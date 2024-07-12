import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import api from '../api';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, clearCart } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const order = {
        ...formData,
        items: cart
      };
      await api.post('/orders', order);
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      console.error('Error placing order', err);
    }
  };
  return (
    <>
    <div className="banner fixed-top">
      <p>This is a demo site. <strong>Do not</strong> enter sensitive information. No real transactions will occur.</p>
    </div>
    <div className='checkout--container'>
      {orderPlaced ? (
        <div className="order--placed">
          <h1>Order has been placed!</h1>
          <i className="bi bi-check-circle"></i>
          <Link className="btn form--btn" to="/products">Return to Dashboard</Link>
          <Link className="btn form--btn2" to="/orders">View your Orders</Link>
        </div>
      ) : (
        <div className="form-container">
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit} method="POST">
            <div className="checkout-input-group row">
              <div className="col-6">
                <div className="input-field">
                  <i className="bi bi-person-fill"></i>
                  <input
                    className="checkout-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-field">
                  <i className="bi bi-envelope-fill"></i>
                  <input
                    className="checkout-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="input-field">
                  <i className="bi bi-house-fill"></i>
                  <input
                    className="checkout-input"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="input-field">
                  <i className="bi bi-credit-card-fill"></i>
                  <input
                    className="checkout-input"
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-field">
                  <i className="bi bi-calendar-fill"></i>
                  <input
                    className="checkout-input"
                    type="text"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="Expiration Date"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-field">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    className="checkout-input"
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <input id="submit-button" type="submit" className="btn form--btn submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
    </>
  );
}



