import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import orders from '../orders';

export default function OrderPage() {

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
                    <button className="btn form--btn2" onClick={() => alert('Cannot view product')}>View</button>
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
