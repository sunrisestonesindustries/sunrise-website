

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // White luxury neutral base
        white: '#FFFFFF',
        black: '#000000',
        'off-white': '#F6F3EF',
        // Grays
        'gray-900': '#1a1a1a',
        'gray-800': '#2a2a2a',
        'gray-700': '#3a3c43',
        'gray-600': '#49494f',
        'gray-500': '#5a5a61',
        'gray-400': '#8a8a91',
        'gray-300': '#bababf',
        'gray-200': '#e5e5ea',
        'gray-100': '#f5f3f0',
        // Limestone colors
        'limestone-black': '#1a1a1a',
        'limestone-blue': '#4A5F8F',
        'limestone-gray': '#8B8B8F',
        'limestone-yellow': '#D4AF37',
      },
      fontFamily: {
        // Gabarito for all text
        gabarito: ['Gabarito', 'sans-serif'],
        sans: ['Gabarito', 'sans-serif'],
      },
      fontSize: {
        // Custom sizes
        'label': ['12px', { lineHeight: '1.4', letterSpacing: '0.22em' }],
        'label-lg': ['13px', { lineHeight: '1.4', letterSpacing: '0.22em' }],
        'h1': ['44px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '400' }],
        'h1-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'h2': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '400' }],
        'h3': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'button': ['13px', { lineHeight: '1.5', letterSpacing: '0.06em', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '300' }],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0em',
        wide: '0.06em',
        wider: '0.22em',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        fadeIn: 'fadeIn 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        slideUp: 'slideUp 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        slideDown: 'slideDown 0.26s cubic-bezier(0.22, 1, 0.36, 1)',
        slideInFromLeft: 'slideInFromLeft 0.26s cubic-bezier(0.22, 1, 0.36, 1)',
        slideInFromRight: 'slideInFromRight 0.26s cubic-bezier(0.22, 1, 0.36, 1)',
        scaleIn: 'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'glow-gold': '0 0 20px rgba(242, 193, 78, 0.3), 0 0 40px rgba(242, 193, 78, 0.1)',
      },
      transitionDuration: {
        '180': '180ms',
        '220': '220ms',
        '260': '260ms',
        '650': '650ms',
        '900': '900ms',
      },
      transitionTimingFunction: {
        'gallery': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
