// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import api from '../api';

// export default function ManageAccount() {
//     const { userId } = useParams();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const userType = searchParams.get('userType');
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//       });
    
//       useEffect(() => {
//         const fetchUser = async () => {
//           try {
//             const response = await api.get(`/users/find/${userId}`);
//             const { username, email } = response.data;
//             setFormData({ username, email, password: '' });
//           } catch (err) {
//             console.error('Error fetching user data:', err);
//           }
//         };
    
//         fetchUser();
//       }, [userId]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Updating account with data:', formData);
//       await api.put(`/users/${userId}`, formData);
//       alert('Account updated successfully!');
//     } catch (err) {
//       console.error('Error updating account:', err);
//       alert('An error occurred. Please try again.');
//     }
//   };

//     const handleDelete = async () => {
//         try {
//             await api.delete(`/users/${userId}`);
//             alert('Account deleted successfully!');
//             navigate('/');
//         } catch (err) {
//             console.error('Error deleting account:', err);
//             alert('An error occurred. Please try again.');
//         }
//     };

//   return (
//     <>
//     <Navbar userType={userType} userId={userId}/>
//     <div className="account--container">
//       <div className="form-box">
//         <h3 id="title">Manage Account</h3>
//         <form onSubmit={handleSubmit}>
//           <div id="account-card" className="account-input-group">
//             <div className="input-field">
//               <i className="bi bi-person-fill"></i>
//               <input
//                 className="account-input"
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <i className="bi bi-envelope-fill"></i>
//               <input
//                 className="account-input"
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <i className="bi bi-lock-fill"></i>
//               <input
//                 className="account-input"
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <button
//               id="account-button"
//               type="submit"
//               className="btn home--btn"
//             >
//               Update Account
//             </button>
//           </div>
//         </form>

//       </div>
//     </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../api';

export default function ManageAccount() {
    const { userId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get('userType');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/find/${userId}`);
                const { username, email } = response.data;
                setFormData({ username, email, password: '' });
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Updating account with data:', formData);
            await api.put(`/users/${userId}`, formData);
            setSubmitted(true);
            alert('Account updated successfully!');
        } catch (err) {
            console.error('Error updating account:', err);
            alert('An error occurred. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/users/${userId}`);
            alert('Account deleted successfully!');
            navigate('/');
        } catch (err) {
            console.error('Error deleting account:', err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Navbar userType={userType} userId={userId} />
            <div className="account--container">
                    {submitted ? (
                        <div className="submitted--account">
                            <h1>Account has been updated!</h1>
                            <i className="bi bi-check-circle"></i>
                            <Link className="btn form--btn" to={`/`}>Return to Home</Link>
                        </div>
                    ) : (
                        <div className="form-container">
                             <h2>Edit Account Info</h2>
                            {deleteAccount ? (
                                <div className="submitted--account">
                                    <p>Are you sure you want to delete your account?</p>
                                    <div className="btn delete--btn" onClick={handleDelete}>Yes, delete account.</div>
                                    <div className="btn form--btn" onClick={() => setDeleteAccount(false)}>No, keep account.</div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="account-form" method="POST">
                                    <div id="signup-card" className="signup-input-group">
                                        <div className="input-field">
                                            <i className="bi bi-person-fill"></i>
                                            <input
                                                className="account-input"
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
                                                className="account-input"
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
                                                className="account-input"
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button
                                            id="account-button"
                                            type="submit"
                                            className="btn home--btn"
                                        >
                                            Update Account
                                        </button>
                                    </div>
                                </form>
                            )}
                            {!deleteAccount && (
                                <input id="delete-button" type="submit" className="btn delete--btn" onClick={() => setDeleteAccount(true)} value="Delete Account" />
                            )}
                        </div>
                    )}
            </div>
        </>
    );
}
