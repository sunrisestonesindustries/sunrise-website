import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: 'sunrisestonesindustries@gmail.com',
    href: 'mailto:sunrisestonesindustries@gmail.com',
  },
  {
    label: 'Phone',
    value: '+1 (908) 800-2340',
    href: 'tel:+19088002340',
  },
  {
    label: 'Website',
    value: 'www.sunrisestonesindustries.com',
    href: 'https://www.sunrisestonesindustries.com',
  },
];

export default function ContactDetailsModal({ isOpen, onClose }) {
  const [copiedLabel, setCopiedLabel] = useState('');

  useEffect(() => {
    if (!copiedLabel) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCopiedLabel('');
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [copiedLabel]);

  const handleCopy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
    } catch (_error) {
      setCopiedLabel('');
    }
  };

  const handleClose = () => {
    setCopiedLabel('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-xl rounded-[28px] border border-black/8 bg-white p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-black/55 transition-colors hover:bg-gray-100 hover:text-black"
              >
                ×
              </button>

              <p className="text-xs font-gabarito uppercase tracking-[0.35em] text-black/45">
                Contact Details
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-gabarito font-bold tracking-tight text-black">
                Reach Sunrise Stone
              </h2>

              <div className="mt-8 space-y-5">
                {CONTACT_DETAILS.map((item) => (
                  <div
                    key={item.label}
                    className="py-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-gabarito uppercase tracking-[0.28em] text-black/45">
                          {item.label}
                        </p>
                        <a
                          href={item.href}
                          target={item.label === 'Website' ? '_blank' : undefined}
                          rel={item.label === 'Website' ? 'noreferrer' : undefined}
                          className="mt-2 block text-base md:text-lg font-gabarito font-semibold text-black break-all hover:text-black/65 transition-colors"
                        >
                          {item.value}
                        </a>
                      </div>

                      <button
                        onClick={() => handleCopy(item.label, item.value)}
                        aria-label={`Copy ${item.label}`}
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-220 ${
                          copiedLabel === item.label
                            ? 'border-black bg-black text-white'
                            : 'border-black/15 bg-white text-black hover:border-black hover:bg-black hover:text-white'
                        }`}
                      >
                        {copiedLabel === item.label ? (
                          <span className="text-xs font-gabarito font-bold">✓</span>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                          >
                            <rect x="9" y="9" width="10" height="10" rx="2" />
                            <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
