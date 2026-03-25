# SUNRISE STONE - Quick Start Guide

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
cd /Users/sudheerreddy/Desktop/WEBSITES/frontend
npm install
```

This installs all required packages including:
- React 18
- Framer Motion (animations)
- Tailwind CSS (styling)
- Lenis (smooth scrolling)

### Step 2: Start the Development Server
```bash
npm start
```

The website will automatically open at **http://127.0.0.1:3000**

### Step 3: Explore the Site

**Desktop Features:**
- Hover effects on buttons and cards
- Smooth animations on scroll
- Hero carousel auto-rotation and manual controls
- Logo marquee strip with pause-on-hover

**Mobile Features:**
- Full-screen mobile menu
- Touch-optimized buttons
- Responsive image grids
- Smooth collapse/expand animations

## 🎨 Site Features

| Section | Features |
|---------|----------|
| **Navbar** | Sticky, blur glass effect, mobile menu, REQUEST QUOTE button |
| **Hero** | 3-image carousel, dual CTAs, animated headline |
| **Browse Range** | 7 stone types, image hover effects, overlay animations |
| **Editorial** | 3-image grid, premium story text, smooth transitions |
| **Logo Strip** | Marquee animation, pause on hover, opacity effects |
| **Color Gallery** | 6 numbered color tiles, gradient overlays, numbered badges |
| **Newest Stock** | Product grid with specs, quick-view buttons, finish tags |
| **Testimonials** | Stacked cards, hover borders, initials badges |
| **Bold CTA** | Premium headline, dual buttons, contact info grid |
| **Modal** | 3-step form with progress bar, smooth transitions |
| **Footer** | 4-column links, social, contact info |

## 🎯 Interactive Elements

### Buttons (All Open Modal)
- REQUEST QUOTE (Navbar)
- Browse Collection (Hero)
- Enquire Now (Hero)
- BOOK APPOINTMENT (Contact section)
- SEND ENQUIRY (Contact section)
- VIEW ALL PRODUCTS (Newest Stock)

### Hover Effects
- **Buttons**: Lift animation + subtle glow
- **Cards**: Scale up, overlay darkens
- **Images**: Smooth 500ms zoom
- **Links**: Color transition to gold
- **Logo Strip**: Pause on hover

### Modal Workflow
1. Click any CTA button
2. **Step 1**: Select date & time
3. **Step 2**: Enter contact details (name, email, phone)
4. **Step 3**: Select stone type (optional)
5. Click Submit or Cancel

## 🎨 Customization Tips

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  'brand-gold': '#F2C14E',      // Primary CTA color
  'brand-blue': '#0B3A6A',      // Secondary accent
  'brand-green': '#0E4B3D',     // Subtle accent
}
```

### Change Images
Find and replace image URLs in components:
- **Hero**: `HeroCarousel.js` - slides array
- **Browse Range**: `BrowseRange.js` - stoneTypes array
- **Color Gallery**: `ColorBrowseGallery.js` - colorTiles array
- **Products**: `NewestStock.js` - products array

### Change Animation Speed
Edit speeds in:
- `tailwind.config.js` - `transitionDuration`
- Individual components - `transition={{ duration: XXX }}`
- Hero carousel - look for `duration: 0.9` and `duration: 0.7`

### Change Text Content
All text is hardcoded in components. To make dynamic:
1. Pass props to components
2. Or connect to a CMS (Contentful, Sanity)
3. Or fetch from backend API

## 📁 File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Top navigation
│   │   ├── HeroCarousel.js        # Hero section
│   │   ├── BrowseRange.js         # Stone types
│   │   ├── EditorialSection.js    # Story section
│   │   ├── LogoStrip.js           # Logo marquee
│   │   ├── ColorBrowseGallery.js  # Color gallery
│   │   ├── NewestStock.js         # Products
│   │   ├── Testimonials.js        # Reviews
│   │   ├── BoldCTA.js             # Contact CTA
│   │   ├── MultiStepModal.js      # Modal form
│   │   └── Footer.js              # Footer
│   ├── App.js                      # Main app (modal state)
│   ├── index.js                    # Entry point
│   ├── index.css                   # Global styles
│   └── App.css                     # App styles
├── tailwind.config.js              # Tailwind config
├── postcss.config.js               # PostCSS config
└── package.json                    # Dependencies
```

## 🔧 Common Edits

### Modify Company Name
Search for "SUNRISE STONE INDUSTRIES" in:
- `Navbar.js`
- `BoldCTA.js`
- `Footer.js`

### Update Contact Email
Edit in `BoldCTA.js` and `Footer.js`:
```javascript
export@sunrise-stone.com  →  your@email.com
```

### Change Logo Icon
Edit the "S" box in `Navbar.js` (line ~37)

### Update Testimonials
Edit `Testimonials.js` - testimonials array

### Update Products
Edit `NewestStock.js` - products array

## 🚢 Production Build

```bash
npm run build
```

Creates optimized build in `build/` folder ready for deployment.

### Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `build/` folder
- **AWS Amplify**: Connect GitHub repo
- **Docker**: `docker build -t sunrise-stone .`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (full-width, stacked layout)
- **Tablet**: 640px - 1024px (2-column grids)
- **Desktop**: > 1024px (3-4 column grids, full features)

## ⚡ Performance Tips

- Images use Unsplash CDN (can be optimized)
- Lenis smooth scroll (adjust duration if too slow)
- Modal animations configurable
- All CSS handled by Tailwind (minimal size)

## 🐛 Troubleshooting

**Site won't start?**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

**Animations stuttering?**
- Check browser hardware acceleration
- Reduce animation duration
- Disable smooth scroll (comment out Lenis in App.js)

**Images not loading?**
- Check internet connection (Unsplash CDN)
- Replace with local images

**Styles look wrong?**
- Ensure `tailwind.config.js` is loaded
- Clear browser cache
- Restart dev server

## 📚 Learn More

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Docs](https://react.dev/)
- [Lenis Smooth Scroll](https://lenis.studiofreight.com/)

## 💡 Next Steps

1. **Connect Backend**
   - Replace modal submit with API call
   - Fetch products from database
   - Add admin panel

2. **Add Real Content**
   - Replace placeholder images
   - Add actual product specs
   - Update testimonials
   - Add company story

3. **SEO & Analytics**
   - Add meta tags
   - Install Google Analytics
   - Add Schema.org markup
   - Create sitemap.xml

4. **Advanced Features**
   - Product search/filter
   - Shopping cart
   - Wishlist
   - Blog/News section

---

**Ready to customize?** Start editing files in `frontend/src/components/` and the changes will hot-reload instantly!
