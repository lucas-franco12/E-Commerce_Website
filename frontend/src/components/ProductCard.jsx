import React from 'react'
import { Link } from 'react-router-dom';

export default function ProductCard({product, index}){
    
    return(
        <div key={index}>
          <Link to={`/products/${product.id}`} className="product--card--link"> 
            <div className="product--card">
              <img src={product.src} alt={`Product ${index + 1}`} />
              <div className="main-row">
                <h5 className="product--name">{product.name}</h5>
                <p className="product--desc">{product.desc}</p>
                <p className="product--price">{`$${product.price}`}</p>
              </div>
            </div>
          </Link>
        </div>
    );
}
