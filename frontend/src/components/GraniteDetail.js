import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteRequestModal from './QuoteRequestModal';
import graniteAlaskaRed from '../Pictures/tan red granite.png';
import graniteJuparana from '../Pictures/Indian Juparana Granite.png';
import graniteKashmirWhite from '../Pictures/White Granite. Kashmir.jpeg';
import graniteParadiso from '../Pictures/Paradiso Bash Granite. (1).png';
import graniteSapphire from '../Pictures/Sapphire Blue granite stone (1).png';

const GRANITE_TYPES = [
  { name: 'Gang Saw Slabs', sizes: '96"-130" x 60"-78", 2 cm and 3 cm thickness' },
  { name: 'Cutter Slabs', sizes: '72"-96" x 24"-36", 2 cm and 3 cm thickness' },
  { name: 'Tiles', sizes: '12" x 12", 16" x 16", 24" x 24", custom cut sizes' },
  { name: 'Countertops', sizes: 'Custom fabricated to project drawings and sink/cooktop cutouts' },
  { name: 'Vanity Tops', sizes: 'Custom bathroom tops with edge and backsplash options' },
  { name: 'Stair Treads & Risers', sizes: 'Custom lengths, 1.2"-2" thickness, indoor and outdoor use' },
];

const GRANITE_FINISHES = [
  'Polished',
  'Honed',
  'Leathered',
  'Flamed',
  'Brushed',
  'Sandblasted',
];

const GRANITE_EDGES = [
  'Straight edge',
  'Eased edge',
  'Beveled edge',
  'Half bullnose',
  'Full bullnose',
  'Ogee edge',
];

const graniteData = {
  'alaska-red': {
    name: 'Alaska Red Granite',
    code: 'GRT-ALR',
    image: graniteAlaskaRed,
    accent: 'red',
    description: 'A bold red granite with tan, cream, and charcoal movement. It is a strong choice for statement flooring, countertops, wall features, and exterior architectural work.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Use', value: 'Indoor & Outdoor' },
    ],
    applications: [
      'Kitchen Countertops',
      'Feature Walls',
      'Flooring',
      'Staircases',
      'Exterior Cladding',
      'Commercial Lobbies',
      'Vanity Tops',
      'Table Tops',
    ],
  },
  'indian-juparana': {
    name: 'Indian Juparana Granite',
    code: 'GRT-IJG',
    image: graniteJuparana,
    accent: 'amber',
    description: 'A warm flowing granite with peach, beige, grey, and brown mineral patterns. It works well where natural movement and a softer luxury finish are needed.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Pattern', value: 'Flowing Veins' },
    ],
    applications: [
      'Countertops',
      'Flooring',
      'Wall Panels',
      'Reception Desks',
      'Bathroom Vanities',
      'Stair Treads',
      'Hotel Interiors',
      'Fireplace Surrounds',
    ],
  },
  'kashmir-white': {
    name: 'Kashmir White Granite',
    code: 'GRT-KWG',
    image: graniteKashmirWhite,
    accent: 'slate',
    description: 'A light granite with soft white, grey, and burgundy mineral accents. It brings a clean premium look to kitchens, flooring, and bright interior spaces.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Light Neutral' },
    ],
    applications: [
      'Kitchen Islands',
      'Premium Flooring',
      'Bathroom Vanities',
      'Backsplashes',
      'Wall Cladding',
      'Table Tops',
      'Retail Interiors',
      'Residential Projects',
    ],
  },
  'paradiso-ash': {
    name: 'Paradiso Ash Granite',
    code: 'GRT-PAG',
    image: graniteParadiso,
    accent: 'violet',
    description: 'A dramatic granite with ash, violet, and grey wave movement. It is ideal for high-impact installations that need a rich natural pattern.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Pattern', value: 'Wave Movement' },
    ],
    applications: [
      'Feature Walls',
      'Countertops',
      'Flooring',
      'Staircases',
      'Reception Areas',
      'Luxury Bathrooms',
      'Exterior Facades',
      'Custom Furniture',
    ],
  },
  'sapphire-blue': {
    name: 'Sapphire Blue Granite',
    code: 'GRT-SBG',
    image: graniteSapphire,
    accent: 'blue',
    description: 'A deep blue-grey granite with crystalline movement and a refined surface character. It suits premium interiors, counters, and exterior stonework.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Blue Grey' },
    ],
    applications: [
      'Kitchen Countertops',
      'Flooring',
      'Wall Features',
      'Bathroom Vanities',
      'Outdoor Paving',
      'Commercial Counters',
      'Staircases',
      'Architectural Details',
    ],
  },
};

const themeByAccent = {
  red: {
    panel: 'border-red-200 bg-red-50/70',
    step: 'bg-red-100/70',
    stat: 'bg-red-950 text-white',
    message: 'border-red-950 bg-red-950 text-white',
  },
  amber: {
    panel: 'border-amber-200 bg-amber-50/80',
    step: 'bg-amber-100/80',
    stat: 'bg-amber-800 text-white',
    message: 'border-amber-800 bg-amber-800 text-white',
  },
  slate: {
    panel: 'border-slate-300 bg-slate-100/90',
    step: 'bg-white',
    stat: 'bg-slate-800 text-white',
    message: 'border-slate-800 bg-slate-800 text-white',
  },
  violet: {
    panel: 'border-violet-200 bg-violet-50/70',
    step: 'bg-violet-100/70',
    stat: 'bg-violet-950 text-white',
    message: 'border-violet-950 bg-violet-950 text-white',
  },
  blue: {
    panel: 'border-sky-200 bg-sky-50/70',
    step: 'bg-sky-100/70',
    stat: 'bg-sky-950 text-white',
    message: 'border-sky-950 bg-sky-950 text-white',
  },
};

export default function GraniteDetail({ cartItems = [], onAddToCart, onRemoveMatchingCartItem, onOpenContact }) {
  const { graniteId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedEdge, setSelectedEdge] = useState('');
  const [addMessage, setAddMessage] = useState('');

  const stone = graniteData[graniteId];
  const cartCount = cartItems.reduce((sum, item) => sum + (item.sqm || 0), 0);
  const selectedCartItem = cartItems.find((item) => (
    item.colorId === graniteId
    && item.size === selectedSize
    && item.finish === selectedFinish
    && item.edge === selectedEdge
  ));
  const selectedCartCount = selectedCartItem?.sqm || 0;
  const selectionTheme = themeByAccent[stone?.accent] || themeByAccent.slate;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [graniteId]);

  useEffect(() => {
    if (!addMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setAddMessage('');
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [addMessage]);

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
  };

  const handleAddToCart = (edgeName = selectedEdge, quantity = 1) => {
    if (!stone || !selectedSize || !selectedFinish || !edgeName) {
      return;
    }

    onAddToCart?.({
      id: `${stone.code}-${selectedSize}-${selectedFinish}-${edgeName}`,
      category: 'granite',
      stoneName: stone.name,
      stoneCode: stone.code,
      colorId: graniteId,
      size: selectedSize,
      finish: selectedFinish,
      edge: edgeName,
      sqm: quantity,
    });
    setAddMessage(`${stone.name} added to cart.`);
  };

  const handleRemoveFromCart = (quantity = 1) => {
    if (!stone || !selectedSize || !selectedFinish || !selectedEdge) {
      return;
    }

    onRemoveMatchingCartItem?.({
      colorId: graniteId,
      size: selectedSize,
      finish: selectedFinish,
      edge: selectedEdge,
      sqm: quantity,
    });
  };

  const handleCustomizeSpecs = () => {
    navigate('/customize-stone', {
      state: {
        stoneName: stone?.name,
        colorId: graniteId,
      },
    });
  };

  if (!stone) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onOpenModal={() => setIsModalOpen(true)} onOpenContact={onOpenContact} cartCount={cartCount} />
        <div className="px-6 pt-40 text-center">
          <h1 className="text-3xl font-gabarito font-bold text-black">Granite not found</h1>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'limestone-collection' } })}
            className="mt-6 rounded-sm bg-black px-6 py-3 font-gabarito font-semibold text-white hover:bg-gray-800"
          >
            Back to Collection
          </button>
        </div>
        <Footer onOpenModal={() => setIsModalOpen(true)} onOpenContact={onOpenContact} />
        <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onOpenContact={onOpenContact}
        cartCount={cartCount}
      />

      <main className="pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl px-6 py-6 md:px-12"
        >
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'limestone-collection' } })}
            className="font-gabarito text-gray-600 transition-colors hover:text-black"
          >
            Back to Granite Collection
          </button>
        </motion.div>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 overflow-hidden rounded-sm shadow-lg md:h-[500px]">
                <img src={stone.image} alt={stone.name} className="h-full w-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <p className="mb-2 font-gabarito text-sm uppercase tracking-wide text-gray-600">
                Product Code: {stone.code}
              </p>
              <h1 className="mb-6 text-4xl font-gabarito font-bold text-black md:text-5xl">
                {stone.name}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                {stone.description}
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4">
                {stone.specs.map((spec) => (
                  <div key={spec.label} className="rounded-sm bg-gray-100 p-4">
                    <p className="mb-2 font-gabarito text-xs uppercase tracking-wide text-gray-600">
                      {spec.label}
                    </p>
                    <p className="font-gabarito text-lg font-bold text-black">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 rounded-sm bg-black py-4 font-gabarito font-bold tracking-wide text-white transition-all duration-220 hover:bg-gray-800"
                >
                  Request Quote
                </button>
                <button
                  onClick={handleCustomizeSpecs}
                  className="rounded-sm border border-black px-5 py-3 font-gabarito text-sm font-semibold tracking-wide text-black transition-all duration-220 hover:bg-black hover:text-white sm:w-auto"
                >
                  Customize Specs
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="mb-12 text-3xl font-gabarito font-bold text-black md:text-4xl">
              Available Granite Sizes & Products
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {GRANITE_TYPES.map((type, index) => (
                <motion.button
                  key={type.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleSizeSelect(type.name)}
                  className={`rounded-lg border bg-white p-6 text-left transition-all duration-300 ${
                    selectedSize === type.name
                      ? 'border-black shadow-xl ring-1 ring-black'
                      : 'border-gray-200 hover:shadow-xl'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="font-gabarito text-lg font-bold text-black">{type.name}</h3>
                    {selectedSize === type.name && (
                      <span className="rounded-full bg-black px-3 py-1 font-gabarito text-xs uppercase tracking-wide text-white">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{type.sizes}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="mb-12 text-3xl font-gabarito font-bold text-black md:text-4xl">
              Granite Finish Options
            </h2>
            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {GRANITE_FINISHES.map((finish, index) => (
                <motion.button
                  key={finish}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  whileHover={selectedSize ? { y: -4 } : undefined}
                  onClick={() => handleFinishSelect(finish)}
                  className={`flex min-h-[84px] items-center justify-center rounded-xl border px-5 py-6 text-center transition-all duration-300 ${
                    !selectedSize
                      ? 'cursor-not-allowed border-gray-200 opacity-40'
                      : selectedFinish === finish
                        ? 'border-black shadow-xl ring-1 ring-black'
                        : 'border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <span className="font-gabarito text-base font-semibold text-black">{finish}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-3xl font-gabarito font-bold text-black md:text-4xl">
              Edge Profiles
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {GRANITE_EDGES.map((edge, index) => (
                <motion.button
                  key={edge}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  whileHover={selectedFinish ? { scale: 1.03 } : undefined}
                  onClick={() => handleEdgeSelect(edge)}
                  className={`rounded-lg border bg-white p-5 text-center transition-all duration-300 ${
                    !selectedFinish
                      ? 'cursor-not-allowed border-gray-200 opacity-40'
                      : selectedEdge === edge
                        ? 'border-black shadow-lg ring-1 ring-black'
                        : 'border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <p className="font-gabarito font-medium text-black">{edge}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className={`mb-16 rounded-[28px] border p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-12 ${selectionTheme.panel}`}
          >
            <h2 className="mb-4 text-3xl font-gabarito font-bold text-black md:text-4xl">
              Product Specifications
            </h2>
            <p className="mb-8 max-w-3xl text-gray-600">
              Select the granite product type, finish, and edge profile, then add the exact specification to your quote cart.
            </p>

            <div className="mb-8 rounded-[24px] border border-black/10 bg-white p-6 md:p-8">
              <h3 className="mb-5 font-gabarito text-xl font-bold text-black">Current Configuration</h3>
              <div className="grid grid-cols-1 gap-4 font-gabarito text-sm md:grid-cols-4">
                <div className={`rounded-2xl p-4 ${selectionTheme.step}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Product</p>
                  <p className="mt-3 text-base font-semibold text-black">{selectedSize || 'Select a product'}</p>
                </div>
                <div className={`rounded-2xl p-4 ${selectionTheme.step}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Finish</p>
                  <p className="mt-3 text-base font-semibold text-black">{selectedFinish || 'Select a finish'}</p>
                </div>
                <div className={`rounded-2xl p-4 ${selectionTheme.step}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Edge</p>
                  <p className="mt-3 text-base font-semibold text-black">{selectedEdge || 'Select an edge'}</p>
                </div>
                <div className={`rounded-2xl p-4 ${selectionTheme.stat}`}>
                  <p className="mb-2 uppercase tracking-[0.18em] text-white/60">In Cart</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/50">Current selection</p>
                  <p className="mt-2 text-3xl font-bold">{selectedCartCount}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="overflow-hidden rounded-[22px] border border-black/15 bg-white">
                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="font-gabarito text-xs uppercase tracking-[0.24em] text-gray-400">Cart Quantity</p>
                    <p className="mt-2 font-gabarito text-lg font-semibold text-black">
                      {selectedCartCount > 0
                        ? 'Adjust this exact granite selection'
                        : 'Add this specification to activate quantity controls'}
                    </p>
                  </div>
                  <div className="flex items-center overflow-hidden rounded-full border border-black/15">
                    <button
                      onClick={() => handleRemoveFromCart(1)}
                      disabled={!selectedEdge || selectedCartCount === 0}
                      className={`flex h-14 w-14 items-center justify-center font-gabarito text-3xl transition-colors duration-220 ${
                        selectedEdge && selectedCartCount > 0
                          ? 'bg-white text-black hover:bg-gray-100'
                          : 'cursor-not-allowed bg-gray-100 text-gray-300'
                      }`}
                      aria-label="Decrease cart quantity"
                    >
                      -
                    </button>
                    <div className="flex h-14 min-w-20 items-center justify-center border-l border-r border-black/10 px-5 font-gabarito text-xl font-bold text-black">
                      {selectedCartCount}
                    </div>
                    <button
                      onClick={() => handleAddToCart(selectedEdge, 1)}
                      disabled={!selectedEdge || selectedCartCount === 0}
                      className={`flex h-14 w-14 items-center justify-center font-gabarito text-3xl transition-colors duration-220 ${
                        selectedEdge && selectedCartCount > 0
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

              <motion.button
                onClick={() => handleAddToCart(selectedEdge, 1)}
                whileHover={selectedEdge ? { scale: 1.01 } : undefined}
                whileTap={selectedEdge ? { scale: 0.99 } : undefined}
                disabled={!selectedEdge}
                className={`rounded-[22px] py-4 font-gabarito text-base font-bold uppercase tracking-[0.18em] transition-all duration-220 ${
                  selectedEdge
                    ? 'border border-black bg-black text-white hover:bg-gray-800'
                    : 'cursor-not-allowed border border-black/10 bg-black/10 text-black/35'
                }`}
              >
                Add to Cart
              </motion.button>

              {addMessage && (
                <p className={`rounded-[18px] border px-5 py-3 font-gabarito text-sm ${selectionTheme.message}`}>
                  {addMessage}
                </p>
              )}

              <div className="grid gap-3 md:col-span-2 md:grid-cols-[minmax(0,1fr)_auto]">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-[22px] border-2 border-black bg-white py-4 font-gabarito font-bold tracking-wide text-black transition-all duration-220 hover:bg-black hover:text-white"
                >
                  Request Quote
                </motion.button>
                <motion.button
                  onClick={handleCustomizeSpecs}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-[22px] border border-black px-5 py-4 font-gabarito text-sm font-semibold tracking-wide text-black transition-all duration-220 hover:bg-black hover:text-white"
                >
                  Customize Specs
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="mb-12 text-3xl font-gabarito font-bold text-black md:text-4xl">
              Popular Uses
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stone.applications.map((application, index) => (
                <motion.div
                  key={application}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                  className="rounded-sm border-l-4 border-black bg-white p-5 transition-all duration-300 hover:shadow-lg"
                >
                  <p className="text-center font-gabarito font-semibold text-black md:text-left">{application}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer onOpenModal={() => setIsModalOpen(true)} onOpenContact={onOpenContact} />
      <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
