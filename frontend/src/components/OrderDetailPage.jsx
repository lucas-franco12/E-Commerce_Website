import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../api';

export default function OrderDetailPage() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}?userId=${userId}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order details', err);
      }
    };

    fetchOrderDetails();
  }, [orderId, userId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      <h3>Products:</h3>
      <ul>
        {order.products.map(product => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <p><strong>Total Amount:</strong> ${order.amount}</p>
      <p><strong>Delivery Address:</strong> {order.address}</p>
    </div>
  );
}
