import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ setUserId }) {
    const { userType } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
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
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const firebaseUserId = userCredential.user.uid;

            const response = await api.post(`/login/${userType}`, { email: formData.email, password: formData.password, firebaseUserId });
            const userId = response.data.userId;
            setUserId(userId);

            if (userType === 'customer') {
                navigate(`/products?userId=${userId}`);
            } else if (userType === 'seller') {
                navigate(`/dashboard?userId=${userId}`);
            }
        } catch (err) {
            console.error('Login error', err);
            alert('An error occurred. Please try again.');
        }
    };


    return (
        <div className="login--container">
            <div className="form-box">
                <h3 id="title">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div id="login-card" className="login-input-group">
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

                <Link className="nav-link" to="/">Back to Main Page</Link>
                <Link className="nav-link" to={`/signup/${userType}`}>No account? Sign up.</Link>

            </div>
        </div>
    );
}