import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../Pictures/logo1.webp';

const FIELD_LABELS = {
  name: 'Full Name',
  contact: 'Phone/Contact',
  email: 'Email',
  country: 'Country',
  state: 'State/Region',
  inquiry: 'Your Inquiry',
};

const EMPTY_INITIAL_DATA = Object.freeze({});

const getDefaultFormData = (initialData = {}) => ({
  name: '',
  contact: '',
  email: '',
  country: '',
  state: '',
  inquiry: initialData.inquiry || '',
});

export default function QuoteRequestModal({ isOpen, onClose, cartItems = [], initialData = EMPTY_INITIAL_DATA }) {
  const initialInquiry = initialData?.inquiry || '';
  const [formData, setFormData] = useState(getDefaultFormData({ inquiry: initialInquiry }));
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData(getDefaultFormData({ inquiry: initialInquiry }));
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
  }, [isOpen, initialInquiry]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    const missingField = Object.entries(trimmedFormData).find(([, value]) => !value);
    if (missingField) {
      setSubmitError(`${FIELD_LABELS[missingField[0]]} is required.`);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedFormData.email)) {
      setSubmitError('Email must be in the format name@example.com.');
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = new URL('/api/quote', window.location.origin).toString();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...trimmedFormData,
          cartItems,
        }),
      });

      const responseType = response.headers.get('content-type') || '';
      const result = responseType.includes('application/json')
        ? await response.json()
        : { error: await response.text() };

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      setSubmitted(true);

      window.setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      if (error.message === 'The string did not match the expected pattern.') {
        setSubmitError('Quote request could not be submitted. If you are testing locally, make sure the backend API is running on http://127.0.0.1:5001.');
      } else if (error.message === 'Failed to fetch') {
        setSubmitError('Quote request could not reach the server. If you are testing locally, start the backend API on http://127.0.0.1:5001.');
      } else {
        setSubmitError(error.message || 'Failed to submit quote request');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(getDefaultFormData({ inquiry: initialInquiry }));
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-xl rounded-lg bg-white shadow-2xl">
              {/* Close Button */}
              <motion.button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl text-gray-600">✕</span>
              </motion.button>

              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-5 md:px-8">
                <h2 className="text-2xl font-gabarito font-bold text-black">
                  Request Quote
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Fill in your details and we'll get back to you soon
                </p>
              </div>

              {/* Form */}
              {!submitted ? (
                <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2 md:px-8">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-gabarito font-semibold text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-gabarito font-semibold text-black mb-2">
                      Phone/Contact *
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      placeholder="Your phone number"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-gabarito font-semibold text-black mb-2">
                      Email *
                    </label>
                    <input
                      type="text"
                      inputMode="email"
                      autoComplete="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-gabarito font-semibold text-black mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      placeholder="Your country"
                    />
                  </div>

                  {/* State/Region */}
                  <div>
                    <label className="block text-sm font-gabarito font-semibold text-black mb-2">
                      State/Region *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      placeholder="Your state or region"
                    />
                  </div>

                  {/* Inquiry */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-gabarito font-semibold text-black mb-2">
                      Your Inquiry *
                    </label>
                    <textarea
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none"
                      placeholder="Tell us about your project and requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  {submitError && (
                    <p className="text-sm font-gabarito text-red-600 md:col-span-2">
                      {submitError}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-black text-white font-gabarito font-bold tracked-wide rounded-sm hover:bg-gray-800 transition-all duration-220 md:col-span-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </motion.button>
                </form>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 py-8 text-center md:px-8"
                >
                  <motion.div
                    animate={{ scale: [0.96, 1.04, 1] }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] border border-black/10 bg-[#f7f3ea] shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
                  >
                    <img
                      src={logoImage}
                      alt="Sunrise Stones Industries Logo"
                      className="h-16 w-16 object-contain"
                    />
                  </motion.div>
                  <p
                    className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gray-500"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
                  >
                    Submission Received
                  </p>
                  <h3
                    className="mb-3 text-3xl font-semibold tracking-[-0.04em] text-black"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
                  >
                    Thank you.
                  </h3>
                  <p
                    className="mx-auto max-w-sm text-[15px] leading-7 text-gray-600"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                  >
                    Your request has been submitted successfully. We&apos;ll contact you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
