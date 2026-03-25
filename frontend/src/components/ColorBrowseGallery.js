import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import blueImage from '../Pictures/blue shade.webp';
import yellowImage from '../Pictures/Yellow shades.png';
import greyImage from '../Pictures/grey shades.png';

export default function ColorBrowseGallery() {
  const navigate = useNavigate();

  const colorTiles = [
    {
      name: 'Blue Limestone',
      code: '01',
      image: blueImage,
      colorId: 'blue',
      description: 'Premium blue-gray limestone',
    },
    {
      name: 'Yellow Limestone',
      code: '02',
      image: yellowImage,
      colorId: 'yellow',
      description: 'Warm golden yellow limestone',
    },
    {
      name: 'Grey Limestone',
      code: '03',
      image: greyImage,
      colorId: 'grey',
      description: 'Sophisticated grey limestone',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const tileVariants = {
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
    <section id="color-gallery" className="py-20 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-h2 font-montserrat font-normal tracking-tight text-off-white">
            Browse Range by Colour.
          </h2>
        </motion.div>

        {/* Color Tiles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {colorTiles.map((tile, idx) => (
            <motion.div
              key={idx}
              variants={tileVariants}
              whileHover="hover"
              onClick={() => navigate(`/limestone/${tile.colorId}`)}
              className="group relative h-96 rounded-sm overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <motion.img
                src={tile.image}
                alt={tile.name}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Dark Overlay - rises from bottom on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"
                whileHover={{
                  backgroundImage:
                    'linear-gradient(180deg, rgba(11,11,12,0.3) 0%, rgba(11,11,12,0.6) 50%, rgba(11,11,12,0.8) 100%)',
                }}
                transition={{ duration: 0.22 }}
              />

              {/* Number Badge (top right) */}
              <div className="absolute top-6 right-6 z-10">
                <motion.p
                  className="text-2xl md:text-3xl font-montserrat font-light text-off-white/40"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.22 }}
                >
                  {tile.code}
                </motion.p>
              </div>

              {/* Content - appears on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                {/* Color Description */}
                <motion.p
                  className="text-xs md:text-sm font-montserrat text-off-white/70 mb-2 tracking-wide text-center"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {tile.description}
                </motion.p>

                {/* Color Label */}
                <motion.h3
                  className="text-xl md:text-2xl font-montserrat font-medium text-off-white mb-4 tracking-wide text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {tile.name}
                </motion.h3>

                {/* Explore Button */}
                <motion.button
                  className="text-xs md:text-sm font-montserrat tracking-wider text-brand-gold border border-brand-gold/60 px-4 py-2 rounded-sm hover:bg-brand-gold/10 transition-all duration-220"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0, borderColor: '#F2C14E' }}
                  transition={{ duration: 0.22 }}
                  onClick={() => navigate(`/limestone/${tile.colorId}`)}
                >
                  EXPLORE RANGE
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
