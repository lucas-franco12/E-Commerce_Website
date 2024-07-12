import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../api';


export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()

  const viewProduct = (productId) => {
    navigate(`/product/${productId}`);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('orders');
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      }
    }

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="orders">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <div>
            <p>You have no orders</p>
            <Link className='btn form--btn' to="/products">View Catalog</Link>
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
