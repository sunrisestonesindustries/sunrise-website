import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import stoneImageOne from '../Pictures/intg3.jpg';
import stoneImageTwo from '../Pictures/intg4.jpg';
import stoneImageThree from '../Pictures/inty4.jpg';

export default function EditorialSection() {
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    {
      src: stoneImageOne,
      alt: 'Interior limestone flooring detail',
    },
    {
      src: stoneImageTwo,
      alt: 'Interior limestone application',
    },
    {
      src: stoneImageThree,
      alt: 'Limestone interior space',
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative z-10 bg-white px-6 py-24 md:px-12 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[30px] bg-[#f4f4f4] min-h-[440px] md:min-h-[560px] lg:min-h-[680px]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[activeImage].src}
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,241,0.06),rgba(17,17,17,0.06))]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center py-2 lg:py-10"
          >
            <h2
              className="max-w-xl text-[2.6rem] leading-[0.98] tracking-[-0.03em] text-black md:text-[3.4rem] lg:text-[4.25rem]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              A Stone Shaped
              <br />
              by Time
            </h2>

            <div className="my-8 h-px w-full max-w-[420px] bg-black/16" />

            <p
              className="max-w-xl text-base leading-8 text-black md:text-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Born beneath ancient seabeds, shaped over millions of years. Our limestone carries a dense structure, refined texture, and timeless strength for modern architecture.
            </p>

            <motion.button
              onClick={() => {
                const collectionSection = document.getElementById('limestone-collection');
                if (collectionSection) {
                  collectionSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ x: 4 }}
              className="mt-10 inline-flex items-center gap-4 text-button tracking-wide text-black transition-colors duration-220 hover:text-gray-700"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Explore Limestone Collection
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-8 bg-black" />
                <span aria-hidden="true">→</span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="h-px w-full bg-black/8" />
        </div>
      </div>
    </section>
  );
}
