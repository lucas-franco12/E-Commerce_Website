import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';


export default function ProductDetail({ products }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();


    const { id } = useParams();
    const product = products.find((prod) => prod.id.toString() === id.toString());

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
