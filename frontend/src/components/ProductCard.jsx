import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, userId, userType }) {
    return (
        <div>
            {userType === 'customer' ?  
            (
            <Link to={`/products/${product._id}?userId=${userId}`} className="product--card--link">
                <div className="product--card">
                    <img src={product.src} alt={`Product ${product.name}`} />
                    <div className="main-row">
                        <h5 className="product--name">{product.name}</h5>
                        <p className="product--desc">{product.desc}</p>
                        <p className="product--price">{`$${product.price}`}</p>
                    </div>
                </div>
            </Link>
            )
            :
            (
            <Link to={`/edit-product/${product._id}?userId=${userId}`} className="product--card--link">
                <div className="product--card">
                    <img src={product.src} alt={`Product ${product.name}`} />
                    <div className="main-row">
                        <h5 className="product--name">{product.name}</h5>
                        <p className="product--desc">{product.desc}</p>
                        <p className="product--price">{`$${product.price}`}</p>
                    </div>
                </div>
            </Link>
            )
            }
        </div>
    );
} 