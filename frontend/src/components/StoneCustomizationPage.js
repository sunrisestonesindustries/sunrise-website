import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteRequestModal from './QuoteRequestModal';

const COLOR_OPTIONS = [
  'Urban Blue Limestone',
  'Sunwashed Limestone',
  'Silver Ash Limestone',
  'Cudappah Black Limestone',
];

const SIZE_OPTIONS = [
  '30 x 30 cm',
  '60 x 30 cm',
  '60 x 60 cm',
  '60 x 90 cm',
  'Custom project size',
];

const THICKNESS_OPTIONS = [
  '2 cm',
  '3 cm',
  '4 cm',
  '5 cm',
  'Custom thickness',
];

const FINISH_OPTIONS = [
  'Natural',
  'Brushed',
  'Tumbled',
  'Tumbled and Brushed',
  'Sandblast',
  'Honed + Sandblast',
  'Bush Hammered',
  'Bush Hammered + Brushed',
];

const EDGE_OPTIONS = [
  'Machine Cut',
  'Hand Cut',
  'Pool Coping',
  'Eased Edge',
  'Custom Edge',
];

export default function StoneCustomizationPage({ onOpenContact, cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [formState, setFormState] = useState({
    color: location.state?.stoneName || COLOR_OPTIONS[0],
    size: SIZE_OPTIONS[0],
    thickness: THICKNESS_OPTIONS[0],
    finish: FINISH_OPTIONS[0],
    edge: EDGE_OPTIONS[0],
    notes: '',
  });

  const summary = useMemo(() => (
    [
      'Custom stone specification request:',
      `Color: ${formState.color}`,
      `Size: ${formState.size}`,
      `Thickness: ${formState.thickness}`,
      `Finish: ${formState.finish}`,
      `Edge: ${formState.edge}`,
      formState.notes ? `Notes: ${formState.notes}` : 'Notes: None provided yet.',
    ].join('\n')
  ), [formState]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-[#f7f3ea] min-h-screen">
      <Navbar
        onOpenModal={() => setIsQuoteOpen(true)}
        onOpenContact={onOpenContact}
        cartCount={cartCount}
      />

      <main className="px-6 pt-32 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-sm font-gabarito uppercase tracking-[0.22em] text-gray-500 hover:text-black"
          >
            ← Back
          </motion.button>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm md:p-8"
            >
              <p className="mb-4 text-xs font-gabarito uppercase tracking-[0.26em] text-gray-500">
                Custom Specifications
              </p>
              <h1 className="mb-4 text-4xl font-gabarito font-bold tracking-tight text-black md:text-5xl">
                Build Your Stone Specification
              </h1>
              <p className="mb-10 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                Tailor the limestone to your project with custom color, size, thickness, finish, and edge selections before requesting a quote.
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-gabarito font-semibold text-black">Stone Color</span>
                  <select
                    name="color"
                    value={formState.color}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  >
                    {COLOR_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-gabarito font-semibold text-black">Size</span>
                  <select
                    name="size"
                    value={formState.size}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  >
                    {SIZE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-gabarito font-semibold text-black">Thickness</span>
                  <select
                    name="thickness"
                    value={formState.thickness}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  >
                    {THICKNESS_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-gabarito font-semibold text-black">Finish</span>
                  <select
                    name="finish"
                    value={formState.finish}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  >
                    {FINISH_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-gabarito font-semibold text-black">Edge Profile</span>
                  <select
                    name="edge"
                    value={formState.edge}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  >
                    {EDGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-gabarito font-semibold text-black">Project Notes</span>
                  <textarea
                    name="notes"
                    value={formState.notes}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Share any project dimensions, intended use, quantity range, or special edge requests."
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </label>
              </div>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-[28px] border border-black bg-black p-6 text-white shadow-sm md:p-8"
            >
              <p className="mb-4 text-xs font-gabarito uppercase tracking-[0.26em] text-white/60">
                Quote Summary
              </p>
              <h2 className="mb-6 text-3xl font-gabarito font-bold tracking-tight">
                Ready for a custom quote?
              </h2>
              <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">Color</p>
                  <p className="mt-1 text-lg font-gabarito font-semibold">{formState.color}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">Size</p>
                  <p className="mt-1 text-lg font-gabarito font-semibold">{formState.size}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">Thickness</p>
                  <p className="mt-1 text-lg font-gabarito font-semibold">{formState.thickness}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">Finish</p>
                  <p className="mt-1 text-lg font-gabarito font-semibold">{formState.finish}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">Edge</p>
                  <p className="mt-1 text-lg font-gabarito font-semibold">{formState.edge}</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-white/70">
                We’ll attach these specifications to your quote request so the team can respond with the right cut, finish, and export-ready recommendation.
              </p>

              <button
                onClick={() => setIsQuoteOpen(true)}
                className="mt-8 w-full rounded-[22px] bg-white px-5 py-4 text-base font-gabarito font-bold tracking-wide text-black transition hover:bg-[#f7f3ea]"
              >
                Request Quote With Custom Specs
              </button>
            </motion.aside>
          </div>
        </div>
      </main>

      <Footer
        onOpenModal={() => setIsQuoteOpen(true)}
        onOpenContact={onOpenContact}
      />
      <QuoteRequestModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialData={{ inquiry: summary }}
      />
    </div>
  );
}
