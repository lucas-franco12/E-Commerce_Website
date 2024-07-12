import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import api from '../api';

export default function Signup({ setUserId }) {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username:'',
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
    try {
      // const response = await api.post(`/signup/${userType}`, formData);
      // setUserId(response.data.userId);
      setUserId(2);
      if (userType === 'customer') {
        navigate('/products');
      } else if (userType === 'seller') {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Signup error', err);
    }
  };

  return (
    <div className="signup--container">
      <div className="form-box">
        <h3 id="title">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div id="signup-card" className="signup-input-group">
            <div className="input-field">
              <i className="bi bi-person-fill"></i>
              <input
                className="signup-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
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