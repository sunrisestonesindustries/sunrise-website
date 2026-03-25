import React from 'react';
import { motion } from 'framer-motion';

export default function BrowseRange() {
  const stoneTypes = [
    {
      name: 'Limestone',
      image: 'https://images.unsplash.com/photo-1532357086313-fc87d362e327?w=600&h=600&fit=crop',
    },
    {
      name: 'Marble',
      image: 'https://images.unsplash.com/photo-1578500198453-4a8e12166ed9?w=600&h=600&fit=crop',
    },
    {
      name: 'Granite',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f9cc41?w=600&h=600&fit=crop',
    },
    {
      name: 'Quartzite',
      image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&h=600&fit=crop',
    },
    {
      name: 'Travertine',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop',
    },
    {
      name: 'Onyx',
      image: 'https://images.unsplash.com/photo-1571055107066-c82d30bffddc?w=600&h=600&fit=crop',
    },
    {
      name: 'Custom Orders',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=600&fit=crop',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
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
    <section className="py-20 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-label font-montserrat text-brand-gold mb-3 uppercase">
            Collections
          </p>
          <h2 className="text-3xl md:text-h2 font-montserrat font-normal tracking-tight text-off-white">
            Browse our range of<br className="hidden md:block" /> Exclusive Stone
          </h2>
        </motion.div>

        {/* Stone Type Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stoneTypes.map((stone, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover="hover"
              className="group relative h-72 rounded-sm overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <motion.img
                src={stone.image}
                alt={stone.name}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Dark Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/40"
                whileHover={{ backgroundColor: 'rgba(11, 11, 12, 0.55)' }}
                transition={{ duration: 0.22 }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                <h3 className="text-lg md:text-xl font-montserrat font-medium text-off-white mb-4 tracking-wide">
                  {stone.name}
                </h3>

                {/* CTA with animation */}
                <motion.a
                  href="#"
                  className="text-xs font-montserrat tracking-wider text-brand-gold border-b border-brand-gold/50 pb-1 transition-all duration-180 hover:border-brand-gold"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  BROWSE COLLECTION
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
