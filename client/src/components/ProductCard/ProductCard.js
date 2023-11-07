import React from 'react'
import "./ProductCard.css";

function ProductCard({id, name, price, description, image}) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className='product-card-image' />
      <h2>{name}</h2>
      <h1>₹ {price}</h1>
      <p>{description}</p>
      <button className='btn-buy-now'>Buy Now</button>
    </div>
  )
}

export default ProductCard
