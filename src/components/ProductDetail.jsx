import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import api from '../api';


export default function ProductDetail() {
    const [ product, setProduct ] = useState({})
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product', err);
            }
        }
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Product not found!</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    return (
        <div className='product-detail--container'>
            <div className="product-detail--image">
                <img src={product.src} alt={product.name} />
            </div>
            <div className="product-detail--text">
                <h1>{product.name}</h1>
                <p>{product.desc}</p>
                <p>{`$${product.price}`}</p>
                <button className="form--btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
