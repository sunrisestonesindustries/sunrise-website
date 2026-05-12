import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../Pictures/logo1.webp';

export default function Navbar({ onOpenModal, onOpenContact, cartCount = 0 }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const catalogUrl = `${process.env.PUBLIC_URL}/catalog/CATALOG%202026.pdf`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductsClick = () => {
    navigate('/', { state: { scrollTo: 'limestone-collection' } });
    setIsOpen(false);
  };

  const handleCatalogClick = () => {
    setIsCatalogOpen(true);
    setIsOpen(false);
  };

  const handleCartClick = () => {
    navigate('/cart');
    setIsOpen(false);
  };

  const handleNavClick = (type) => {
    if (type === 'products') {
      handleProductsClick();
    } else if (type === 'about') {
      const aboutElement = document.querySelector('#about');
      if (aboutElement) aboutElement.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'contact') {
      onOpenContact?.();
    }
    if (type !== 'products') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-glass bg-white/95 border-b border-gray-300/30'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 hidden md:flex items-center justify-between">
          {/* Left: Logo */}
          <motion.button
            onClick={handleLogoClick}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f5f1e8] ring-1 ring-black/10 shadow-sm overflow-hidden">
              <img
                src={logoImage}
                alt="Sunrise Stone Industries Logo"
                className="h-full w-full scale-125 object-contain p-1"
                style={{ filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.45))' }}
              />
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="text-sm font-gabarito font-bold tracking-[0.22em] text-black">
                SUNRISE STONES
              </div>
              <div className="text-sm font-gabarito font-bold tracking-[0.22em] text-black">
                INDUSTRIES
              </div>
            </div>
          </motion.button>

          {/* Center: Navigation Links */}
          <div className="flex items-center gap-8">
            <motion.button
              onClick={() => handleNavClick('products')}
              className="text-sm font-gabarito text-black hover:text-gray-600 transition-colors duration-220 border-none bg-transparent cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Collection
            </motion.button>
            <motion.button
              onClick={handleCatalogClick}
              className="text-sm font-gabarito text-black hover:text-gray-600 transition-colors duration-220 border-none bg-transparent cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Catalog
            </motion.button>
            <motion.button
              onClick={() => handleNavClick('about')}
              className="text-sm font-gabarito text-black hover:text-gray-600 transition-colors duration-220 border-none bg-transparent cursor-pointer"
              whileHover={{ y: -2 }}
            >
              About
            </motion.button>
            <motion.button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-gabarito text-black hover:text-gray-600 transition-colors duration-220 border-none bg-transparent cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.button>
          </div>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenModal}
              className="px-6 py-2 border-2 border-black text-black text-sm font-gabarito tracking-wide hover:bg-black hover:text-white transition-all duration-220 rounded-sm"
            >
              REQUEST QUOTE
            </button>
            <button
              onClick={handleCartClick}
              className="flex items-center gap-2 px-4 py-2 border-2 border-black text-black text-sm font-gabarito tracking-wide hover:bg-black hover:text-white transition-all duration-220 rounded-sm"
            >
              CART
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-4">
          <motion.button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity border-none bg-transparent"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f1e8] ring-1 ring-black/10 shadow-sm overflow-hidden">
              <img
                src={logoImage}
                alt="Sunrise Stone Industries Logo"
                className="h-full w-full scale-125 object-contain p-0.5"
                style={{ filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.45))' }}
              />
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="text-xs font-gabarito font-bold tracking-[0.16em] text-black">
                SUNRISE STONES
              </div>
              <div className="text-xs font-gabarito font-bold tracking-[0.16em] text-black">
                INDUSTRIES
              </div>
            </div>
          </motion.button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-6 flex flex-col justify-center items-center gap-1"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-300/30 max-h-[80vh] overflow-y-auto md:hidden"
          >
            <div className="flex flex-col py-4 space-y-1">
              <motion.button
                onClick={() => handleNavClick('products')}
                className="px-6 py-3 text-black text-base font-gabarito hover:bg-gray-100 transition-colors duration-200 tracking-wide text-left border-none bg-transparent cursor-pointer"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Collection
              </motion.button>
              <motion.button
                onClick={handleCatalogClick}
                className="px-6 py-3 text-black text-base font-gabarito hover:bg-gray-100 transition-colors duration-200 tracking-wide text-left border-none bg-transparent cursor-pointer"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Catalog
              </motion.button>
              <motion.button
                onClick={() => handleNavClick('about')}
                className="px-6 py-3 text-black text-base font-gabarito hover:bg-gray-100 transition-colors duration-200 tracking-wide text-left border-none bg-transparent cursor-pointer"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                About
              </motion.button>
              <motion.button
                onClick={() => handleNavClick('contact')}
                className="px-6 py-3 text-black text-base font-gabarito hover:bg-gray-100 transition-colors duration-200 tracking-wide text-left border-none bg-transparent cursor-pointer"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Contact
              </motion.button>

              <div className="px-6 py-3 border-t border-gray-300/30 mt-4">
                <motion.button
                  onClick={() => {
                    onOpenModal();
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-2 border-2 border-black text-black text-sm font-gabarito tracking-wide hover:bg-black hover:text-white transition-all duration-220 rounded-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  REQUEST QUOTE
                </motion.button>
                <motion.button
                  onClick={handleCartClick}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-6 py-2 border-2 border-black text-black text-sm font-gabarito tracking-wide hover:bg-black hover:text-white transition-all duration-220 rounded-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CART
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCatalogOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-sm bg-white shadow-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-gabarito uppercase tracking-[0.24em] text-gray-500">
                    Product Catalog
                  </p>
                  <h2 className="mt-1 text-xl font-gabarito font-bold text-black">
                    CATALOG 2026
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={catalogUrl}
                    download="CATALOG 2026.pdf"
                    className="rounded-sm border-2 border-black px-4 py-2 text-sm font-gabarito font-semibold tracking-wide text-black transition-all duration-220 hover:bg-black hover:text-white"
                  >
                    DOWNLOAD
                  </a>
                  <a
                    href={catalogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm border-2 border-black px-4 py-2 text-sm font-gabarito font-semibold tracking-wide text-black transition-all duration-220 hover:bg-black hover:text-white"
                  >
                    OPEN
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsCatalogOpen(false)}
                    className="rounded-sm bg-black px-4 py-2 text-sm font-gabarito font-semibold tracking-wide text-white transition-all duration-220 hover:bg-gray-800"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
              <iframe
                title="Sunrise Stones Catalog 2026"
                src={catalogUrl}
                className="h-full w-full flex-1 border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
