import React from 'react';
import './Products.css';

function Products({ products }) {
  return (
    <section className="products" id="products">
      <div className="section-title">
        <h2>Our <span>Collection</span></h2>
        <p>Tandur limestone in four stunning colors, custom-sized for your projects</p>
      </div>

      <div className="color-grid">
        {products.map((product) => (
          <div key={product.id} className="color-card">
            <div 
              className="color-sample" 
              style={{ background: product.gradient }}
            ></div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
