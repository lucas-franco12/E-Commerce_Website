import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import api from '../api';
import Navbar from './Navbar';

export default function OrderDetailPage() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const userType = queryParams.get('userType'); // Ensure we are getting the userType
  console.log(userType)


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}?userId=${userId}&userType=${userType}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order details', err);
      }
    };
  
    fetchOrderDetails();
  }, [orderId, userId, userType]);
  


  if (!order) {
    return <div>Loading...</div>;
  }

  const filteredProducts = userType === 'seller' 
    ? order.products.filter(product => product.sellerId === userId)
    : order.products;

    const totalAmount = userType === 'seller'
    ? filteredProducts.reduce((acc, item) => acc + item.product.price, 0)
    : order.amount;

  return (
    <>
    <Navbar userType={userType} userId={userId}/>
    <div className="order--details">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      <h3>Products:</h3>
      <ul>
        {filteredProducts.map((item) => (
          <p key={item.product._id}>
            <Link className="order-detail--product" 
            to={userType === 'seller' 
            ? `/edit-product/${item.product._id}?userId=${userId}`
            : `/products/${item.product._id}?userId=${userId}`}
        >
              {item.product.name} - ${item.product.price}
            </Link>
          </p>
        ))}
      </ul>
      <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
      <p><strong>Delivery Address:</strong> {order.address.detail}</p>
    </div>
    </>
  );
}
