import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import blueQuarry from '../Pictures/blue 2.webp';
import terraceShot from '../Pictures/Yellow 5.webp';
import tileClose from '../Pictures/yellow 4.webp';
import greyWall from '../Pictures/Grey 1.webp';

const slides = [
  {
    image: blueQuarry,
    title: 'Quarried With Care',
    subtitle: 'Low-vibration cuts keep the grain calm and the tone consistent.',
  },
  {
    image: terraceShot,
    title: 'Crafted For Living',
    subtitle: 'Outdoor slabs set for sun, shade, and every gathering in between.',
  },
  {
    image: tileClose,
    title: 'Texture You Can Feel',
    subtitle: 'Brushed + honed finishes dial in slip resistance and warmth.',
  },
  {
    image: greyWall,
    title: 'Built To Endure',
    subtitle: 'Dense Tandur limestone ready for walls, pools, and public spaces.',
  },
];

export default function ProcessHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].title}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(115deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25)), url(${slides[index].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-end min-h-screen pb-20 pt-28">
        <div className="mb-6 flex gap-2">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setIndex(dotIdx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                dotIdx === index ? 'w-12 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

        <motion.div
          key={`copy-${slides[index].title}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-gabarito uppercase tracking-[0.3em] text-white/70 mb-3">
            Limestone In Motion
          </p>
          <h1 className="text-4xl md:text-5xl font-gabarito font-bold tracking-tight mb-4">
            {slides[index].title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {slides[index].subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
