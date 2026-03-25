import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LogoStrip() {
  const [isPaused, setIsPaused] = useState(false);

  // Dummy logos - using company-style text placeholders
  const logos = [
    'ASTM International',
    'ISO Certified',
    'USA Trade',
    'Stone Board',
    'Quality Seal',
    'Builders Trust',
    'Export Certified',
    'Industry Partner',
  ];

  // Duplicate for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 md:py-24 px-6 bg-white border-y border-gray-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center text-sm md:text-base font-gabarito text-gray-700 mb-8 md:mb-12"
        >
          Recognised by industry leaders for exceptional quality
        </motion.h3>

        {/* Logo Marquee */}
        <motion.div
          className="overflow-hidden rounded-sm"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-12 md:gap-16"
            animate={{ x: [-100, -3000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              paused: isPaused,
            }}
          >
            {duplicatedLogos.map((logo, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 flex items-center justify-center px-6 py-4 min-w-max"
                whileHover={{ opacity: 1 }}
                initial={{ opacity: 0.65 }}
              >
                <div className="text-xs md:text-sm font-gabarito tracking-wider text-gray-600 whitespace-nowrap hover:text-black transition-colors duration-220">
                  {logo}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Pause indicator on mobile */}
        <p className="text-center text-xs text-gray-600 mt-4 md:hidden">
          Scroll horizontally to view more
        </p>
      </div>
    </section>
  );
}
