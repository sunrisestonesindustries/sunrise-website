import React, { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import LogoStrip from './components/LogoStrip';
import NewestStock from './components/NewestStock';
import Testimonials from './components/Testimonials';
import BoldCTA from './components/BoldCTA';
import QuoteRequestModal from './components/QuoteRequestModal';
import ContactDetailsModal from './components/ContactDetailsModal';
import MultiStepModal from './components/MultiStepModal';
import Footer from './components/Footer';
import MiningJourney from './components/MiningJourney';
import Seo from './components/Seo';
import './App.css';

// Heavy detail pages — code-split so they don't block initial load
const LimestoneDetail = lazy(() => import('./components/LimestoneDetail'));
const GraniteDetail   = lazy(() => import('./components/GraniteDetail'));
const CartPage        = lazy(() => import('./components/CartPage'));
const StoneCustomizationPage = lazy(() => import('./components/StoneCustomizationPage'));
const CompanyInfoPage = lazy(() => import('./components/CompanyInfoPage'));
const BlogIndex = lazy(() => import('./components/BlogPage').then((m) => ({ default: m.BlogIndex })));
const BlogArticle = lazy(() => import('./components/BlogPage').then((m) => ({ default: m.BlogArticle })));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="h-8 w-8 rounded-full border-2 border-black/10 border-t-black animate-spin" />
  </div>
);

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.history) {
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const shouldScrollToSection = location.pathname === '/' && location.state?.scrollTo;

    if (shouldScrollToSection) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search, location.state]);

  return null;
}

function HomePage({ setIsModalOpen, setIsAppointmentOpen, setIsContactOpen, cartCount }) {
  const location = useLocation();

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    let animationFrameId;
    let isActive = true;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 1.8,
      infinite: false,
    });

    function raf(time) {
      if (!isActive) {
        return;
      }

      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
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
    <div className="App bg-black min-h-screen">
      <Seo
        path="/"
        title="Granite, Limestone & Natural Stone Supplier in the USA"
        description="US-based natural stone supplier shipping premium Indian granite, Tandur limestone and custom-fabricated countertops, slabs and tiles. Direct-from-quarry pricing, container-load export, reliable nationwide supply from our New Jersey HQ."
        keywords="natural stone supplier USA, granite supplier New Jersey, Indian granite exporter, Tandur limestone, wholesale granite slabs, custom stone fabrication, granite countertops, limestone tiles"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Granite, Limestone & Natural Stone Supplier in the USA',
          url: 'https://www.sunrisestonesindustries.com/',
          isPartOf: { '@id': 'https://www.sunrisestonesindustries.com/#website' },
          about: { '@id': 'https://www.sunrisestonesindustries.com/#organization' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sunrisestonesindustries.com/' },
            ],
          },
        }}
      />
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        cartCount={cartCount}
      />
      <HeroCarousel onOpenModal={() => setIsModalOpen(true)} />
      <div aria-hidden="true" className="h-screen" />
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
      <ScrollToTop />
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
            <Suspense fallback={<PageLoader />}>
              <LimestoneDetail
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveMatchingCartItem={handleRemoveMatchingCartItem}
                onOpenContact={() => setIsContactOpen(true)}
              />
            </Suspense>
          }
        />
        <Route
          path="/granite/:graniteId"
          element={
            <Suspense fallback={<PageLoader />}>
              <GraniteDetail
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveMatchingCartItem={handleRemoveMatchingCartItem}
                onOpenContact={() => setIsContactOpen(true)}
              />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<PageLoader />}>
              <CartPage
                cartItems={cartItems}
                onRemoveCartItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
                onOpenModal={() => setIsModalOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
              />
            </Suspense>
          }
        />
        <Route
          path="/customize-stone"
          element={
            <Suspense fallback={<PageLoader />}>
              <StoneCustomizationPage
                onOpenContact={() => setIsContactOpen(true)}
                cartCount={cartCount}
              />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<PageLoader />}>
              <CompanyInfoPage
                onOpenModal={() => setIsModalOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
                cartCount={cartCount}
              />
            </Suspense>
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
        <Route
          path="/blog"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogIndex
                onOpenModal={() => setIsModalOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
                cartCount={cartCount}
              />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogArticle
                onOpenModal={() => setIsModalOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
                cartCount={cartCount}
              />
            </Suspense>
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
