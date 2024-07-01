// import React, { useState} from 'react';
import React from 'react';
import './index.css';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerDashboard from './components/SellerDashboard';
import OrderPage from './components/OrderPage';
// import AddProduct from './components/AddProduct';
import products from './products';
import orders from './orders';
import { CartProvider } from './components/CartContext';

function App() {

  // const [products, setProducts] = useState([]);
  
  // const addProduct = (product) => {
  //   const updatedProducts = [...products, product];
  //   setProducts(updatedProducts);
  //   localStorage.setItem('products', JSON.stringify(updatedProducts));
  // };

  return (
    <CartProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:id" element={<ProductDetail products={products} />} />
          {/* <Route path="/add-product" element={<AddProduct addProduct={addProduct}/>} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<SellerDashboard products={products} />} />
          <Route path="/orders" element={<OrderPage order={orders}/>} />
        </Routes>
      </div>
    </CartProvider>
  )
  }

export default App;
