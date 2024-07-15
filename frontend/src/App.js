import React, { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerDashboard from './components/SellerDashboard';
import OrderPage from './components/OrderPage';
import AddProduct from './components/AddProduct';
import { CartProvider } from './components/CartContext';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <CartProvider userId={userId}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:userType" element={<Login setUserId={setUserId} />} />
          <Route path="/signup/:userType" element={<Signup setUserId={setUserId} />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<SellerDashboard />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
