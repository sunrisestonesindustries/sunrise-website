import React, { useState, useEffect } from 'react';
import './Header.css';

function Header({ company }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <div className="logo">
          SUNRISE <span>INDUSTRIES</span>
        </div>
        <ul className="nav-links">
          <li><a href="#products">The Palette</a></li>
          <li><a href="#features">Our Process</a></li>
          <li><a href="#about">Logistics</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
