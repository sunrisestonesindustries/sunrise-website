import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MultiStepModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    stoneType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle submission
    onClose();
    setStep(1);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setFormData({
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      stoneType: '',
    });
  };

  const stepTitles = [
    'Select Date & Time',
    'Your Contact Details',
    'Stone Preferences',
  ];

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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white border border-gray-300 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header with Step Indicator */}
              <div className="sticky top-0 bg-white border-b border-gray-300 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-gabarito font-bold text-black">
                    {stepTitles[step - 1]}
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-600 hover:text-black transition-colors text-2xl leading-none"
                  >
                    ✕
                  </button>
                </div>

                {/* Step Indicator */}
                <p className="text-sm font-gabarito text-black">
                  Step {step} of 3
                </p>
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Date & Time */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.26 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-gabarito text-gray-700 mb-2 uppercase tracking-wide">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-gabarito text-gray-700 mb-2 uppercase tracking-wide">
                          Preferred Time
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select a time slot</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Contact Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.26 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-gabarito text-gray-700 mb-2 uppercase tracking-wide">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-gabarito text-gray-700 mb-2 uppercase tracking-wide">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-gabarito text-gray-700 mb-2 uppercase tracking-wide">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Stone Preferences */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.26 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-gabarito text-gray-700 mb-2 uppercase tracking-wide">
                          Stone Type (Optional)
                        </label>
                        <select
                          name="stoneType"
                          value={formData.stoneType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select a stone type</option>
                          <option value="limestone">Limestone</option>
                          <option value="marble">Marble</option>
                          <option value="granite">Granite</option>
                          <option value="quartzite">Quartzite</option>
                          <option value="travertine">Travertine</option>
                          <option value="onyx">Onyx</option>
                          <option value="custom">Custom Orders</option>
                        </select>
                      </div>

                      <div className="p-4 bg-gray-100 border border-gray-300 rounded-sm">
                        <p className="text-sm font-gabarito text-gray-700">
                          Our team will reach out shortly with personalized recommendations, specifications, and pricing based on your project requirements.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Modal Footer - Buttons */}
                <div className="mt-8 flex gap-4">
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-3 border-2 border-black text-black text-button font-gabarito tracking-wide rounded-sm hover:bg-black hover:text-white transition-all duration-180"
                  >
                    Cancel
                  </motion.button>

                  {step < 3 ? (
                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      whileHover={{ y: -2 }}
                      className="flex-1 px-4 py-3 bg-black text-white text-button font-gabarito tracking-wide rounded-sm hover:bg-gray-800 transition-all duration-180"
                    >
                      Next
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      className="flex-1 px-4 py-3 bg-black text-white text-button font-gabarito tracking-wide rounded-sm hover:bg-gray-800 transition-all duration-180"
                    >
                      Submit
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
