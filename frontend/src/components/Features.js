import React from 'react';
import './Features.css';

function Features({ features }) {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="section-title">
          <h2>Why Choose <span>SUNRISE</span></h2>
          <p>Excellence in every stone</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={feature.id} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
