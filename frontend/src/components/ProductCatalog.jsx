import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import api from '../api';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm]= useState('');
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

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
  }, [])

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productList = filteredProducts.map((product, index) => (
    <ProductCard key={index} product={product} userId={userId} userType='customer'/>
  ));
  

  return (
    <>
    <Navbar userType='customer' userId={userId}/>
    <section className="product--catalog">
        <div className="center--text">
          <h2>Product Catalog</h2>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Add SearchBar */}
        <div className="catalog--content">
          {productList}
        </div>

    </section>
    </>
  );
} 


