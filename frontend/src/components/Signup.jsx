import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function Signup() {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add to database here

    if (userType === 'customer') {
      navigate('/products');
    } else if (userType === 'seller') {
      navigate('/seller-dashboard');
    }
  };

  return (
    <div className="signup--container">
      <div className="form-box">
        <h3 id="title">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div id="signup-card" className="signup-input-group">
            <div className="input-field">
              <i className="bi bi-envelope-fill"></i>
              <input
                className="signup-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="bi bi-lock-fill"></i>
              <input
                className="signup-input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              id="signup-button"
              type="submit"
              className="btn home--btn"
            >
              Sign Up
            </button>
          </div>
        </form>

        <Link className="nav-link" to="/">Back to Main Page</Link>
        <Link className="nav-link" to={`/login/${userType}`}>Already have an account? Login.</Link>
      </div>
    </div>
  );
}