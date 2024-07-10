import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Navbar from './Navbar';

export default function SellerDashboard({ products }) {

    console.log(products)
    
  const productList = products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));

  return (
    <>
      <Navbar userType='customer'/>
    <section className="seller--dashboard">
      <div className="center--text">
        <h2>Welcome to your Dashboard</h2>
      </div>
      { products.length > 0 ? 
        (<div className="dashboard--content">
            {productList}
            <div className="add-product--card">
              <h5>Add Product</h5>
              <Link to="/add-product">
                <i className="bi bi-plus-circle"></i>
              </Link>
            </div> 
        </div>
        ) : 
        (<div className="empty--list">
          <h2>No products listed yet!</h2>
          <h4>Let's get started</h4>
          <Link className="form--btn" to="/add-product">
            Add Product
          </Link>
        </div>
        )}
    </section>
    </>
  );
}
