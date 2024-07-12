import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import api from '../api';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);
    
    
  const productList = products && products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));

  return (
    <>
    <Navbar userType='seller'/>
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
