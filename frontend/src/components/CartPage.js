import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CartPage({ cartItems, onRemoveCartItem, onClearCart, onOpenModal, onOpenContact }) {
  const navigate = useNavigate();
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.sqm || 0), 0);
  const getItemTheme = (colorId) => {
    const themes = {
      blue: {
        card: 'border-sky-200 bg-sky-50/75',
        pill: 'bg-sky-100 text-sky-800',
      },
      yellow: {
        card: 'border-amber-200 bg-amber-50/85',
        pill: 'bg-amber-100 text-amber-800',
      },
      grey: {
        card: 'border-slate-400 bg-slate-200/90',
        pill: 'bg-slate-300 text-slate-800',
      },
    };

    return themes[colorId] || themes.grey;
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar
        onOpenModal={onOpenModal}
        onOpenContact={onOpenContact}
        cartCount={totalQuantity}
      />

      <main className="pt-32 px-6 md:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-gabarito uppercase tracking-[0.25em] text-gray-500 mb-3">
                Customer Cart
              </p>
              <h1 className="text-4xl md:text-5xl font-gabarito font-bold text-black">
                Saved Stone Selections
              </h1>
              <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-600">
                Review the limestone items you&apos;ve added, then request a quote when you&apos;re ready.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/')}
                className="px-5 py-3 border border-black text-black font-gabarito font-semibold rounded-sm hover:bg-black hover:text-white transition-all duration-220"
              >
                Continue Browsing
              </button>
              <button
                onClick={onOpenModal}
                className="px-5 py-3 bg-black text-white font-gabarito font-semibold rounded-sm hover:bg-gray-800 transition-all duration-220"
              >
                Request Quote
              </button>
            </div>
          </div>

          <div className="mb-8 rounded-sm border border-gray-200 bg-gray-50 px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm md:text-base text-gray-700">
              <p>{cartItems.length} saved selection{cartItems.length === 1 ? '' : 's'}</p>
              <p>Total quantity: {totalQuantity}</p>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-sm font-gabarito uppercase tracking-wide text-gray-600 hover:text-black"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-sm border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <h2 className="text-2xl font-gabarito font-bold text-black mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Add a limestone by selecting its size, finish, and edge options from any product detail page.
              </p>
              <button
                onClick={() => navigate('/', { state: { scrollTo: 'limestone-collection' } })}
                className="px-6 py-3 bg-black text-white font-gabarito font-semibold rounded-sm hover:bg-gray-800 transition-all duration-220"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`rounded-sm border p-5 md:p-6 shadow-sm ${getItemTheme(item.colorId).card}`}
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-2xl font-gabarito font-bold text-black">
                          {item.stoneName}
                        </h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-gabarito uppercase tracking-wide ${getItemTheme(item.colorId).pill}`}>
                          {item.stoneCode}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm md:text-base text-gray-700">
                        <p>Quantity: {item.sqm || 0}</p>
                        <p>Size: {item.size}</p>
                        <p>Finish: {item.finish}</p>
                        <p>Edge: {item.edge}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate(`/limestone/${item.colorId}`)}
                        className="px-4 py-2 border border-black text-black font-gabarito font-semibold rounded-sm hover:bg-black hover:text-white transition-all duration-220"
                      >
                        View Product
                      </button>
                      <button
                        onClick={() => onRemoveCartItem(item.id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 font-gabarito font-semibold rounded-sm hover:border-black hover:text-black transition-all duration-220"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
