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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<SellerDashboard />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
