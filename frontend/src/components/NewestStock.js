import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import blueImage from '../Pictures/blue shade.webp';
import yellowImage from '../Pictures/Yellow shades.png';
import greyImage from '../Pictures/grey shades.png';

export default function NewestStock() {
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  const colors = [
    {
      id: 1,
      colorId: 'blue',
      name: 'Blue',
      image: blueImage,
      code: 'LST-BLU',
    },
    {
      id: 2,
      colorId: 'yellow',
      name: 'Yellow',
      image: yellowImage,
      code: 'LST-YEL',
    },
    {
      id: 3,
      colorId: 'grey',
      name: 'Grey',
      image: greyImage,
      code: 'LST-GRY',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="limestone-collection" className="py-20 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-h2 font-gabarito font-bold tracking-tight text-white">
            Limestone Collection
          </h2>
        </motion.div>

        {/* Color Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {colors.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/limestone/${item.colorId}`)}
              className="group cursor-pointer"
            >
              {/* Color Block */}
              <motion.div
                className="relative h-64 md:h-72 mb-6 rounded-sm overflow-hidden border border-gray-700 cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22 }}
              >
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Hover Overlay */}
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-black/10 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/limestone/${item.colorId}`);
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        className="px-6 py-3 bg-white text-black text-sm font-gabarito tracking-wide rounded-sm hover:bg-gray-100 transition-all font-bold"
                      >
                        VIEW DETAILS
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Color Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                onClick={() => navigate(`/limestone/${item.colorId}`)}
                className="cursor-pointer"
              >
                <h3 className="text-sm md:text-base font-gabarito font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-220">
                  {item.name}
                </h3>

                {/* Color Code */}
                <p className="text-xs font-gabarito text-gray-400 uppercase tracking-wider">
                  Code: {item.code}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-3 text-button font-gabarito tracking-wide text-white hover:text-gray-300 transition-colors duration-220"
          >
            DESIGNED BY NATURE. LAUNCHING SOON.
            <span className="w-4 h-px bg-white" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
