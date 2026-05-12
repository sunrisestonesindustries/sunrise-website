# 🎯 WEBSITE SECTION REGISTRY
## Clear Section Identifiers for Design & Content Iteration

**Purpose**: Reference sections by name when discussing design/content changes without altering the design DNA.

---

## 📑 PAGE SECTIONS (Top to Bottom)

### **1. NAV - Navigation Bar**
- **Section ID**: `nav-bar`
- **Component File**: [`frontend/src/components/Navbar.js`](frontend/src/components/Navbar.js)
- **Purpose**: Main navigation with logo, menu items, and CTA buttons
- **Key Elements**:
  - Logo
  - Menu links (Products, About, Contact)
  - Cart icon
  - Quote button
  - Mobile hamburger menu
- **Design DNA**: Minimal, dark background, fixed/sticky positioning

---

### **2. HERO - Hero Carousel Section**
- **Section ID**: `hero-section`
- **Component File**: [`frontend/src/components/HeroCarousel.js`](frontend/src/components/HeroCarousel.js)
- **Purpose**: Full-screen banner with rotating product images
- **Key Elements**:
  - Auto-rotating carousel (luxury stone images)
  - Large headline/subtitle
  - CTA button (Get Quote)
  - Overlay gradient/effects
- **Design DNA**: Large hero image, bold typography, dark luxury aesthetic

---

### **3. EDITORIAL - Editorial Content Section**
- **Section ID**: `editorial-section`
- **Component File**: [`frontend/src/components/EditorialSection.js`](frontend/src/components/EditorialSection.js)
- **Purpose**: Rotating educational content about stone products
- **Key Elements**:
  - Alternating image + text blocks
  - Feature highlights (Finishes, Colors, Sizes)
  - Animated transitions
  - Rich descriptions
- **Design DNA**: Alternating layout, large typography, image-driven

---

### **4. MINING - Mining Journey/Process Section**
- **Section ID**: `mining-journey`
- **Component File**: [`frontend/src/components/MiningJourney.js`](frontend/src/components/MiningJourney.js)
- **Purpose**: Show the stone sourcing/processing journey
- **Key Elements**:
  - Step-by-step process flow
  - Mining to export timeline
  - Quality assurance info
  - Images of operations
- **Design DNA**: Educational, timeline-based, process visualization

---

### **5. BROWSE - Browse Range / Stone Type Selector**
- **Section ID**: `browse-range`
- **Component File**: [`frontend/src/components/BrowseRange.js`](frontend/src/components/BrowseRange.js)
- **Purpose**: Category selector (Limestone, Granite, Marble, etc.)
- **Key Elements**:
  - Stone type cards (7 types)
  - Color gradient previews
  - "Coming Soon" badges
  - Click-to-filter functionality
- **Design DNA**: Grid layout, color-coded, interactive

---

### **6. STOCK - Newest Stock / Product Display**
- **Section ID**: `newest-stock`
- **Component File**: [`frontend/src/components/NewestStock.js`](frontend/src/components/NewestStock.js)
- **Purpose**: Showcase current available products
- **Key Elements**:
  - Product cards (name, color, specs)
  - Color swatches/previews
  - Quantity available
  - "Add to Cart" buttons
  - Filter by type (Limestone/Granite)
- **Design DNA**: Card-based grid, clean product info, minimal CTAs

---

### **7. COLOR - Color Browse Gallery**
- **Section ID**: `color-gallery`
- **Component File**: [`frontend/src/components/ColorBrowseGallery.js`](frontend/src/components/ColorBrowseGallery.js)
- **Purpose**: Visual showcase of color variations
- **Key Elements**:
  - Color swatches
  - Finish options
  - Large preview images
  - Color names and specs
- **Design DNA**: Gallery grid, color-focused, high visual impact

---

### **8. LOGO - Logo Strip / Partner/Brand Display**
- **Section ID**: `logo-strip`
- **Component File**: [`frontend/src/components/LogoStrip.js`](frontend/src/components/LogoStrip.js)
- **Purpose**: Show partner brands or certifications
- **Key Elements**:
  - Partner logos
  - Testimonial brands
  - Certifications
  - Horizontal scrolling or grid
- **Design DNA**: Simple, minimal text, logo-focused

---

### **9. TESTIMONIALS - Customer Testimonials Section**
- **Section ID**: `testimonials`
- **Component File**: [`frontend/src/components/Testimonials.js`](frontend/src/components/Testimonials.js)
- **Purpose**: Display customer reviews and case studies
- **Key Elements**:
  - Customer quotes
  - Star ratings
  - Company/person names
  - Project details
  - Carousel/rotation
- **Design DNA**: Quote-based, social proof, emotional appeal

---

### **10. CTA - Bold Call-to-Action Section**
- **Section ID**: `bold-cta`
- **Component File**: [`frontend/src/components/BoldCTA.js`](frontend/src/components/BoldCTA.js)
- **Purpose**: Prominent engagement section before footer
- **Key Elements**:
  - Large headline
  - Descriptive text
  - Primary CTA button (Quote/Appointment)
  - Background image/color
  - Secondary CTA options
- **Design DNA**: Bold, centered, attention-grabbing, urgent tone

---

### **11. FOOTER - Footer Section**
- **Section ID**: `footer`
- **Component File**: [`frontend/src/components/Footer.js`](frontend/src/components/Footer.js)
- **Purpose**: Bottom navigation, company info, links
- **Key Elements**:
  - Company info/tagline
  - Footer links (Products, About, Contact, etc.)
  - Contact info
  - Social media icons
  - Copyright
  - Newsletter signup (optional)
- **Design DNA**: Dark background, multi-column layout, organized info

---

## 📄 DETAIL PAGES

### **12. PRODUCT-DETAIL - Stone Product Detail Page**
- **Section ID**: `limestone-detail` or `granite-detail`
- **Component File**: [`frontend/src/components/LimestoneDetail.js`](frontend/src/components/LimestoneDetail.js)
- **Purpose**: Detailed information about a specific stone product
- **Key Sections**:
  - Hero image
  - Product name & specs
  - Color options
  - Finish types
  - Dimensions
  - Available quantities
  - Related products
- **Design DNA**: Product showcase, specification-heavy, image gallery

---

### **13. CUSTOMIZATION - Stone Customization Page**
- **Section ID**: `stone-customization`
- **Component File**: [`frontend/src/components/StoneCustomizationPage.js`](frontend/src/components/StoneCustomizationPage.js)
- **Purpose**: Configure custom stone orders
- **Key Elements**:
  - Size selector
  - Finish selector
  - Edge profile chooser
  - Quantity selector
  - Price calculator
  - Add to cart
- **Design DNA**: Form-based, interactive, step-by-step

---

### **14. COMPANY - Company Information Page**
- **Section ID**: `company-info`
- **Component File**: [`frontend/src/components/CompanyInfoPage.js`](frontend/src/components/CompanyInfoPage.js)
- **Purpose**: About company, mission, team
- **Key Elements**:
  - Company story
  - Mission statement
  - Team members
  - History/timeline
  - Certifications
- **Design DNA**: Narrative-driven, personal, credibility-focused

---

### **15. CART - Shopping Cart Page**
- **Section ID**: `cart-page`
- **Component File**: [`frontend/src/components/CartPage.js`](frontend/src/components/CartPage.js)
- **Purpose**: Review and checkout shopping cart
- **Key Elements**:
  - Cart items list
  - Quantity editors
  - Price breakdown
  - Checkout button
  - Continue shopping link
- **Design DNA**: Clean, minimal, transaction-focused

---

## 🎨 MODAL/POPUP SECTIONS

### **16. MODAL-QUOTE - Quote Request Modal**
- **Section ID**: `quote-modal`
- **Component File**: [`frontend/src/components/QuoteRequestModal.js`](frontend/src/components/QuoteRequestModal.js)
- **Purpose**: Popup form for quote requests
- **Key Elements**:
  - Form fields
  - Product selection
  - Contact info
  - Submit button
  - Close button
- **Design DNA**: Overlay modal, form-focused

---

### **17. MODAL-CONTACT - Contact Details Modal**
- **Section ID**: `contact-modal`
- **Component File**: [`frontend/src/components/ContactDetailsModal.js`](frontend/src/components/ContactDetailsModal.js)
- **Purpose**: Display contact information and options
- **Key Elements**:
  - Phone number
  - Email
  - Address
  - Chat/contact options
  - Hours of operation
- **Design DNA**: Information panel, minimal design

---

### **18. MODAL-MULTISTEP - Multi-Step Modal**
- **Section ID**: `multistep-modal`
- **Component File**: [`frontend/src/components/MultiStepModal.js`](frontend/src/components/MultiStepModal.js)
- **Purpose**: Multi-step appointment or inquiry form
- **Key Elements**:
  - Step indicators
  - Form fields per step
  - Back/Next buttons
  - Progress tracking
- **Design DNA**: Wizard-like, progressive disclosure

---

## 💾 STYLING & CONFIGURATION FILES

### **CSS Files** (Component-specific styling)
- `App.css` - Global app styles
- [`frontend/src/components/[SectionName].css`](frontend/src/components) - Individual component styles
- `frontend/tailwind.config.js` - Tailwind configuration (colors, spacing)
- `frontend/postcss.config.js` - PostCSS configuration

### **Design System Reference**
- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) - Color palette, typography, spacing rules
- [`COMPONENT_REFERENCE.md`](COMPONENT_REFERENCE.md) - Component documentation

---

## 🗂️ COMMUNICATION TEMPLATE

When discussing changes, use this format:

```
📌 SECTION: [Section Name]
📄 SECTION ID: [section-id]
🎯 CHANGE TYPE: Design / Content / Both
📝 DESCRIPTION: [What you want to change]
🎨 DESIGN DNA: [What must stay the same]
```

### **Example 1: Hero Section Change**
```
📌 SECTION: Hero Section
📄 SECTION ID: hero-section
🎯 CHANGE TYPE: Content
📝 DESCRIPTION: Update hero carousel images to show granite products instead of limestone
🎨 DESIGN DNA: Keep full-screen layout, auto-rotation speed, dark luxury aesthetic, overlay gradient
```

### **Example 2: Product Cards Change**
```
📌 SECTION: Newest Stock
📄 SECTION ID: newest-stock
🎯 CHANGE TYPE: Design
📝 DESCRIPTION: Add a "View Details" button to each product card
🎨 DESIGN DNA: Maintain card grid layout, color palette (gold/dark), minimal typography style
```

### **Example 3: Section Order Change**
```
📌 SECTION: Multiple (Mining Journey + Browse Range)
📄 SECTION ID: mining-journey, browse-range
🎯 CHANGE TYPE: Structure
📝 DESCRIPTION: Move Mining Journey section after Browse Range
🎨 DESIGN DNA: Each section maintains its original design; only page flow changes
```

---

## 🚀 QUICK REFERENCE MAP

```
┌─────────────────────────────────────────┐
│           NAV - nav-bar                 │ (Fixed top)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│      HERO - hero-section                │ (Full screen)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│  EDITORIAL - editorial-section          │ (Alternating layout)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│ MINING - mining-journey                 │ (Timeline)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│  BROWSE - browse-range                  │ (Stone type selector)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│   STOCK - newest-stock                  │ (Product grid)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│   COLOR - color-gallery                 │ (Color showcase)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│    LOGO - logo-strip                    │ (Partner logos)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│ TESTIMONIALS - testimonials             │ (Customer reviews)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│      CTA - bold-cta                     │ (Call to action)
└─────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────┐
│    FOOTER - footer                      │ (Bottom navigation)
└─────────────────────────────────────────┘
```

---

## ✅ NEXT STEPS

Now that you have the section registry, you can easily say:

**Instead of**: "Can you change the thing at the top where it shows the different colors?"
**Say**: "📌 SECTION: Browse Range | Update the stone type cards to include more descriptions"

**Instead of**: "Add something to the products section?"
**Say**: "📌 SECTION: Newest Stock | Add availability status badge to each product card"

---

## 🎯 READY TO ITERATE!

Pick any section from the list above, specify:
1. **Section Name** (or ID)
2. **What to change** (design/content/both)
3. **What must stay the same** (design DNA)

I'll handle the implementation! 🚀

