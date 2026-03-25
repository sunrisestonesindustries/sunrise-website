import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      text: '"Sunrise delivers exactly what they promise. Consistently high quality, exceptional logistics—our projects run like clockwork."',
      author: 'J.M.',
      company: 'Commercial Developer, Texas',
      delay: 0,
    },
    {
      text: '"Three years of sourcing with them. Zero issues. Their QC documentation is unmatched. We specify them by name."',
      author: 'R.P.',
      company: 'Architects Collective, New York',
      delay: 0.15,
    },
    {
      text: '"The custom cuts they deliver are flawless. They understand luxury specs in a way few exporters do. Highly recommend."',
      author: 'S.T.',
      company: 'High-end Contractor, California',
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-label font-gabarito text-black mb-4 uppercase">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-h2 font-gabarito font-bold tracking-tight text-black">
            Trusted by industry leaders
          </h2>
        </motion.div>

        {/* Testimonials Stack */}
        <div className="space-y-8 md:space-y-12">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.65,
                delay: testimonial.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-8 md:p-12 border border-gray-300 rounded-sm hover:border-black/30 transition-colors duration-300"
            >
              {/* Quote */}
              <p className="text-body md:text-lg font-gabarito text-gray-800 mb-6 leading-relaxed italic">
                {testimonial.text}
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-gabarito text-black font-semibold">
                  {testimonial.author.split('.')[0]}
                </div>
                <div>
                  <p className="text-sm font-gabarito font-bold text-black">
                    {testimonial.author}
                  </p>
                  <p className="text-xs font-gabarito text-gray-600">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
