import React, { useState } from 'react';
import  {Link } from 'react-router-dom';
import api from '../api';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    desc: '',
    price: '',
    src: '',
    href: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', product); 
      setSubmitted(true);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className='add-product--container'>
      {submitted ? (
        <div className="submitted--product">
          <h1>Product has been added!</h1>
          <i className="bi bi-check-circle"></i>
          <Link className="btn form--btn" to="/dashboard">Return to Dashboard</Link>
        </div>
      ) : (
        <div className="form-container">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit} className="product-form" method="POST">
            <div id="product-card" className="product-input-group row">
              <div className="col-6">
                <div className="input-field">
                  <i className="bi bi-box-seam"></i>
                  <input
                    className="product-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-field">
                  <i className="bi bi-currency-dollar"></i>
                  <input
                    className="product-input"
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="input-field">
                  <i className="bi bi-image"></i>
                  <input
                    className="product-input"
                    type="text"
                    id="src"
                    name="src"
                    placeholder="Image URL"
                    value={product.src}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div id="description-box" className="input-field">
                  <i className="bi bi-card-text"></i>
                  <textarea
                    className="product-input"
                    id="desc"
                    name="desc"
                    rows="4"
                    placeholder="Description"
                    value={product.desc}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <input id="submit-button" type="submit" className="btn form--btn submit" value="Add Product" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

