import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PAGE_CONTENT = {
  '/terms': {
    eyebrow: 'Terms',
    title: 'Terms of Supply',
    body: [
      'All quotations are subject to product availability, final sizing confirmation, and export logistics review.',
      'Custom stone orders begin production only after specification approval, payment confirmation, and timeline sign-off.',
      'Natural limestone varies in tone, veining, and texture. These variations are part of the material character and are not treated as defects.',
    ],
  },
  '/privacy': {
    eyebrow: 'Privacy',
    title: 'Privacy & Contact Data',
    body: [
      'We use submitted enquiry and quote information only to respond to project requests, prepare quotations, and coordinate shipment discussions.',
      'Customer information is stored for business communication, order support, and export documentation when required.',
      'For any privacy-related questions, contact us directly at sunrisestonesindustries@gmail.com or +1 (908) 800-2340.',
    ],
  },
  '/shipping-info': {
    eyebrow: 'Shipping',
    title: 'Shipping Information',
    body: [
      'Export orders are coordinated based on final stone selection, finish approval, packaging requirements, and destination port details.',
      'Lead times depend on block availability, custom cutting requirements, and container scheduling.',
      'To confirm timelines, packaging specs, and shipment planning for your project, request a quote or contact our team directly.',
    ],
  },
};

export default function CompanyInfoPage({ onOpenModal, onOpenContact, cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const content = PAGE_CONTENT[location.pathname] || PAGE_CONTENT['/terms'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onOpenModal={onOpenModal}
        onOpenContact={onOpenContact}
        cartCount={cartCount}
      />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:px-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 text-sm font-gabarito uppercase tracking-[0.24em] text-gray-500 hover:text-black"
        >
          ← Back
        </button>

        <div className="rounded-[28px] border border-black/10 bg-[#f7f3ea] p-8 md:p-12">
          <p className="mb-4 text-xs font-gabarito uppercase tracking-[0.28em] text-gray-500">
            {content.eyebrow}
          </p>
          <h1 className="mb-8 text-4xl font-gabarito font-bold tracking-tight text-black md:text-5xl">
            {content.title}
          </h1>
          <div className="space-y-5 text-base leading-8 text-gray-700 md:text-lg">
            {content.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </main>

      <Footer
        onOpenModal={onOpenModal}
        onOpenContact={onOpenContact}
      />
    </div>
  );
}
