import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImage from '../Pictures/logo1.webp';

export default function Footer({ onOpenModal, onOpenContact }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const footerLinks = [
    {
      category: 'PRODUCTS',
      links: [
        { label: 'Collection', type: 'collection', href: '/#limestone-collection' },
        { label: 'Newest Stock', type: 'collection', href: '/#limestone-collection' },
      ],
    },
    {
      category: 'CONNECT',
      links: [
        { label: 'Contact', type: 'contact', href: '#contact-details' },
        { label: 'Request Quote', type: 'quote', href: '#request-quote' },
      ],
    },
    {
      category: 'LEGAL',
      links: [
        { label: 'Terms', type: 'route', href: '/terms' },
        { label: 'Privacy', type: 'route', href: '/privacy' },
        { label: 'Shipping Info', type: 'route', href: '/shipping-info' },
      ],
    },
  ];

  const quickLinks = [
    { name: 'Email', url: 'mailto:sunrisestonesindustries@gmail.com' },
    { name: 'Call', url: 'tel:+19088002340' },
    { name: 'Website', url: 'https://www.sunrisestonesindustries.com' },
  ];

  const openCollection = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('home-scroll-target', 'limestone-collection');
    }

    if (location.pathname === '/') {
      const target = document.getElementById('limestone-collection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate('/', { state: { scrollTo: 'limestone-collection' } });
  };

  const handleFooterLinkClick = (event, link) => {
    if (link.type === 'collection') {
      event.preventDefault();
      openCollection();
      return;
    }

    if (link.type === 'contact') {
      event.preventDefault();
      onOpenContact?.();
      return;
    }

    if (link.type === 'quote') {
      event.preventDefault();
      onOpenModal?.();
      return;
    }

    if (link.type === 'route') {
      event.preventDefault();
      navigate(link.href);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
  };

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
            className="mx-auto mb-16 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12 md:gap-20"
          >
            {footerLinks.map((group, idx) => (
              <div key={idx} className="w-full max-w-[180px]">
                <h3 className="text-xs font-gabarito tracking-wider text-gray-600 mb-4 uppercase">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.type === 'contact' || link.type === 'quote' ? (
                        <button
                          type="button"
                          onClick={(event) => handleFooterLinkClick(event, link)}
                          className="block cursor-pointer border-none bg-transparent p-0 text-left text-sm font-gabarito text-gray-700 hover:text-black transition-colors duration-220"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(event) => handleFooterLinkClick(event, link)}
                          className="block cursor-pointer text-left text-sm font-gabarito text-gray-700 hover:text-black transition-colors duration-220"
                        >
                          {link.label}
                        </a>
                      )}
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
              <button
                type="button"
                onClick={handleHomeClick}
                className="flex items-center gap-3 border-none bg-transparent p-0 text-left"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#f5f1e8] ring-1 ring-black/10">
                  <img
                    src={logoImage}
                    alt="Sunrise Stones Industries Logo"
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <p className="text-xs font-gabarito tracking-wider text-gray-600">
                  SUNRISE STONES INDUSTRIES
                </p>
              </button>
              <p className="text-xs font-gabarito text-gray-600 text-center md:text-left">
                © {currentYear} All rights reserved. Premium Limestone Export.
              </p>
            </div>

            {/* Center: Contact */}
            <div className="text-center">
              <p className="text-xs font-gabarito tracking-wider text-gray-600 mb-2 uppercase">
                Contact
              </p>
              <div className="flex flex-col gap-1">
                <a href="mailto:sunrisestonesindustries@gmail.com" className="text-sm font-gabarito text-black hover:text-gray-600 transition-colors">
                  sunrisestonesindustries@gmail.com
                </a>
                <a href="tel:+19088002340" className="text-sm font-gabarito text-black hover:text-gray-600 transition-colors">
                  +1 (908) 800-2340
                </a>
              </div>
            </div>

            {/* Right: Quick Links */}
            <div className="flex gap-6">
              {quickLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.name === 'Website' ? '_blank' : undefined}
                  rel={social.name === 'Website' ? 'noreferrer' : undefined}
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
