import React from 'react';
import { motion } from 'framer-motion';

export default function BoldCTA({ onOpenModal }) {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100/50 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
          className="text-4xl md:text-5xl lg:text-6xl font-gabarito font-bold tracking-tight text-black mb-8 leading-tight"
        >
          Your perfect stone awaits.<br className="hidden md:block" /> Find it, spec it, order it — today.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-body md:text-lg font-gabarito text-gray-700 mb-12 leading-relaxed max-w-xl mx-auto"
        >
          Connect with our team to explore custom specifications, certifications, and logistics timelines tailored to your project.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={onOpenModal}
            whileHover={{ y: -2, boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ y: 0 }}
            className="px-8 py-4 bg-black text-white text-button font-gabarito tracking-wide rounded-sm transition-all duration-180 hover:bg-gray-800"
          >
            BOOK APPOINTMENT
          </motion.button>

          <motion.button
            onClick={onOpenModal}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            className="px-8 py-4 border-2 border-black text-black text-button font-gabarito tracking-wide rounded-sm transition-all duration-180 hover:bg-black hover:text-white"
          >
            SEND ENQUIRY
          </motion.button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="pt-12 border-t border-gray-300"
        >
          <div>
            <p className="text-xs font-gabarito tracking-wider text-black mb-2 uppercase">
              Contact
            </p>
            <p className="text-sm font-gabarito text-gray-600">
              sunrisestonesindustries@gmail.com<br />+1 (555) 123-4567
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
