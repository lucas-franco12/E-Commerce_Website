import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import api from '../api';

export default function ProductCatalog() {
  
  const { products, setProducts } = useState([]);

  useEffect(() => {
    async function fetchProducts(){
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch(err) {
        console.error('Could not fetch products', err);
      }
    }
    fetchProducts();
  }, [setProducts])

  
  const productList = products && products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));
  

  return (
    <>
    <Navbar userType='customer'/>
    <section className="product--catalog">
        <div className="center--text">
          <h2>Product Catalog</h2>
        </div>

        <div className="catalog--content">
          {productList}
        </div>

    </section>
    </>
  );
}


