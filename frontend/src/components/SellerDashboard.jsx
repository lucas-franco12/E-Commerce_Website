import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import api from '../api';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products for userId:", userId);
        const response = await api.get(`/products/seller?userId=${userId}`);
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [userId]);

  const productList = products && products.map((product, index) => (
    <ProductCard key={index} product={product} userId={userId} userType='seller'/>
  ));

  return (
    <>
    <Navbar userType='seller' userId={userId}/>
    <section className="seller--dashboard">
      <div className="center--text">
        <h2>Welcome to your Dashboard</h2>
      </div>
      { products.length > 0 ? 
        (<div className="dashboard--content">
            {productList}
            <div className="add-product--card">
              <h5>Add Product</h5>
              <Link to={`/add-product?userId=${userId}`}>
                <i className="bi bi-plus-circle"></i>
              </Link>
            </div> 
        </div>
        ) : 
        (<div className="empty--list">
          <h2>No products listed yet!</h2>
          <h4>Let's get started</h4>
          <Link className="form--btn" to={`/add-product?userId=${userId}`}>
            Add Product
          </Link>
        </div>
        )}
    </section>
    </>
  );
}

