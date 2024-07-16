import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const viewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}?userId=${userId}`);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders?userId=${userId}`);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      }
    }

    fetchOrders();
  }, [userId]);

  return (
      <div className="orders">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
            <p className="empty--message">You have no orders</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn form--btn2" onClick={() => viewOrderDetails(order._id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
        )}
      </div>
  );
}
