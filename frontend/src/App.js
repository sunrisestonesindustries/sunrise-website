import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import EditorialSection from './components/EditorialSection';
import LogoStrip from './components/LogoStrip';
import NewestStock from './components/NewestStock';
import Testimonials from './components/Testimonials';
import BoldCTA from './components/BoldCTA';
import QuoteRequestModal from './components/QuoteRequestModal';
import ContactDetailsModal from './components/ContactDetailsModal';
import MultiStepModal from './components/MultiStepModal';
import Footer from './components/Footer';
import LimestoneDetail from './components/LimestoneDetail';
import MiningJourney from './components/MiningJourney';
import CartPage from './components/CartPage';
import StoneCustomizationPage from './components/StoneCustomizationPage';
import CompanyInfoPage from './components/CompanyInfoPage';
import './App.css';

function HomePage({ setIsModalOpen, setIsAppointmentOpen, setIsContactOpen, cartCount }) {
  const location = useLocation();

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const sectionId = location.state?.scrollTo
      || (typeof window !== 'undefined' ? window.sessionStorage.getItem('home-scroll-target') : '');
    if (!sectionId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        window.sessionStorage.removeItem('home-scroll-target');
      }
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [location]);

  return (
    <div className="App bg-white min-h-screen">
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        cartCount={cartCount}
      />
      <HeroCarousel onOpenModal={() => setIsModalOpen(true)} />
      <div aria-hidden="true" className="h-screen" />
      <EditorialSection />
      <NewestStock />
      <MiningJourney />
      <LogoStrip />
      <Testimonials />
      <BoldCTA
        onOpenModal={() => setIsModalOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />
      <Footer
        onOpenModal={() => setIsModalOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.sqm || 0), 0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedCart = window.localStorage.getItem('limestone-cart');
    if (!savedCart) {
      return;
    }

    try {
      setCartItems(JSON.parse(savedCart));
    } catch (_error) {
      window.localStorage.removeItem('limestone-cart');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('limestone-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (cartItem) => {
    setCartItems((prev) => {
      const matchIndex = prev.findIndex((item) => (
        item.colorId === cartItem.colorId
        && item.size === cartItem.size
        && item.finish === cartItem.finish
        && item.edge === cartItem.edge
      ));

      if (matchIndex === -1) {
        return [cartItem, ...prev];
      }

      return prev.map((item, index) => (
        index === matchIndex
          ? { ...item, sqm: (item.sqm || 0) + (cartItem.sqm || 1) }
          : item
      ));
    });
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleRemoveMatchingCartItem = (matcher) => {
    setCartItems((prev) => {
      const matchIndex = prev.findIndex((item) => (
        item.colorId === matcher.colorId
        && item.size === matcher.size
        && item.finish === matcher.finish
        && item.edge === matcher.edge
      ));

      if (matchIndex === -1) {
        return prev;
      }

      return prev.flatMap((item, index) => {
        if (index !== matchIndex) {
          return [item];
        }

        const nextQuantity = (item.sqm || 0) - (matcher.sqm || 1);
        return nextQuantity > 0 ? [{ ...item, sqm: nextQuantity }] : [];
      });
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage
              setIsModalOpen={setIsModalOpen}
              setIsAppointmentOpen={setIsAppointmentOpen}
              setIsContactOpen={setIsContactOpen}
              cartCount={cartCount}
            />
          } 
        />
        <Route 
          path="/limestone/:colorId" 
          element={
            <LimestoneDetail
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveMatchingCartItem={handleRemoveMatchingCartItem}
              onOpenContact={() => setIsContactOpen(true)}
            />
          } 
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onRemoveCartItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onOpenModal={() => setIsModalOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />
          }
        />
        <Route
          path="/customize-stone"
          element={
            <StoneCustomizationPage
              onOpenContact={() => setIsContactOpen(true)}
              cartCount={cartCount}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <CompanyInfoPage
              onOpenModal={() => setIsModalOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              cartCount={cartCount}
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <CompanyInfoPage
              onOpenModal={() => setIsModalOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              cartCount={cartCount}
            />
          }
        />
        <Route
          path="/shipping-info"
          element={
            <CompanyInfoPage
              onOpenModal={() => setIsModalOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              cartCount={cartCount}
            />
          }
        />
      </Routes>
      
      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
      />
      <MultiStepModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
      <ContactDetailsModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </Router>
  );
}

export default App;
