import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import minesOne from '../Pictures/Mines1.jpg';
import minesTwo from '../Pictures/mines2.jpeg';
import minesFour from '../Pictures/Mines4.jpg';
import minesFive from '../Pictures/mines5.jpg';

const slides = [
  {
    image: minesOne,
    label: 'Quarry History',
    title: 'Stone begins in the cut face.',
    copy: 'Ancient limestone exposed in long, quiet planes where geology and extraction first meet.',
  },
  {
    image: minesTwo,
    label: 'Extraction',
    title: 'Blocks are released with control.',
    copy: 'Low-vibration cutting protects the tone, density, and natural character of each slab.',
  },
  {
    image: minesFour,
    label: 'Selection',
    title: 'Every layer is read before it moves.',
    copy: 'The quarry team evaluates color, consistency, and grain before the stone enters finishing.',
  },
  {
    image: minesFive,
    label: 'Craft',
    title: 'From quarry floor to project material.',
    copy: 'What starts as bedrock is refined into architectural limestone built for real installations.',
  },
];

export default function MiningJourney() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative h-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[activeSlide].title}
          initial={{ opacity: 0, scale: 1.04, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.72),rgba(0,0,0,0.2)_48%,rgba(0,0,0,0.58))]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-end">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <motion.div
            key={`copy-${activeSlide}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs md:text-sm font-gabarito uppercase tracking-[0.38em] text-white/60 mb-4">
              {slides[activeSlide].label}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-gabarito font-bold tracking-tight leading-[0.95] max-w-2xl">
              {slides[activeSlide].title}
            </h2>
            <p className="mt-5 max-w-xl text-sm md:text-lg leading-relaxed text-white/78">
              {slides[activeSlide].copy}
            </p>
          </motion.div>

          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {slides.map((slide, idx) => (
                <button
                  key={slide.title}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Show slide ${idx + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === activeSlide
                      ? 'w-14 bg-white'
                      : 'w-6 bg-white/35 hover:bg-white/55'
                  }`}
                />
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4 text-xs font-gabarito uppercase tracking-[0.28em] text-white/55">
              <span>{String(activeSlide + 1).padStart(2, '0')}</span>
              <span className="h-px w-12 bg-white/25" />
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
