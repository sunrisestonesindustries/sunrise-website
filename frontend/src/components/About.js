import React from 'react';
import './About.css';

function About({ about }) {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <div className="about-text">
          <h2>About <span>SUNRISE INDUSTRIES</span></h2>
          {about.content && about.content.map((text, index) => (
            <p key={index}>{text}</p>
          ))}

          <div className="about-box">
            <h3>What We Offer</h3>
            <ul>
              {about.offerings && about.offerings.map((offering, index) => (
                <li key={index}>{offering}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about-image"></div>
      </div>
    </section>
  );
}

export default About;
