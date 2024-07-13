import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const viewProduct = (productId) => {
    navigate(`/product/${productId}?userId=${userId}`);
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
    <>
      <div className="orders">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <div>
            <p>You have no orders</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Product Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.productName}</td>
                  <td>
                    <button className="btn form--btn2" onClick={viewProduct}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
