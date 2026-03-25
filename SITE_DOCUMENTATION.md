# SUNRISE STONE INDUSTRIES - Premium Luxury Stone Gallery Website

## Overview

This is a premium B2B e-commerce website for **SUNRISE STONE INDUSTRIES**, a luxury Tandur Limestone exporter specializing in high-end stone sourcing from Telangana, India to USA markets.

The website showcases a luxury gallery aesthetic with:
- Dark, premium neutral color palette
- Smooth animations and transitions
- Full-width hero carousel with video-like quality
- Browse-by-color and browse-by-type gallery sections
- Multi-step appointment booking modal
- Responsive design for desktop and mobile

## Design System

### Colors
- **Base Black**: `#0B0B0C`
- **Off-White**: `#F6F3EF`
- **Stone Gray Light**: `#2A2B2F`
- **Stone Gray Dark**: `#3A3C43`
- **Brand Blue**: `#0B3A6A`
- **Brand Green**: `#0E4B3D`
- **Gold Accent**: `#F2C14E`

### Typography
- **Headings**: Montserrat (weights: 300, 400, 500)
- **Body & UI**: Inter (weights: 300, 400, 500, 600)
- **Uppercase labels**: 12-13px, letter-spacing: 0.22em
- **H1**: 44-64px, tracking: -0.02em
- **Body**: 16-18px, line-height: 1.7

### Motion & Animation
- **Global Easing**: `cubic-bezier(0.22, 1, 0.36, 1)`
- **Scroll Reveal**: 650ms fade-up with 12px vertical offset
- **Hover Transitions**: 220ms duration
- **Image Zoom**: 500ms duration
- **Modal Transitions**: 200ms fade, 260ms slide

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Sticky navbar with mobile menu
│   │   ├── HeroCarousel.js        # Full-screen hero carousel
│   │   ├── BrowseRange.js         # Stone type browsing grid
│   │   ├── EditorialSection.js    # 3-image editorial story block
│   │   ├── LogoStrip.js           # Marquee logo strip
│   │   ├── ColorBrowseGallery.js  # Color gallery grid
│   │   ├── NewestStock.js         # Product inventory section
│   │   ├── Testimonials.js        # Customer testimonials
│   │   ├── BoldCTA.js             # Contact/location CTA section
│   │   ├── MultiStepModal.js      # 3-step booking modal
│   │   └── Footer.js              # Footer with links
│   ├── App.js                      # Main app component
│   ├── index.js                    # React entry point
│   ├── index.css                   # Global styles + Tailwind directives
│   └── App.css                     # App-level styles
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js              # Tailwind configuration
└── postcss.config.js               # PostCSS configuration
```

## Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup

1. **Navigate to frontend folder**
   ```bash
   cd /Users/sudheerreddy/Desktop/WEBSITES/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   This will install:
   - React 18.2.0
   - Framer Motion 10.16.4 (animations)
   - Tailwind CSS 3.3.2 (styling)
   - Lenis (smooth scrolling)
   - Axios (API calls)

3. **Start development server**
   ```bash
   npm start
   ```
   
   The site will open at `http://localhost:3000`

## Key Features

### 1. **Sticky Premium Navbar**
- Transparent at top, blur glass effect on scroll
- Desktop and mobile menu with categorized links
- "REQUEST QUOTE" CTA with hover glow effect

### 2. **Hero Carousel**
- 3-image carousel with auto-rotate (5s interval)
- Crossfade + Ken Burns zoom effect (900ms duration)
- Dual CTAs with smooth lift animation
- Microproof line below CTAs
- Slide navigation dots and arrow controls

### 3. **Browse By Range**
- 7 stone type cards (Limestone, Marble, Granite, etc.)
- Image scale and overlay darkening on hover
- CTA underline animation
- Staggered fade-up on scroll

### 4. **Editorial Section**
- 3-image asymmetric grid
- Premium story text block
- Smooth hover scale on images

### 5. **Logo Strip**
- Marquee animation (18-22s loop)
- Pause on hover
- Opacity transition on hover

### 6. **Browse by Colour Gallery**
- 6 color tiles with numbered badges
- Overlay gradient rises from bottom on hover
- "EXPLORE RANGE" button fade-in
- Image scale + tile elevation

### 7. **Newest Stock**
- Product grid with finish tags
- Quick View button appears on hover
- Product specs (size, thickness, code)
- All product cards linked to quick view

### 8. **Testimonials**
- Stacked card layout
- Clean borders with hover effect
- Initials badges
- Staggered fade-up on scroll

### 9. **Bold CTA Section**
- Premium headline
- Dual action buttons
- Contact info grid (HQ, USA Warehouse, Contact)
- Subtle background gradient accents

### 10. **Multi-Step Modal**
- 3-step form: Date/Time → Contact Details → Stone Preferences
- Step indicator with progress bar
- Form validation ready
- Smooth step transitions

### 11. **Footer**
- 4-column link grid
- Social media links
- Copyright and contact info
- Utility text strip

## Component APIs

### Navbar
```javascript
<Navbar onOpenModal={handleOpenModal} />
```

### HeroCarousel
```javascript
<HeroCarousel onOpenModal={handleOpenModal} />
```

### MultiStepModal
```javascript
<MultiStepModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>
```

### All Other Sections
No props required - they are self-contained and trigger modal via button clicks that pass handlers down from App.

## Customization

### Changing Colors
Edit `tailwind.config.js` under `theme.extend.colors`:
```javascript
'brand-blue': '#0B3A6A',
'brand-gold': '#F2C14E',
// ... etc
```

### Changing Fonts
Fonts are loaded via Google Fonts in `index.css`. To use different fonts:
1. Update the `@import url()` in `index.css`
2. Update font family names in `tailwind.config.js`

### Image Assets
Hero carousel, Browse Range, and other sections use placeholder images from Unsplash/Pexels. Replace the image URLs in component files:
```javascript
const heroImage = 'https://images.unsplash.com/photo-...';
```

### Animation Speed
Adjust animation durations in:
- `tailwind.config.js` - global transitions
- Individual component `transition` props
- Hero carousel: 900ms crossfade, 700ms headline

## Performance Optimizations

- **Lazy Loading**: Images load on component scroll into view
- **Smooth Scrolling**: Lenis library for silky-smooth scroll
- **CSS-in-JS**: Tailwind for minimal bundles
- **Code Splitting**: Framer Motion components load separately
- **Mobile Optimized**: Full-screen mobile menu, touch-friendly buttons

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Mobile browsers: ✅ Optimized touch interactions

## Next Steps

1. **Backend Integration**: Connect modal to backend API for appointments
2. **Add Product Database**: Pull stone types and products from MongoDB/API
3. **Image Optimization**: Replace placeholders with high-res product photos
4. **Analytics**: Install GA4 / segment tracking
5. **SEO**: Add metadata, Schema.org markup
6. **CMS Integration**: Connect to Contentful/Sanity for content management

## Development Commands

```bash
# Start dev server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject (⚠️ irreversible)
npm eject
```

## Deployment

The site can be deployed to:
- **Vercel**: `vercel deploy` (recommended for React)
- **Netlify**: Drag & drop or CLI
- **AWS Amplify**: AWS-native hosting
- **Docker**: Containerize and deploy anywhere

## Support & Credits

**Design System Inspired By**: Premium stone gallery aesthetics
**Built With**:
- React 18
- Framer Motion
- Tailwind CSS
- Lenis smooth scroll

---

**SUNRISE STONE INDUSTRIES**  
Premium Tandur Limestone Export | India → USA  
Est. 2001
