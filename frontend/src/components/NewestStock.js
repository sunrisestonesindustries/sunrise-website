import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import blueImage from '../Pictures/blue shade.webp';
import yellowImage from '../Pictures/Yellow shades.png';
import greyImage from '../Pictures/grey shades.png';
import graniteAlaskaRed from '../Pictures/tan red granite.png';
import graniteJuparana from '../Pictures/Indian Juparana Granite.png';
import graniteKashmirWhite from '../Pictures/White Granite. Kashmir.jpeg';
import graniteParadiso from '../Pictures/Paradiso Bash Granite. (1).png';
import graniteSapphire from '../Pictures/Sapphire Blue granite stone (1).png';

const graniteItems = [
  {
    id: 1,
    graniteId: 'alaska-red',
    name: 'Alaska Red Granite',
    code: 'GRT-ALR',
    accent: 'from-[#5a1717] via-[#7d2a2a] to-[#241313]',
    image: graniteAlaskaRed,
  },
  {
    id: 2,
    graniteId: 'indian-juparana',
    name: 'Indian Juparana Granite',
    code: 'GRT-IJG',
    accent: 'from-[#6f4e3e] via-[#9f7d63] to-[#30241d]',
    image: graniteJuparana,
  },
  {
    id: 3,
    graniteId: 'kashmir-white',
    name: 'Kashmir White Granite',
    code: 'GRT-KWG',
    accent: 'from-[#e6e1dc] via-[#c8c3be] to-[#8b8782]',
    image: graniteKashmirWhite,
  },
  {
    id: 4,
    graniteId: 'paradiso-ash',
    name: 'Paradiso Ash Granite',
    code: 'GRT-PAG',
    accent: 'from-[#56475e] via-[#7c6a84] to-[#241f28]',
    image: graniteParadiso,
  },
  {
    id: 5,
    graniteId: 'sapphire-blue',
    name: 'Sapphire Blue Granite',
    code: 'GRT-SBG',
    accent: 'from-[#11304d] via-[#24547c] to-[#0c1726]',
    image: graniteSapphire,
  },
];

const limestoneItems = [
  {
    id: 1,
    colorId: 'blue',
    name: 'Urban Blue Limestone',
    image: blueImage,
    code: 'LST-BLU',
  },
  {
    id: 2,
    colorId: 'yellow',
    name: 'Sunwashed Limestone',
    image: yellowImage,
    code: 'LST-YEL',
  },
  {
    id: 3,
    colorId: 'grey',
    name: 'Silver Ash Limestone',
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

function GraniteCard({ item, hoveredId, setHoveredId, navigate }) {
  const openDetailPage = () => {
    navigate(`/granite/${item.graniteId}`);
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={openDetailPage}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDetailPage();
        }
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="group cursor-pointer"
    >
      <div className="relative mb-5 overflow-hidden rounded-sm border border-white/10 bg-neutral-950">
        <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-20`} />
        <motion.img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_36%)]" />
        <AnimatePresence>
          {hoveredId === item.id && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={(event) => {
                  event.stopPropagation();
                  openDetailPage();
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="rounded-sm bg-white px-6 py-3 text-sm font-gabarito font-bold tracking-wide text-black transition-all hover:bg-gray-100"
              >
                VIEW DETAILS
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative flex aspect-[16/10] items-end justify-start px-6 pb-5">
          <div>
            <p className="text-[11px] font-gabarito font-bold uppercase tracking-[0.32em] text-white/80">
              {item.name}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-gabarito font-bold uppercase tracking-[0.08em] text-white md:text-base">
          {item.name}
        </h3>
        <p className="text-xs font-gabarito uppercase tracking-[0.22em] text-stone-400">
          {item.code}
        </p>
        <p className="mt-3 text-xs font-gabarito font-bold uppercase tracking-[0.22em] text-white/80">
          View sizes, finishes & edges
        </p>
      </div>
    </motion.div>
  );
}

function LimestoneCard({ item, hoveredId, setHoveredId, navigate }) {
  const openDetailPage = () => {
    navigate(`/limestone/${item.colorId}`);
  };

  return (
    <motion.div
      key={item.id}
      variants={itemVariants}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={openDetailPage}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDetailPage();
        }
      }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative mb-6 aspect-square overflow-hidden rounded-sm bg-neutral-950 cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22 }}
      >
        <motion.img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-contain p-2"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <AnimatePresence>
          {hoveredId === item.id && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={(event) => {
                  event.stopPropagation();
                  openDetailPage();
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="rounded-sm bg-white px-6 py-3 text-sm font-gabarito font-bold tracking-wide text-black transition-all hover:bg-gray-100"
              >
                VIEW DETAILS
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="cursor-pointer"
      >
        <h3 className="mb-2 text-sm font-gabarito font-bold text-white transition-colors duration-220 group-hover:text-gray-300 md:text-base">
          {item.name}
        </h3>
        <p className="text-xs font-gabarito uppercase tracking-wider text-gray-400">
          Code: {item.code}
        </p>
        <p className="mt-3 text-xs font-gabarito font-bold uppercase tracking-[0.22em] text-white/80">
          View sizes, finishes & edges
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function NewestStock() {
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredGraniteId, setHoveredGraniteId] = useState(null);
  const navigate = useNavigate();

  return (
    <section id="limestone-collection" className="bg-black px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-3 text-[11px] font-gabarito font-bold uppercase tracking-[0.32em] text-stone-400">
            Our Collections
          </p>
          <h2 className="text-3xl font-gabarito font-bold tracking-tight text-white md:text-h2">
            Granite & Limestone
          </h2>
        </motion.div>

        <div className="mb-20">
          <div className="mb-10">
            <h3 className="text-2xl font-gabarito font-bold tracking-tight text-white md:text-4xl">
              Granite Collection
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {graniteItems.map((item) => (
              <GraniteCard
                key={item.id}
                item={item}
                hoveredId={hoveredGraniteId}
                setHoveredId={setHoveredGraniteId}
                navigate={navigate}
              />
            ))}
          </motion.div>
        </div>

        <div>
          <div className="mb-10">
            <h3 className="text-2xl font-gabarito font-bold tracking-tight text-white md:text-4xl">
              Limestone Collection
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {limestoneItems.map((item) => (
              <LimestoneCard
                key={item.id}
                item={item}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                navigate={navigate}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
