# Component Reference & Visual Map

## Page Structure (Top to Bottom)

```
┌─────────────────────────────────────────┐
│ Navbar (sticky, transparent → blur)     │ ← Navbar.js
├─────────────────────────────────────────┤
│                                         │
│ Hero Carousel (3 images, auto-rotate)   │ ← HeroCarousel.js
│ - Headline + Label                      │
│ - Dual CTAs                             │
│ - Micro-proof line                      │
│                                         │
├─────────────────────────────────────────┤
│ Browse Range (7 stone type cards)       │ ← BrowseRange.js
├─────────────────────────────────────────┤
│ Editorial Section (3 images + story)    │ ← EditorialSection.js
├─────────────────────────────────────────┤
│ Logo Strip (marquee, pause on hover)    │ ← LogoStrip.js
├─────────────────────────────────────────┤
│ Color Browse Gallery (6 color tiles)    │ ← ColorBrowseGallery.js
├─────────────────────────────────────────┤
│ Newest Stock (product grid)             │ ← NewestStock.js
├─────────────────────────────────────────┤
│ Testimonials (3 stacked cards)          │ ← Testimonials.js
├─────────────────────────────────────────┤
│ Bold CTA (contact, location info)       │ ← BoldCTA.js
├─────────────────────────────────────────┤
│ Footer (4-column links + social)        │ ← Footer.js
└─────────────────────────────────────────┘

→ MultiStepModal.js (appears as overlay when buttons clicked)
```

## Component Details & Customization Points

### 1. **Navbar** (`Navbar.js`)
```
Desktop View:
[Logo] [Products] [Capabilities] [Supply Chain] [About] [Contact] [REQUEST QUOTE]

Mobile View:
[Logo] [≡ Menu]
       ├─ BROWSE
       │  ├─ Our Range
       │  ├─ By Colour
       │  ├─ By Type
       │  └─ Custom Specs
       ├─ SUPPLY
       │  ├─ Supply Chain
       │  ├─ Capabilities
       │  ├─ Quality
       │  └─ Certifications
       ├─ COMPANY
       │  ├─ About Us
       │  ├─ Heritage
       │  ├─ Team
       │  └─ Partners
       ├─ CONNECT
       │  ├─ Contact
       │  ├─ Enquire
       │  ├─ Book Appointment
       │  └─ FAQ
       └─ [REQUEST QUOTE]
```

**Customizable:**
- Logo icon text (line ~37)
- Top navigation links (line ~47)
- Mobile menu groups (line ~89)
- Button text & handler

---

### 2. **Hero Carousel** (`HeroCarousel.js`)
```
[Slide 1 Image with Overlay]
│
├─ Label: "STONE GALLERY"
├─ H1: "Premium Tandur Limestone Export"
├─ Subtext: "Mine → Process → Customise → Pack → Ship..."
│
├─ Buttons:
│  ├─ PRIMARY (Gold): "Browse Collection"
│  └─ SECONDARY (Outline): "Enquire Now"
│
├─ Microproof: "Owned Quarry • Custom Cuts..."
│
├─ Controls:
│  ├─ Slide dots (bottom center)
│  └─ Next/Prev arrows (bottom right, desktop only)
│
└─ Auto-rotate every 5 seconds
```

**Customizable:**
- Hero images (3 in `slides` array, line ~17)
- Label text (line ~103)
- H1 headline (line ~107)
- Subtext (line ~111)
- Button labels (line ~116-127)
- Microproof text (line ~133)
- Auto-rotate interval (5000ms, line ~48)
- Carousel duration (900ms, line ~58)

---

### 3. **Browse Range** (`BrowseRange.js`)
```
Section Title: "Browse our range of Exclusive Stone"

[Card 1]  [Card 2]  [Card 3]  [Card 4]
Limestone Marble   Granite   Quartzite
  ❖        ❖         ❖         ❖
  
[Card 5]  [Card 6]  [Card 7]
Travertine Onyx    Custom Orders
   ❖         ❖        ❖
   
Per Card:
┌─────────────────────┐
│  [Image]            │
│  [Dark Overlay]     │ ← Darkens on hover
│  "STONE NAME"       │
│  BROWSE COLLECTION  │ ← Underline animates in
└─────────────────────┘
```

**Customizable:**
- Section headline (line ~32)
- Stone types (line ~16-22 in `stoneTypes` array)
- Remove/add cards easily
- Image URLs
- "Browse Collection" CTA text

---

### 4. **Editorial Section** (`EditorialSection.js`)
```
Left Column (Images):
┌──────────────┐
│   [Big]      │
│   [Image 1]  │
│   [Full Width]
└──────────────┘
┌─────┐ ┌─────┐
│[2]  │ │[3]  │
└─────┘ └─────┘

Right Column (Text):
"OUR STORY"
"Legacy stone. Modern supply chain."

3 paragraphs of copy...

→ BROWSE COLLECTION
```

**Customizable:**
- Images (line ~12-14)
- Section label (line ~68)
- H2 headline (line ~72)
- Body paragraphs (line ~76-82)
- CTA link (line ~84)

---

### 5. **Logo Strip** (`LogoStrip.js`)
```
"Recognised by industry leaders for exceptional quality"

[Logo 1] [Logo 2] [Logo 3] ... [Logo 8] [Logo 1] ...
 ──────────────────────────────────────────────────→
           (Marquee animation, 20s loop)
           (Pauses on hover)
```

**Customizable:**
- Section headline (line ~41)
- Logo names (line ~14-21 in `logos` array)
- Animation speed (duration: 20 in line ~54)
- Opacity on hover

---

### 6. **Color Browse Gallery** (`ColorBrowseGallery.js`)
```
"Browse Range by Colour."

[01]           [02]           [03]
BLUE-GRAY      GREENISH-GRAY  WARM BEIGE
[Image]        [Image]        [Image]
EXPLORE RANGE  EXPLORE RANGE  EXPLORE RANGE
    ↑              ↑              ↑
(overlay rises from bottom on hover)

[04]           [05]           [06]
CHARCOAL       SILVER         GOLD TONE
[Image]        [Image]        [Image]
```

**Customizable:**
- Color tiles (line ~12-27 in `colorTiles` array)
- Number badges (auto-generated)
- Color names
- Images
- Button text (line ~120)

---

### 7. **Newest Stock** (`NewestStock.js`)
```
"Newest Stock"

[Product 1]    [Product 2]    [Product 3]
[Image]        [Image]        [Image]
Honed tag ↗    Flamed ↗       Tumbled ↗
QUICK VIEW     QUICK VIEW     QUICK VIEW
(on hover)     (on hover)     (on hover)

Title: "Tandur..."
SIZE: 600x600mm
THICKNESS: 20mm
CODE: TSI-001-H

[Product 4]    [Product 5]    [Product 6]
...

→ VIEW ALL PRODUCTS (bottom)
```

**Customizable:**
- Section title (line ~75)
- Products array (line ~15-42)
- Product specs
- Images
- Button labels

---

### 8. **Testimonials** (`Testimonials.js`)
```
"TESTIMONIALS"
"Trusted by industry leaders"

┌─────────────────────────────────┐
│ "Sunrise delivers exactly what  │
│  they promise. Consistently..."  │
│                           J.M.  │ ← Initials badge
│ Commercial Developer, Texas     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ "Three years of sourcing with   │
│  them. Zero issues..."            │
│                           R.P.  │
│ Architects Collective, New York │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ "The custom cuts they deliver   │
│  are flawless..."                │
│                           S.T.  │
│ High-end Contractor, California │
└─────────────────────────────────┘
```

**Customizable:**
- Section header (line ~42-50)
- Testimonials array (line ~10-27)
- Each testimonial: text, author, company

---

### 9. **Bold CTA** (`BoldCTA.js`)
```
           (Blue/Green gradient accents)

"Your perfect stone awaits.
 Find it, spec it, order it — today."

"Connect with our team to explore custom
 specifications, certifications, and
 logistics timelines tailored to your project."

[BOOK APPOINTMENT]  [SEND ENQUIRY]

─────────────────────────────────────

HQ              USA WAREHOUSE    CONTACT
Telangana, India    Texas, USA    export@sunrise-stone.com
Tandur Region       Distribution   +1 (555) 123-4567
```

**Customizable:**
- Main headline (line ~57)
- Subtext (line ~66)
- Button labels (line ~79, 87)
- Contact info grid (line ~100-120)

---

### 10. **Modal** (`MultiStepModal.js`)
```
┌─────────────────────────────────┐
│ Select Date & Time      ✕       │
│ Step 1 of 3                     │
│ ▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────────────┤
│                                 │
│ Preferred Date:                 │
│ [Date Picker ________]          │
│                                 │
│ Preferred Time:                 │
│ [Dropdown ▼]                    │
│ - 09:00 AM                      │
│ - 10:00 AM                      │
│ - 11:00 AM                      │
│ ... etc                         │
│                                 │
├─────────────────────────────────┤
│         [Cancel] [Next →]       │
└─────────────────────────────────┘

STEP 2:
│ Your Contact Details    ✕       │
│ Step 2 of 3                     │
│ ▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────┤
│ Full Name: [_________________] │
│ Email:     [_________________] │
│ Phone:     [_________________] │
├─────────────────────────────────┤
│         [Cancel] [Next →]       │
└─────────────────────────────────┘

STEP 3:
│ Stone Preferences       ✕       │
│ Step 3 of 3                     │
│ ▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────┤
│ Stone Type (Optional):          │
│ [Dropdown ▼]                    │
│ - Limestone                     │
│ - Marble                        │
│ ... etc                         │
│                                 │
│ Our team will reach out...      │
│                                 │
├─────────────────────────────────┤
│         [Cancel] [Submit]       │
└─────────────────────────────────┘
```

**Customizable:**
- Step titles (line ~93)
- Form fields
- Input placeholders
- Validation logic
- Submit handling (line ~29)
- Time slots (line ~56-63)
- Stone types (line ~105-112)

---

### 11. **Footer** (`Footer.js`)
```
PRODUCTS              SUPPLY CHAIN       COMPANY           LEGAL
Our Range            How We Work        About Us          Terms
By Colour            Capabilities       Team              Privacy
By Type              Quality Control    Heritage          Shipping Info
Newest Stock         Logistics          Certifications    Warranty

───────────────────────────────────────────────────────

[S] SUNRISE STONE INDUSTRIES    CONTACT              [LinkedIn]
© 2026 All rights reserved.     export@sunrise-stone [Instagram]
Premium Tandur Limestone Export .com                 [Twitter]

Owned Quarry • Custom Cuts • QC Documented • USA Warehouse
Serving premium contractors & architects globally since 2001
```

**Customizable:**
- Footer link groups (line ~15-28)
- Company name & info (line ~64-71)
- Contact email (line ~79)
- Social links (line ~91-97)
- Year (auto-updates with `new Date().getFullYear()`)
- Bottom utility text (line ~112-113)

---

## Global Customization Files

### `tailwind.config.js`
- Colors
- Font names & sizes
- Animation durations
- Custom shadows
- Custom animations

### `index.css`
- Google Fonts import
- Global Tailwind directives
- Base HTML/body styles
- Scrollbar styling

### `App.js`
- Modal state management
- Component ordering
- Lenis configuration

---

## Making Quick Changes

### Change the gold accent to orange:
```javascript
// tailwind.config.js, line ~10
'brand-gold': '#FF6B35',  // Changed from #F2C14E
```

### Add a new stone type:
```javascript
// BrowseRange.js, line ~16
{
  name: 'Slate',
  image: 'https://images.unsplash.com/photo-...',
}
```

### Update company name everywhere:
Search & Replace (Cmd+Shift+H):
- Find: `SUNRISE STONE INDUSTRIES`
- Replace: `YOUR COMPANY NAME`
- Files: `Navbar.js`, `Footer.js`, `BoldCTA.js`

### Change primary CTA text:
Find & Replace:
- Find: `REQUEST QUOTE`
- Replace: `GET PROPOSAL`
- Files: `Navbar.js`, `BoldCTA.js`

---

## Performance Notes

- **Hero Carousel**: 900ms transition (smooth but snappy)
- **Scroll animations**: 650ms (luxury feel, not too slow)
- **Hover effects**: 220ms (responsive to user input)
- **Modal steps**: 260ms (quick transitions)
- **Logo marquee**: 20-22s (slow, continuous)

If animations feel sluggish, reduce durations in `tailwind.config.js`.

---

## Next Production Checklist

- [ ] Replace all placeholder images with product photos
- [ ] Update company name/branding
- [ ] Update contact information
- [ ] Add real testimonials
- [ ] Connect modal to backend API
- [ ] Test on mobile devices
- [ ] Optimize images (use WebP, lazy loading)
- [ ] Add Google Analytics
- [ ] Add Schema.org markup
- [ ] Test cross-browser compatibility
- [ ] Set up SSL certificate
- [ ] Configure domain

