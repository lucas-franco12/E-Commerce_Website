import React from 'react';

export default function ProductCard(props) {
  return (
    <div className="card">
      <img className="card--img" src={props.product.img} alt={props.product.name} />
      <h4 className="card--name">{props.product.name}</h4>
      <p className="card--price">{`$${props.product.price}`}</p>
    </div>
  )
}