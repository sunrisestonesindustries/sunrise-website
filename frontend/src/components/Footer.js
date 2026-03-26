import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      category: 'PRODUCTS',
      links: ['Collections', 'Newest Stock'],
    },
    {
      category: 'COMPANY',
      links: ['About Us', 'Heritage', 'Certifications'],
    },
    {
      category: 'CONNECT',
      links: ['Contact', 'Request Quote'],
    },
    {
      category: 'LEGAL',
      links: ['Terms', 'Privacy', 'Shipping Info'],
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-300">
      {/* Main Footer */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Footer Links Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
          >
            {footerLinks.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-gabarito tracking-wider text-gray-600 mb-4 uppercase">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/\\s+/g, '-')}`}
                        className="text-sm font-gabarito text-gray-700 hover:text-black transition-colors duration-220"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gray-300/0 via-gray-300/30 to-gray-300/0 mb-12" />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Left: Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-limestone-black rounded-sm flex items-center justify-center text-white font-bold text-xs">
                  S
                </div>
                <p className="text-xs font-gabarito tracking-wider text-gray-600">
                  SUNRISE STONE INDUSTRIES
                </p>
              </div>
              <p className="text-xs font-gabarito text-gray-600 text-center md:text-left">
                © {currentYear} All rights reserved. Premium Limestone Export.
              </p>
            </div>

            {/* Center: Contact */}
            <div className="text-center">
              <p className="text-xs font-gabarito tracking-wider text-gray-600 mb-2 uppercase">
                Contact
              </p>
              <a href="mailto:sunrisestonesindustries@gmail.com" className="text-sm font-gabarito text-black hover:text-gray-600 transition-colors">
                sunrisestonesindustries@gmail.com
              </a>
            </div>

            {/* Right: Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-xs font-gabarito text-gray-600 hover:text-black transition-colors duration-220"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sub-footer: Extra Info */}
      <div className="px-6 md:px-12 py-6 border-t border-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-gabarito text-gray-600">
          <p>Owned Quarry • Custom Cuts • QC Documented</p>
          <p>Serving premium contractors & architects globally since 2001</p>
        </div>
      </div>
    </footer>
  );
}
