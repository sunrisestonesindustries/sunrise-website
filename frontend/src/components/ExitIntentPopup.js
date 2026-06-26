import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SESSION_KEY = 'exit-intent-shown';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const hasShown = useRef(false);
  const readyAfter = useRef(null);

  useEffect(() => {
    // Don't show again in the same session
    if (window.sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    // Only trigger exit intent after 8 seconds on page
    readyAfter.current = window.setTimeout(() => {
      readyAfter.current = null;
    }, 8000);

    const handleMouseLeave = (e) => {
      // Trigger when mouse leaves through the top of the viewport
      if (
        e.clientY <= 10 &&
        !hasShown.current &&
        readyAfter.current === null
      ) {
        hasShown.current = true;
        window.sessionStorage.setItem(SESSION_KEY, '1');
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (readyAfter.current) {
        window.clearTimeout(readyAfter.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-[0_40px_100px_rgba(0,0,0,0.7)]">

              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors text-lg"
              >
                ×
              </button>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-6"
                >
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs font-gabarito uppercase tracking-[0.32em] text-white/40 mb-3">
                    Thank you
                  </p>
                  <h3 className="text-2xl font-gabarito font-bold text-white">
                    We'll be in touch
                  </h3>
                  <p className="mt-3 text-sm font-gabarito text-white/50 leading-relaxed">
                    Our team will reach out to you shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 w-full py-3 rounded-sm bg-white text-black text-sm font-gabarito font-bold tracking-wide hover:bg-white/90 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <p className="text-[10px] font-gabarito font-bold uppercase tracking-[0.36em] text-white/35 mb-3">
                    Stay Connected
                  </p>
                  <h2 className="text-2xl font-gabarito font-bold text-white leading-snug">
                    Before you go
                  </h2>
                  <p className="mt-2 text-sm font-gabarito text-white/45 leading-relaxed">
                    Leave your details and we'll get back to you with pricing and availability.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
                    <div>
                      <label className="block text-[10px] font-gabarito uppercase tracking-[0.28em] text-white/40 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm font-gabarito text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-gabarito uppercase tracking-[0.28em] text-white/40 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 000 000 0000"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm font-gabarito text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-gabarito uppercase tracking-[0.28em] text-white/40 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm font-gabarito text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-xs font-gabarito text-red-400">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full mt-2 py-3 rounded-sm bg-white text-black text-sm font-gabarito font-bold tracking-wide hover:bg-white/90 transition-colors disabled:opacity-60"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Send My Details'}
                    </button>
                  </form>

                  <button
                    onClick={handleClose}
                    className="mt-4 w-full text-center text-xs font-gabarito text-white/30 hover:text-white/50 transition-colors"
                  >
                    No thanks, continue browsing
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
