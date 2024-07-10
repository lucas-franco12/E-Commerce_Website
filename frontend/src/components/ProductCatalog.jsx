import React from 'react';
import products from '../products';
import ProductCard from './ProductCard';
import Navbar from './Navbar'

export default function ProductCatalog() {
  const productList = products.map((product, index) => (
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


