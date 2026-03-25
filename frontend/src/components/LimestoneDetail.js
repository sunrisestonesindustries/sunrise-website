import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteRequestModal from './QuoteRequestModal';
import blueImage from '../Pictures/blue shade.webp';
import yellowImage from '../Pictures/Yellow shades.png';
import greyImage from '../Pictures/grey shades.png';
import yellowMachineCut from '../Pictures/YMC.png';
import yellowPoolCoping from '../Pictures/YPC.png';
import yellowHandCut from '../Pictures/Y HC.png';
import yellowEasedEdge from '../Pictures/YEE.png';
import blueMachineCut from '../Pictures/GMC.png';
import bluePoolCoping from '../Pictures/GPC.png';
import blueHandCut from '../Pictures/GHC.png';
import blueEasedEdge from '../Pictures/GEE.png';
import greyMachineCut from '../Pictures/BMC.png';
import greyPoolCoping from '../Pictures/BPC.png';
import greyHandCut from '../Pictures/BHC.png';
import greyEasedEdge from '../Pictures/BEE.png';

export default function LimestoneDetail({ cartItems = [], onAddToCart, onRemoveMatchingCartItem, onOpenContact }) {
  const { colorId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedEdge, setSelectedEdge] = useState('');
  const [addMessage, setAddMessage] = useState('');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [colorId]);

  useEffect(() => {
    if (!addMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setAddMessage('');
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [addMessage]);

  const limestoneData = {
    blue: {
      name: 'Blue Limestone',
      code: 'LST-BLU',
      image: blueImage,
      description: 'Premium blue limestone sourced directly from our Telangana mines. Known for its distinctive blue-gray tone and exceptional durability. Perfect for both contemporary and traditional architectural projects.',
      story: 'Formed over millions of years from ancient sea deposits, our Blue Limestone features a naturally rich blue-gray tone that adds sophistication to any space.',
      benefits: [
        { title: 'Timeless Elegance', desc: 'The distinctive blue-gray tone complements any architectural style' },
        { title: 'Exceptional Durability', desc: 'Engineered to withstand harsh weather and daily wear' },
        { title: 'Low Maintenance', desc: 'Simple care routine with minimal upkeep required' },
        { title: 'Versatile Applications', desc: 'Perfect for both indoor and outdoor projects' },
      ],
      types: [
        { name: 'Tiles', sizes: '30 x 30 to 60 x 120 CM in various thicknesses', icon: '▪️' },
        { name: 'Cutter Slabs', sizes: '120-150 x 60-90 x 3 & 4 CM', icon: '▪️' },
        { name: 'Palisades', sizes: '100 x 25 x 6 CM', icon: '▪️' },
        { name: 'Wall Cladding', sizes: '60 x 15 x 1.5-2.5 CM', icon: '▪️' },
        { name: 'Step Blocks', sizes: '100-120 x 35-40 x 14-16 CM', icon: '▪️' },
        { name: 'Mosaic', sizes: '30 x 30 x 1 CM', icon: '▪️' },
        { name: 'Pool Coping', sizes: '60-100 x 30-60 x 3 CM', icon: '▪️' },
        { name: 'Cobbles', sizes: '10 x 10 x 3-5-7-9 CM', icon: '▪️' },
        { name: 'Crazy Paving', sizes: '30-60 x 30-60 x 2.5-3.5 CM', icon: '▪️' },
        { name: 'Stepping Stones', sizes: '30 x 30, 60 x 40 x 2 & 3 CM', icon: '▪️' },
      ],
      finishes: [
        { name: 'Natural', image: null },
        { name: 'Brushed', image: null },
        { name: 'Tumbled', image: null },
        { name: 'Tumbled and Brushed', image: null },
        { name: 'Sandblast', image: null },
        { name: 'Honed + Sandblast', image: null },
        { name: 'Bush Hammered', image: null },
        { name: 'Bush Hammered + Brushed', image: null },
      ],
      edge: ['Machine cut', 'Hand cut', 'Pool coping', 'Eased edge'],
      maintenance: [
        'Sweep or vacuum regularly to remove dirt',
        'Wipe with damp cloth and neutral cleaners',
        'Avoid acidic cleaners',
        'Seal annually for enhanced protection',
        'Blot spills immediately',
      ],
      specs: [
        { label: 'Origin', value: 'Telangana, India' },
        { label: 'Density', value: '2.7 g/cm³' },
        { label: 'Compressive Strength', value: '170 MPa' },
        { label: 'Water Absorption', value: '0.5%' },
      ],
      applications: [
        'Residential Flooring',
        'Commercial Spaces',
        'Exterior Paving',
        'Wall Cladding',
        'Pool & Spa Surrounds',
        'Landscape Design',
        'Heritage & Restoration',
        'Hospitality Projects',
      ],
    },
    yellow: {
      name: 'Yellow Limestone',
      code: 'LST-YEL',
      image: yellowImage,
      description: 'Warm, golden yellow limestone that brings elegance to any project. This premium stone features excellent workability and consistent coloring throughout each piece.',
      story: 'Our Yellow Limestone offers a warm, inviting aesthetic with consistent coloring, making it ideal for creating welcoming spaces that radiate comfort and class.',
      benefits: [
        { title: 'Warm Aesthetic', desc: 'Golden tones create a welcoming and luxurious atmosphere' },
        { title: 'Easy Workability', desc: 'Perfect for precision cutting and custom designs' },
        { title: 'Consistent Coloring', desc: 'Uniform appearance throughout each piece' },
        { title: 'Aesthetic Versatility', desc: 'Works with contemporary and classic designs' },
      ],
      types: [
        { name: 'Tiles', sizes: '30 x 30 to 60 x 120 CM in various thicknesses', icon: '▪️' },
        { name: 'Cutter Slabs', sizes: '120-150 x 60-90 x 3 & 4 CM', icon: '▪️' },
        { name: 'Palisades', sizes: '100 x 25 x 6 CM', icon: '▪️' },
        { name: 'Wall Cladding', sizes: '60 x 15 x 1.5-2.5 CM', icon: '▪️' },
        { name: 'Step Blocks', sizes: '100-120 x 35-40 x 14-16 CM', icon: '▪️' },
        { name: 'Mosaic', sizes: '30 x 30 x 1 CM', icon: '▪️' },
        { name: 'Pool Coping', sizes: '60-100 x 30-60 x 3 CM', icon: '▪️' },
        { name: 'Cobbles', sizes: '10 x 10 x 3-5-7-9 CM', icon: '▪️' },
        { name: 'Crazy Paving', sizes: '30-60 x 30-60 x 2.5-3.5 CM', icon: '▪️' },
        { name: 'Stepping Stones', sizes: '30 x 30, 60 x 40 x 2 & 3 CM', icon: '▪️' },
      ],
      finishes: [
        { name: 'Natural', image: null },
        { name: 'Brushed', image: null },
        { name: 'Tumbled', image: null },
        { name: 'Tumbled and Brushed', image: null },
        { name: 'Sandblast', image: null },
        { name: 'Honed + Sandblast', image: null },
        { name: 'Bush Hammered', image: null },
        { name: 'Bush Hammered + Brushed', image: null },
      ],
      edge: ['Machine cut', 'Hand cut', 'Pool coping', 'Eased edge'],
      maintenance: [
        'Regular light sweeping prevents scratching',
        'Use soft mops with neutral pH cleaners',
        'Protect from prolonged moisture exposure',
        'Polish every 2-3 months for shine',
        'Use protective mats in high-traffic areas',
      ],
      specs: [
        { label: 'Origin', value: 'Telangana, India' },
        { label: 'Density', value: '2.6 g/cm³' },
        { label: 'Compressive Strength', value: '160 MPa' },
        { label: 'Water Absorption', value: '0.6%' },
      ],
      applications: [
        'Contemporary Interiors',
        'Premium Residential Flooring',
        'Accent Walls',
        'Garden Pathways',
        'Heritage Projects',
        'Luxury Renovations',
        'Boutique Retail',
        'Wellness Spaces',
      ],
    },
    grey: {
      name: 'Grey Limestone',
      code: 'LST-GRY',
      image: greyImage,
      description: 'Sophisticated grey limestone offering timeless elegance. Perfect for modern and traditional designs with its neutral, versatile tone that complements any aesthetic.',
      story: 'With its sophisticated neutral tone, Grey Limestone serves as a perfect backdrop for any design scheme, offering flexibility and timeless appeal.',
      benefits: [
        { title: 'Universal Appeal', desc: 'Neutral tone complements all design styles' },
        { title: 'Modern Sophistication', desc: 'Perfect for contemporary architectural projects' },
        { title: 'Aging Gracefully', desc: 'Develops character with time and use' },
        { title: 'Design Flexibility', desc: 'Works beautifully with all color palettes' },
      ],
      types: [
        { name: 'Tiles', sizes: '30 x 30 to 60 x 120 CM in various thicknesses', icon: '▪️' },
        { name: 'Cutter Slabs', sizes: '120-150 x 60-90 x 3 & 4 CM', icon: '▪️' },
        { name: 'Palisades', sizes: '100 x 25 x 6 CM', icon: '▪️' },
        { name: 'Wall Cladding', sizes: '60 x 15 x 1.5-2.5 CM', icon: '▪️' },
        { name: 'Step Blocks', sizes: '100-120 x 35-40 x 14-16 CM', icon: '▪️' },
        { name: 'Mosaic', sizes: '30 x 30 x 1 CM', icon: '▪️' },
        { name: 'Pool Coping', sizes: '60-100 x 30-60 x 3 CM', icon: '▪️' },
        { name: 'Cobbles', sizes: '10 x 10 x 3-5-7-9 CM', icon: '▪️' },
        { name: 'Crazy Paving', sizes: '30-60 x 30-60 x 2.5-3.5 CM', icon: '▪️' },
        { name: 'Stepping Stones', sizes: '30 x 30, 60 x 40 x 2 & 3 CM', icon: '▪️' },
      ],
      finishes: [
        { name: 'Natural', image: null },
        { name: 'Brushed', image: null },
        { name: 'Tumbled', image: null },
        { name: 'Tumbled and Brushed', image: null },
        { name: 'Sandblast', image: null },
        { name: 'Honed + Sandblast', image: null },
        { name: 'Bush Hammered', image: null },
        { name: 'Bush Hammered + Brushed', image: null },
      ],
      edge: ['Machine cut', 'Hand cut', 'Pool coping', 'Eased edge'],
      maintenance: [
        'Vacuum and sweep regularly',
        'Clean with pH neutral cleaners',
        'Avoid harsh chemicals',
        'Buff monthly to maintain shine',
        'Use stone-specific sealers annually',
      ],
      specs: [
        { label: 'Origin', value: 'Telangana, India' },
        { label: 'Density', value: '2.65 g/cm³' },
        { label: 'Compressive Strength', value: '165 MPa' },
        { label: 'Water Absorption', value: '0.55%' },
      ],
      applications: [
        'Contemporary & Modern Design',
        'Corporate & Office Spaces',
        'Minimalist Interiors',
        'Urban Landscaping',
        'Institutional Buildings',
        'Mixed-Use Projects',
        'Industrial & Warehouse',
        'Museum & Gallery Spaces',
      ],
    },
  };

  const stone = limestoneData[colorId];

  const getFinishName = (finish) => (typeof finish === 'string' ? finish : finish.name);
  const getEdgeImage = (edgeName) => {
    const edgeImagesByColor = {
      blue: {
        'Machine cut': blueMachineCut,
        'Pool coping': bluePoolCoping,
        'Hand cut': blueHandCut,
        'Eased edge': blueEasedEdge,
      },
      yellow: {
        'Machine cut': yellowMachineCut,
        'Pool coping': yellowPoolCoping,
        'Hand cut': yellowHandCut,
        'Eased edge': yellowEasedEdge,
      },
      grey: {
        'Machine cut': greyMachineCut,
        'Pool coping': greyPoolCoping,
        'Hand cut': greyHandCut,
        'Eased edge': greyEasedEdge,
      },
    };

    return edgeImagesByColor[colorId]?.[edgeName] || null;
  };

  const handleSizeSelect = (sizeName) => {
    setSelectedSize(sizeName);
    setSelectedFinish('');
    setSelectedEdge('');
  };

  const handleFinishSelect = (finishName) => {
    if (!selectedSize) {
      return;
    }

    setSelectedFinish(finishName);
    setSelectedEdge('');
  };

  const handleEdgeSelect = (edgeName) => {
    if (!selectedFinish) {
      return;
    }

    setSelectedEdge(edgeName);
    if (selectedEdge !== edgeName) {
      handleAddToCart(edgeName, 1);
    }
  };

  const handleAddToCart = (edgeName = selectedEdge, quantity = 1) => {
    if (!stone || !selectedSize || !selectedFinish || !edgeName) {
      return;
    }

    const cartItem = {
      id: `${stone.code}-${selectedSize}-${selectedFinish}-${edgeName}`,
      stoneName: stone.name,
      stoneCode: stone.code,
      colorId,
      size: selectedSize,
      finish: selectedFinish,
      edge: edgeName,
      sqm: quantity,
    };

    onAddToCart?.(cartItem);
  };

  const handleRemoveFromCart = (quantity = 1) => {
    if (!stone || !selectedSize || !selectedFinish || !selectedEdge) {
      return;
    }

    onRemoveMatchingCartItem?.({
      colorId,
      size: selectedSize,
      finish: selectedFinish,
      edge: selectedEdge,
      sqm: quantity,
    });
  };
  const selectedCartItem = cartItems.find((item) => (
    item.colorId === colorId
    && item.size === selectedSize
    && item.finish === selectedFinish
    && item.edge === selectedEdge
  ));

  const selectedCartCount = selectedCartItem?.sqm || 0;
  const cartCount = cartItems.reduce((sum, item) => sum + (item.sqm || 0), 0);
  const themeByColor = {
    blue: {
      panel: 'border-sky-200 bg-sky-50/70',
      inner: 'border-sky-200 bg-white',
      step: 'bg-sky-100/80',
      stat: 'bg-sky-900 text-white',
      message: 'border-sky-900 bg-sky-900 text-white',
    },
    yellow: {
      panel: 'border-amber-200 bg-amber-50/80',
      inner: 'border-amber-200 bg-white',
      step: 'bg-amber-100/80',
      stat: 'bg-amber-700 text-white',
      message: 'border-amber-700 bg-amber-700 text-white',
    },
    grey: {
      panel: 'border-slate-400 bg-slate-200/90',
      inner: 'border-slate-400 bg-slate-50',
      step: 'bg-slate-300/80',
      stat: 'bg-slate-800 text-white',
      message: 'border-slate-800 bg-slate-800 text-white',
    },
  };
  const selectionTheme = themeByColor[colorId] || themeByColor.grey;

  if (!stone) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar
          onOpenModal={() => setIsModalOpen(true)}
          onOpenContact={onOpenContact}
          cartCount={cartCount}
        />
        <div className="py-20 text-center pt-40">
          <h1 className="text-3xl font-bold">Stone not found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800"
          >
            Back to Collection
          </button>
        </div>
        <Footer />
        <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onOpenContact={onOpenContact}
        cartCount={cartCount}
      />

      <main className="pt-32">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-12 py-6 max-w-7xl mx-auto"
        >
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-black transition-colors font-gabarito"
          >
            ← Back to Limestone Collection
          </button>
        </motion.div>

        {/* Main Content */}
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-sm overflow-hidden shadow-lg h-96 md:h-[500px]">
                <img
                  src={stone.image}
                  alt={stone.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <p className="text-sm font-gabarito text-gray-600 uppercase tracking-wide mb-2">
                Product Code: {stone.code}
              </p>
              <h1 className="text-4xl md:text-5xl font-gabarito font-bold text-black mb-6">
                {stone.name}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {stone.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stone.specs.map((spec, idx) => (
                  <div key={idx} className="p-4 bg-gray-100 rounded-sm">
                    <p className="text-xs font-gabarito text-gray-600 uppercase tracking-wide mb-2">
                      {spec.label}
                    </p>
                    <p className="text-lg font-gabarito font-bold text-black">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-black text-white font-gabarito font-bold tracking-wide rounded-sm hover:bg-gray-800 transition-all duration-220"
              >
                Request Quote
              </button>
            </motion.div>
          </div>

          {/* Available Sizes & Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-black mb-12">
              Available Sizes & Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stone.types.map((type, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleSizeSelect(type.name)}
                  className={`p-6 border rounded-lg bg-white transition-all duration-300 cursor-pointer ${
                    selectedSize === type.name
                      ? 'border-black shadow-xl ring-1 ring-black'
                      : 'border-gray-200 hover:shadow-xl'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-gabarito font-bold text-black">
                      {type.name}
                    </h3>
                    {selectedSize === type.name && (
                      <span className="rounded-full bg-black px-3 py-1 text-xs font-gabarito uppercase tracking-wide text-white">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{type.sizes}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Finishing Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-black mb-12">
              Finishing Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stone.finishes.map((finish, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={selectedSize ? { y: -4, scale: 1.01 } : undefined}
                  onClick={() => handleFinishSelect(getFinishName(finish))}
                  className={`flex min-h-[84px] items-center justify-center rounded-xl border px-5 py-6 text-center transition-all duration-300 ${
                    !selectedSize
                      ? 'cursor-not-allowed border-gray-200 opacity-40'
                      : selectedFinish === getFinishName(finish)
                        ? 'cursor-pointer border-black shadow-xl ring-1 ring-black'
                        : 'cursor-pointer border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <p className="w-full font-gabarito font-semibold text-black text-base">
                    {getFinishName(finish)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Edge Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-black mb-8">
              Edge Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stone.edge.map((edgeType, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => handleEdgeSelect(edgeType)}
                  whileHover={selectedFinish ? { scale: 1.05 } : undefined}
                  className={`p-4 text-center border rounded-lg bg-white transition-all duration-300 focus:outline-none ${
                    !selectedFinish
                      ? 'cursor-not-allowed border-gray-200 opacity-40'
                      : selectedEdge === edgeType
                        ? 'border-black shadow-lg ring-1 ring-black'
                        : 'border-gray-200 hover:shadow-lg'
                  }`}
                >
                  {getEdgeImage(edgeType) ? (
                    <div className="mb-4 w-full aspect-video bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                      <motion.img
                        src={getEdgeImage(edgeType)}
                        alt={edgeType}
                        className="w-full h-full object-cover"
                        whileHover={selectedFinish ? { scale: 1.08 } : undefined}
                        transition={{ type: 'spring', stiffness: 100 }}
                      />
                    </div>
                  ) : null}
                  <p className="font-gabarito font-medium text-black">{edgeType}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Selection Cart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className={`mb-16 rounded-[28px] border p-8 md:p-12 shadow-[0_22px_70px_rgba(15,23,42,0.08)] ${selectionTheme.panel}`}
          >
            <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-black mb-4">
              Product Specifications
            </h2>
            <p className="mb-8 max-w-3xl text-gray-600">
              Select size, finish, and edge. The item will be added to your cart automatically.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`mb-8 rounded-[24px] border p-6 md:p-8 ${selectionTheme.inner}`}
            >
              <h3 className="mb-5 text-xl font-gabarito font-bold text-black">Current Configuration</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 text-sm font-gabarito">
                <div className={`rounded-2xl p-4 ${selectionTheme.step}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Size</p>
                  <p className="mt-3 text-base font-semibold text-black">{selectedSize || 'Select a size'}</p>
                </div>
                <div className={`rounded-2xl p-4 ${selectionTheme.step}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Finish</p>
                  <p className="mt-3 text-base font-semibold text-black">{selectedFinish || 'Select a finish'}</p>
                </div>
                <div className={`rounded-2xl p-4 ${selectionTheme.step}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Edge</p>
                  <p className="mt-3 text-base font-semibold text-black">{selectedEdge || 'Select an edge'}</p>
                </div>
                <div className={`rounded-2xl p-4 ${selectionTheme.stat}`}>
                  <p className="mb-2 uppercase tracking-[0.18em] text-white/60">In Cart</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/50">Current selection</p>
                  <p className="mt-2 text-3xl font-bold">{selectedCartCount}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="overflow-hidden rounded-[22px] border border-black/15 bg-white">
                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-xs font-gabarito uppercase tracking-[0.24em] text-gray-400">Cart Quantity</p>
                    <p className="mt-2 text-lg font-gabarito font-semibold text-black">
                      {selectedSize && selectedFinish && selectedEdge
                        ? 'Use these controls to adjust this exact selection'
                        : 'Complete all three steps to activate quantity controls'}
                    </p>
                  </div>
                  <div className="flex items-center overflow-hidden rounded-full border border-black/15">
                    <button
                      onClick={() => handleRemoveFromCart(1)}
                      disabled={!selectedEdge || selectedCartCount === 0}
                      className={`flex h-14 w-14 items-center justify-center text-3xl font-gabarito transition-colors duration-220 ${
                        selectedEdge && selectedCartCount > 0
                          ? 'bg-white text-black hover:bg-gray-100'
                          : 'cursor-not-allowed bg-gray-100 text-gray-300'
                      }`}
                      aria-label="Decrease cart quantity"
                    >
                      -
                    </button>
                    <div className="flex h-14 min-w-20 items-center justify-center border-l border-r border-black/10 px-5 text-xl font-gabarito font-bold text-black">
                      {selectedCartCount}
                    </div>
                    <button
                      onClick={() => handleAddToCart(selectedEdge, 1)}
                      disabled={!selectedEdge}
                      className={`flex h-14 w-14 items-center justify-center text-3xl font-gabarito transition-colors duration-220 ${
                        selectedEdge
                          ? 'bg-white text-black hover:bg-gray-100'
                          : 'cursor-not-allowed bg-gray-100 text-gray-300'
                      }`}
                      aria-label="Increase cart quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-stretch overflow-hidden rounded-[22px] border border-black bg-black text-white">
                <button
                  onClick={handleRemoveFromCart}
                  disabled={selectedCartCount === 0}
                  className={`flex w-16 items-center justify-center text-2xl font-gabarito transition-colors duration-220 ${
                    selectedCartCount > 0
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'cursor-not-allowed bg-white/60 text-black/30'
                  }`}
                  aria-label="Remove one selected item"
                >
                  -
                </button>
                <div className="flex flex-1 items-center justify-center border-l border-r border-white/20 px-4 text-center text-sm font-gabarito font-bold uppercase tracking-[0.2em] text-white">
                  Selected Item
                </div>
                <button
                  onClick={() => handleAddToCart(selectedEdge, 1)}
                  disabled={!selectedEdge}
                  className={`flex w-16 items-center justify-center text-2xl font-gabarito transition-colors duration-220 ${
                    selectedEdge
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'cursor-not-allowed bg-white/60 text-black/30'
                  }`}
                  aria-label="Add one selected item"
                >
                  +
                </button>
              </div>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-[22px] border-2 border-black bg-white py-4 text-black font-gabarito font-bold tracking-wide transition-all duration-220 hover:bg-black hover:text-white md:col-span-2"
              >
                Request Quote
              </motion.button>
            </div>
          </motion.div>

          {/* Applications - Popular Uses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-black mb-12">
              Popular Uses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stone.applications.map((app, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -5, shadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                  className="p-5 border-l-4 border-black bg-white rounded-sm hover:shadow-lg transition-all duration-300"
                >
                  <p className="font-gabarito font-semibold text-black text-center md:text-left">{app}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Maintenance Tips Section - Care & Maintenance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-black mb-8">
              Care & Maintenance
            </h2>
            <div className="space-y-4">
              {stone.maintenance.map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-5 p-5 bg-white border border-gray-200 rounded-sm hover:border-black hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-gabarito font-bold text-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-gabarito text-black leading-relaxed">{tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </section>
      </main>

      <Footer />
      <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
