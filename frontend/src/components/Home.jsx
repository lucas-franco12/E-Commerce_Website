import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){

    return(
        <div className='home--container'>
            <h1>Welcome to Our E-commerce Platform</h1>
            <p>Choose from a catalog of a wide variety of products or promote and sell products of your own on our free, 
                easy to use web application </p>
            <ul>
                <li><Link className="btn home--btn" to={`/login/customer`} >Browse Products</Link></li>
                <li><Link className="btn home--btn" to={`/login/seller`} >Sell Products</Link></li>
            </ul>
        </div>
    );
}

