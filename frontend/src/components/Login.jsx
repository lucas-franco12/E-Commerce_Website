import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';



export default function Login() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add authentication here

        if (userType === 'customer') {
          navigate('/products');
        } else if (userType === 'seller') {
          navigate('/seller-dashboard');
        }
    };


    return (
        <div className="login--container">
            <div className="form-box">
                <h3 id="title">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div id="login-card" className="login-input-group">
                        <div className="input-field">
                        <i className="bi bi-envelope-fill"></i>
                        <input
                            className="login-input"
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
                            className="login-input"
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
                        id="login-button"
                        type="submit"
                        className="btn home--btn"
                        >
                        Login
                        </button>
                    </div>
                </form>

                <Link className="nav-link main-page--link" to="/">Back to Main Page</Link>
                <Link className="nav-link main-page--link" to={`/signup/${userType}`}>No account? Sign up.</Link>

            </div>
        </div>
    );
}