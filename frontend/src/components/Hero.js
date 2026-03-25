import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

function Hero({ company }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [slabOffset, setSlabOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const slabContainerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Parallax mouse movement effect on the slab
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!slabContainerRef.current) return;

      const rect = slabContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (e.clientX - centerX) * 0.1;
      const offsetY = (e.clientY - centerY) * 0.1;

      setSlabOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseLeave = () => {
      setSlabOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Background: Quarry/Origin Image */}
      <div className="hero-background">
        <div className="quarry-image"></div>
        <div className="hero-overlay"></div>
      </div>

      {/* Main Content Container */}
      <div className="hero-container">
        {/* Left: Text Content */}
        <div className={`hero-text-section ${isLoaded ? 'loaded' : ''}`}>
          <h1 className="hero-title">THE TANDUR COLLECTION</h1>
          <p className="hero-subtitle">Direct from our Telangana Mines to your US Projects.</p>
          <a href="#products" className="hero-cta">Explore Collection</a>
        </div>

        {/* Right: Stone Slab */}
        <div 
          className={`hero-slab-section ${isLoaded ? 'loaded' : ''}`}
          ref={slabContainerRef}
        >
          <div 
            className="hero-slab"
            style={{
              transform: `translate(${slabOffset.x}px, ${slabOffset.y}px)`
            }}
          ></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;
