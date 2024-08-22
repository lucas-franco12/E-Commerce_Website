// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useCart } from './CartContext';
// import api from '../api';

// export default function Checkout() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     cardNumber: '',
//     expirationDate: '',
//     cvv: ''
//   });

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const { cart, clearCart } = useCart();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   }; 

//   const calculateTotalAmount = () => {
//     return cart.reduce((total, item) => total + item.product.price, 0);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const order = {
//         userId,
//         products: cart.map(item => ({
//           product: item.product._id,
//           sellerId: item.product.createdBy
//         })),
//         amount: calculateTotalAmount(),
//         address: { detail: formData.address },
//       };
//       console.error('Placing order', order);
//       await api.post('/orders', order);
//       clearCart();
//       setOrderPlaced(true);
//     } catch (err) {
//       console.error('Error placing order', err);
//     }
//   };

//   return (
//     <>
//     <div className="banner fixed-top">
//       <p>This is a demo site. <strong>Do not</strong> enter sensitive information. No real transactions will occur.</p>
//     </div>
//     <div className='checkout--container'>
//       {orderPlaced ? (
//         <div className="order--placed">
//           <h1>Order has been placed!</h1>
//           <i className="bi bi-check-circle"></i>
//           <Link className="btn form--btn" to={`/products?userId=${userId}`}>Return to Products</Link>
//           <Link className="btn form--btn2" to={`/orders?userId=${userId}&userType=customer`}>View your Orders</Link>
//         </div>
//       ) : (
//         <div className="form-container">
//           <h2>Checkout</h2>
//           <form onSubmit={handleSubmit} method="POST">
//             <div className="checkout-input-group row">
//               <div className="col-6">
//                 <div className="input-field">
//                   <i className="bi bi-person-fill"></i>
//                   <input
//                     className="checkout-input"
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="input-field">
//                   <i className="bi bi-envelope-fill"></i>
//                   <input
//                     className="checkout-input"
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-12">
//                 <div className="input-field">
//                   <i className="bi bi-house-fill"></i>
//                   <input
//                     className="checkout-input"
//                     type="text"
//                     id="address"
//                     name="address"
//                     placeholder="Address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-12">
//                 <div className="input-field">
//                   <i className="bi bi-credit-card-fill"></i>
//                   <input
//                     className="checkout-input"
//                     type="text"
//                     id="cardNumber"
//                     name="cardNumber"
//                     placeholder="Card Number"
//                     value={formData.cardNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="input-field">
//                   <i className="bi bi-calendar-fill"></i>
//                   <input
//                     className="checkout-input"
//                     type="text"
//                     onFocus={(e) => (e.target.type = 'date')}
//                     onBlur={(e) => (e.target.type = 'text')}
//                     id="expirationDate"
//                     name="expirationDate"
//                     placeholder="Expiration Date"
//                     value={formData.expirationDate}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-6">
//                 <div className="input-field">
//                   <i className="bi bi-lock-fill"></i>
//                   <input
//                     className="checkout-input"
//                     type="text"
//                     id="cvv"
//                     name="cvv"
//                     placeholder="CVV"
//                     value={formData.cvv}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//             <input id="submit-button" type="submit" className="btn form--btn submit" value="Submit" />
//           </form>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }



// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useCart } from './CartContext';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import Navbar from './Navbar';

// export default function Checkout() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get('userId');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//   });

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const { cart, clearCart } = useCart();
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const calculateTotalAmount = () => {
//     return cart.reduce((total, item) => total + item.product.price, 0);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const totalAmount = calculateTotalAmount();

//     try {
//       const { data } = await axios.post('/api/create-payment-intent', { amount: totalAmount });

//       const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: formData.name,
//             email: formData.email,
//           },
//         },
//       });

//       if (paymentResult.error) {
//         console.error('Payment failed:', paymentResult.error.message);
//       } else {
//         console.log('Payment succeeded!');

//         const order = {
//           userId,
//           products: cart.map(item => ({
//             product: item.product._id,
//             sellerId: item.product.createdBy
//           })),
//           amount: totalAmount,
//           address: { detail: formData.address },
//         };

//         await axios.post('/api/orders', order);
//         clearCart();
//         setOrderPlaced(true);
//       }
//     } catch (err) {
//       console.error('Error processing payment or placing order', err);
//     }
//   };

//   return (
//     <>
//       <Navbar userType='customer' userId={userId}/>
//       <div className="banner fixed-top">
//         <p>This is a demo site. <strong>Do not</strong> enter sensitive information. No real transactions will occur.</p>
//       </div>
//       <div className='checkout--container'>
//         {orderPlaced ? (
//           <div className="order--placed">
//             <h1>Order has been placed!</h1>
//             <i className="bi bi-check-circle"></i>
//             <Link className="btn form--btn" to={`/products?userId=${userId}`}>Return to Products</Link>
//             <Link className="btn form--btn2" to={`/orders?userId=${userId}&userType=customer`}>View your Orders</Link>
//           </div>
//         ) : (
//           <div className="form-container">
//             <h2>Checkout</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="checkout-input-group row">
//                 <div className="col-6">
//                   <div className="input-field">
//                     <i className="bi bi-person-fill"></i>
//                     <input
//                       className="checkout-input"
//                       type="text"
//                       id="name"
//                       name="name"
//                       placeholder="Full Name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-6">
//                   <div className="input-field">
//                     <i className="bi bi-envelope-fill"></i>
//                     <input
//                       className="checkout-input"
//                       type="email"
//                       id="email"
//                       name="email"
//                       placeholder="Email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="input-field">
//                     <i className="bi bi-house-fill"></i>
//                     <input
//                       className="checkout-input"
//                       type="text"
//                       id="address"
//                       name="address"
//                       placeholder="Address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="input-field">
//                     <CardElement />
//                   </div>
//                 </div>
//               </div>
//               <input id="submit-button" type="submit" className="btn form--btn submit" value="Submit" />
//             </form>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from './Navbar';
import api from '../api';

export default function Checkout() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.product.price, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalAmount();

    try {
      // Step 1: Create a Payment Intent on the backend
      const { data } = await api.post('/create-payment-intent', { amount: totalAmount });

      // Step 2: Confirm the payment on the frontend
      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (paymentResult.error) {
        console.error('Payment failed:', paymentResult.error.message);
      } else {
        console.log('Payment succeeded!');

        // Step 3: After successful payment, create the order
        const order = {
          userId,
          products: cart.map((item) => ({
            product: item.product._id,
            sellerId: item.product.createdBy,
          })),
          amount: totalAmount,
          address: { detail: formData.address },
        };

        await api.post('/orders', order);
        clearCart();  // Clear the cart after placing the order
        setOrderPlaced(true);
      }
    } catch (err) {
      console.error('Error processing payment or placing order', err);
    }
  };

  return (
    <>
      <Navbar userType="customer" userId={userId} />
      <div className="banner fixed-top">
        <p>
          This is a demo site. <strong>Do not</strong> enter sensitive information. No real transactions will occur.
        </p>
      </div>
      <div className="checkout--container">
        {orderPlaced ? (
          <div className="order--placed">
            <h1>Order has been placed!</h1>
            <i className="bi bi-check-circle"></i>
            <Link className="btn form--btn" to={`/products?userId=${userId}`}>
              Return to Products
            </Link>
            <Link className="btn form--btn2" to={`/orders?userId=${userId}&userType=customer`}>
              View your Orders
            </Link>
          </div>
        ) : (
          <div className="form-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
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
                    <CardElement className="StripeElement"/>
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
