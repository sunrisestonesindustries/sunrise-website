import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import greyImage from '../Pictures/grey 3.webp';
import stepyImage from '../Pictures/stepy.webp';
import extyImage from '../Pictures/exty5.webp';
import poolImage from '../Pictures/pb.jpg';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Fade out hero as user scrolls down
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const slides = [
    {
      image: extyImage,
      alt: 'Limestone exterior application',
      overlay: 'linear-gradient(180deg, rgba(11,11,12,0.65), rgba(11,11,12,0.35))',
    },
    {
      image: greyImage,
      alt: 'Grey limestone slab',
      overlay: 'linear-gradient(180deg, rgba(11,11,12,0.65), rgba(11,11,12,0.35))',
    },
    {
      image: stepyImage,
      alt: 'Limestone step application',
      overlay: 'linear-gradient(180deg, rgba(11,11,12,0.65), rgba(11,11,12,0.35))',
    },
    {
      image: poolImage,
      alt: 'Limestone poolside application',
      overlay: 'linear-gradient(180deg, rgba(11,11,12,0.65), rgba(11,11,12,0.35))',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity: heroOpacity }}
      className="fixed inset-0 w-full h-screen overflow-hidden z-0 pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            style={{ backgroundImage: slides[currentSlide].overlay }}
            className="absolute inset-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-28 md:px-12 md:pt-32">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-center"
        >
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <motion.button
              onClick={() => {
                const collectionSection = document.getElementById('limestone-collection');
                if (collectionSection) {
                  collectionSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ y: -2, boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ y: 0 }}
              className="px-6 md:px-8 py-3 border-2 border-white text-white text-button font-gabarito tracking-wide rounded-sm transition-all duration-180 hover:bg-white hover:text-black"
            >
              Browse Collection
            </motion.button>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-h1-lg font-gabarito font-bold tracking-tight text-white mb-6 md:mb-8 leading-tight">
            LIMESTONE EXPORTS
          </h1>

          {/* Microproof */}
          <div className="flex items-center gap-2 justify-center">
            <div className="h-px w-8 bg-white" />
            <p className="text-xs font-gabarito text-white/60 tracking-wide">
              Owned Quarry • Custom Cuts • International Exports
            </p>
          </div>
        </motion.div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
          />
        ))}
      </div>

    </motion.div>
  );
}
