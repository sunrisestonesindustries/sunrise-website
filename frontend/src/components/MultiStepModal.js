import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../Pictures/logo1.webp';

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

const TIME_ZONES = [
  { value: 'EST', label: 'EST (Default)' },
  { value: 'CST', label: 'CST' },
  { value: 'MST', label: 'MST' },
  { value: 'PST', label: 'PST' },
  { value: 'GMT', label: 'GMT' },
  { value: 'IST', label: 'IST' },
];

const CONSULTATION_TYPES = [
  'Stone selection guidance',
  'Custom sizing and thickness',
  'Finish and edge consultation',
  'Export and logistics discussion',
];

const getTodayString = () => new Date().toISOString().split('T')[0];

const formatDisplayDate = (value) => {
  if (!value) {
    return 'Select your preferred month and day';
  }

  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return 'Select your preferred month and day';
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function MultiStepModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    timezone: 'EST',
    name: '',
    email: '',
    phone: '',
    consultationType: CONSULTATION_TYPES[0],
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedTimezoneLabel = useMemo(
    () => TIME_ZONES.find((zone) => zone.value === formData.timezone)?.label || 'EST (Default)',
    [formData.timezone]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      time,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      date: '',
      time: '',
      timezone: 'EST',
      name: '',
      email: '',
      phone: '',
      consultationType: CONSULTATION_TYPES[0],
      notes: '',
    });
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
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-black/10 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
              <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className="border-b border-black/10 bg-[#f7f3ea] p-6 md:p-8 lg:border-b-0 lg:border-r">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/10">
                      <img
                        src={logoImage}
                        alt="Sunrise Stones Industries Logo"
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-gabarito uppercase tracking-[0.28em] text-gray-500">
                        Appointment Booking
                      </p>
                      <h2 className="text-2xl font-gabarito font-bold text-black">
                        Book a consultation
                      </h2>
                    </div>
                  </div>

                  <p className="max-w-md text-base leading-7 text-gray-700">
                    Choose a preferred month, day, time, and timezone for your meeting. EST is set as the standard by default, but you can change it anytime.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-[24px] border border-black/10 bg-white p-5">
                      <p className="text-xs font-gabarito uppercase tracking-[0.24em] text-gray-500">
                        Selected Date
                      </p>
                      <p className="mt-3 text-lg font-gabarito font-semibold text-black">
                        {formatDisplayDate(formData.date)}
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-black/10 bg-white p-5">
                      <p className="text-xs font-gabarito uppercase tracking-[0.24em] text-gray-500">
                        Selected Time
                      </p>
                      <p className="mt-3 text-lg font-gabarito font-semibold text-black">
                        {formData.time || 'Choose an available time slot'}
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-black/10 bg-white p-5">
                      <p className="text-xs font-gabarito uppercase tracking-[0.24em] text-gray-500">
                        Time Zone
                      </p>
                      <p className="mt-3 text-lg font-gabarito font-semibold text-black">
                        {selectedTimezoneLabel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-gabarito uppercase tracking-[0.28em] text-gray-500">
                        Schedule Request
                      </p>
                      <h3 className="mt-2 text-3xl font-gabarito font-bold tracking-tight text-black">
                        Pick a time that works for you
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-xl text-gray-500 transition hover:border-black hover:text-black"
                    >
                      ✕
                    </button>
                  </div>

                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-7">
                      <div className="grid gap-5 md:grid-cols-[1fr_220px]">
                        <label className="block">
                          <span className="mb-2 block text-sm font-gabarito font-semibold text-black">
                            Month & Day
                          </span>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            min={getTodayString()}
                            required
                            className="w-full rounded-[18px] border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-gabarito font-semibold text-black">
                            Time Zone
                          </span>
                          <select
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleInputChange}
                            className="w-full rounded-[18px] border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                          >
                            {TIME_ZONES.map((zone) => (
                              <option key={zone.value} value={zone.value}>
                                {zone.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div>
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="text-sm font-gabarito font-semibold text-black">
                            Preferred Time
                          </span>
                          <span className="text-xs font-gabarito uppercase tracking-[0.22em] text-gray-500">
                            EST standard
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = formData.time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => handleTimeSelect(slot)}
                                className={`rounded-[18px] border px-4 py-3 text-sm font-gabarito font-semibold transition-all ${
                                  isSelected
                                    ? 'border-black bg-black text-white shadow-sm'
                                    : 'border-gray-300 bg-white text-black hover:border-black'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-sm font-gabarito font-semibold text-black">
                            Full Name
                          </span>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            required
                            className="w-full rounded-[18px] border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-gabarito font-semibold text-black">
                            Email
                          </span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            className="w-full rounded-[18px] border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-gabarito font-semibold text-black">
                            Phone
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (908) 800-2340"
                            className="w-full rounded-[18px] border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-gabarito font-semibold text-black">
                            Consultation Type
                          </span>
                          <select
                            name="consultationType"
                            value={formData.consultationType}
                            onChange={handleInputChange}
                            className="w-full rounded-[18px] border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                          >
                            {CONSULTATION_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <label className="block">
                        <span className="mb-2 block text-sm font-gabarito font-semibold text-black">
                          Notes
                        </span>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Share any stone type, quantity, or project details you want to discuss."
                          className="w-full rounded-[20px] border border-gray-300 bg-white px-4 py-3 font-gabarito text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </label>

                      <div className="flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="rounded-[18px] border border-black px-5 py-3 text-sm font-gabarito font-semibold tracking-wide text-black transition hover:bg-black hover:text-white sm:min-w-[140px]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!formData.date || !formData.time || !formData.name || !formData.email}
                          className={`rounded-[18px] px-5 py-3 text-sm font-gabarito font-semibold tracking-wide transition sm:flex-1 ${
                            formData.date && formData.time && formData.name && formData.email
                              ? 'bg-black text-white hover:bg-gray-800'
                              : 'cursor-not-allowed bg-gray-200 text-gray-400'
                          }`}
                        >
                          Confirm Appointment Request
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="py-10 text-center">
                      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7f3ea] ring-1 ring-black/10">
                        <img
                          src={logoImage}
                          alt="Sunrise Stones Industries Logo"
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                        Appointment Requested
                      </p>
                      <h4 className="mb-3 text-3xl font-semibold tracking-[-0.04em] text-black">
                        You&apos;re booked in.
                      </h4>
                      <p className="mx-auto max-w-md text-[15px] leading-7 text-gray-600">
                        We&apos;ve saved your preferred month, day, time, and timezone. Our team will confirm the appointment shortly by email.
                      </p>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="mt-8 rounded-[18px] bg-black px-6 py-3 text-sm font-gabarito font-semibold tracking-wide text-white transition hover:bg-gray-800"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
