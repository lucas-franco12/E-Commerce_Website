import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
    return(
        <div className='home--container'>
            <h1>Welcome to Our E-commerce Platform</h1>
            <p>Choose from a catalog of a wide variety of products or promote and sell products of your own on our free, 
                easy to use web application </p>
            <ul>
                {/* <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li> */}
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/dashboard">Seller Dashboard</Link></li>
            </ul>
        </div>
    );
}

