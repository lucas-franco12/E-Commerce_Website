import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditProduct() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const [product, setProduct] = useState({
    name: '',
    desc: '',
    price: '',
    src: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

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
      await api.put(`/products/${id}`, { ...product, userId });
      setSubmitted(true);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${id}`);
      navigate(`/dashboard?userId=${userId}`);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className='add-product--container'>
      {submitted ? (
        <div className="submitted--product">
          <h1>Product has been updated!</h1>
          <i className="bi bi-check-circle"></i>
          <Link className="btn form--btn" to={`/dashboard?userId=${userId}`}>Return to Dashboard</Link>
        </div>
      ) : (
        <div className="form-container">
          <h2>Edit Product</h2>
          {deleteProduct ? (
            <div className="submitted--product">
              <p>Are you sure you want to delete {product.name}?</p>
              <div className="btn delete--btn" onClick={handleDelete}>Yes, delete product.</div>
              <div className="btn form--btn" onClick={() => setDeleteProduct(false)}>No, keep product.</div>
            </div>
          ) : (
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
                <input id="submit-button" type="submit" className="btn form--btn" value="Update Product" />
              </div>
            </form>
          )}
          {!deleteProduct && (
            <input id="delete-button" type="submit" className="btn delete--btn" onClick={() => setDeleteProduct(true)} value="Delete Product" />
          )}
        </div>
      )}
    </div>
  );
}
