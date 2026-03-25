# Design System & Brand Guidelines

## Color Palette

### Primary Colors

```css
/* Base - Dark Luxury */
--black: #0B0B0C        /* Primary background */
--off-white: #F6F3EF    /* Primary text */

/* Usage:
   - Background: --black
   - Text: --off-white
   - High contrast, premium feel
*/
```

### Secondary Colors

```css
/* Stone Grays - UI Elements */
--stone-gray-light: #2A2B2F   /* Cards, inputs, light borders */
--stone-gray-dark: #3A3C43    /* Hover states, darker UI */

/* Usage:
   - Card backgrounds: --stone-gray-light
   - Border colors: rgba(--off-white, 0.1)
   - Hover backgrounds: --stone-gray-dark
*/
```

### Brand Colors

```css
/* Deep Blue - Secondary Accent */
--brand-blue: #0B3A6A
/* Usage: Finish tags, subtle gradients, secondary CTAs */

/* Deep Green - Tertiary Accent */
--brand-green: #0E4B3D
/* Usage: Subtle decorative accents, gradient layers */

/* Gold/Yellow - Primary CTA */
--brand-gold: #F2C14E
/* Usage: 
   - All primary buttons
   - Hover states
   - Primary text links
   - Micro accents
   - Glow effects on focus
*/
```

## Color Usage Guide

| Element | Color | Opacity | Usage |
|---------|-------|---------|-------|
| Background | `#0B0B0C` | 100% | Page background |
| Text (body) | `#F6F3EF` | 100% | Paragraph text |
| Text (secondary) | `#F6F3EF` | 70% | Secondary text |
| Text (tertiary) | `#F6F3EF` | 50% | Labels, small text |
| Borders | `#F6F3EF` | 10% | Thin dividers, input borders |
| Buttons (primary) | `#F2C14E` | 100% | "REQUEST QUOTE", "BOOK APPOINTMENT" |
| Buttons (secondary) | transparent | - | Outline buttons with border |
| Hover overlay | `#0B0B0C` | 55% | Darkened card hover |
| Inputs | `#0B0B0C` | 100% | Input backgrounds |
| Input border | `#F6F3EF` | 20% | Input focus ring |
| Input focus ring | `#F2C14E` | 50% | Focus glow |

## Typography System

### Font Stack
```css
Headings:
font-family: 'Montserrat', 'Helvetica Neue', sans-serif;
font-weight: 300 | 400 | 500;

Body & UI:
font-family: 'Inter', 'Segoe UI', sans-serif;
font-weight: 300 | 400 | 500 | 600;
```

### Text Styles

#### Labels
```css
Font: Montserrat
Size: 12px
Weight: 500
Letter-spacing: 0.22em (0.264px)
Transform: uppercase
Line-height: 1.4
Color: --brand-gold

Usage: Section titles, tags, small headings
Example: "STONE GALLERY", "RECOGNIZED BY INDUSTRY LEADERS"
```

#### H1 (Main Headline)
```css
Font: Montserrat
Size: 44px (mobile) → 64px (desktop)
Weight: 400
Letter-spacing: -0.02em
Line-height: 1.2 (tight)
Color: --off-white

Usage: Hero headline, main page title
Example: "Premium Tandur Limestone Export"
```

#### H2 (Section Title)
```css
Font: Montserrat
Size: 36px
Weight: 400
Letter-spacing: -0.01em
Line-height: 1.2
Color: --off-white

Usage: Section headings
Example: "Browse our range of Exclusive Stone"
```

#### H3 (Subsection Title)
```css
Font: Montserrat
Size: 28px
Weight: 500
Letter-spacing: -0.01em
Line-height: 1.3
Color: --off-white

Usage: Card titles, small headings
```

#### Body Text
```css
Font: Inter
Size: 16px
Weight: 400
Line-height: 1.7 (generous)
Color: --off-white with varying opacity

Usage: Paragraphs, descriptions
```

#### Button Text
```css
Font: Montserrat
Size: 13px
Weight: 600
Letter-spacing: 0.06em
Line-height: 1.5
Transform: uppercase
Color: text color varies by button type

Usage: All CTAs
Example: "REQUEST QUOTE", "BROWSE COLLECTION"
```

## Spacing System

```css
xs: 4px
sm: 8px
md: 12px
base: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Common Usage
- **Button padding**: 12px horizontal, 8px vertical
- **Card padding**: 24px-32px
- **Section padding**: 80px-128px vertical, 24px-48px horizontal
- **Gap between cards**: 24px desktop, 16px mobile
- **Text line spacing**: 1.6-1.7 for body, 1.2 for headings

## Shadow System

### Soft Shadow (Cards at Rest)
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 
            0 1px 2px rgba(0, 0, 0, 0.08);
```

### Medium Shadow (Hover Cards)
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 
            0 2px 4px rgba(0, 0, 0, 0.06);
```

### Large Shadow (Modals)
```css
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 
            0 4px 6px rgba(0, 0, 0, 0.05);
```

### Gold Glow (Button Focus)
```css
box-shadow: 0 0 20px rgba(242, 193, 78, 0.3),
            0 0 40px rgba(242, 193, 78, 0.1);
```

## Animation System

### Global Easing
```javascript
cubic-bezier(0.22, 1, 0.36, 1)
// Smooth, premium, slightly playful
```

### Duration Scale
```javascript
fast: 180ms       // Quick interactions (hover, button focus)
base: 220ms       // Standard transitions (card hover)
slow: 260ms       // Modal steps, form transitions
slower: 650ms     // Scroll reveals, section animations
slowest: 900ms    // Hero carousel crossfade
```

### Animation Types

**Fade In**
```javascript
opacity: 0 → 1
duration: 650ms ease
```

**Slide Up**
```javascript
opacity: 0 → 1
transform: translateY(12px) → translateY(0)
duration: 650ms ease
```

**Scale**
```javascript
opacity: 0 → 1
transform: scale(0.95) → scale(1)
duration: 500ms ease
```

**Hover Lift**
```javascript
transform: translateY(-2px)
box-shadow: soft → medium
duration: 180ms ease
```

**Image Zoom**
```javascript
transform: scale(1) → scale(1.03)
duration: 500ms ease
```

## Border System

### Standard Border
```css
1px solid rgba(246, 243, 239, 0.10)
/* Subtle, premium, luxury feel */
```

### Active Border
```css
1px solid #F2C14E
/* Gold border on focus/hover */
```

### Divider
```css
1px solid rgba(246, 243, 239, 0.05)
/* Very subtle section dividers */
```

## Responsive Design

### Breakpoints
```javascript
sm:  640px  (mobile to tablet)
md:  768px  (tablet to desktop)
lg: 1024px  (full desktop)
```

### Mobile First
- Start with mobile styles
- Use `md:` for tablet + desktop
- Use `lg:` for full desktop only

### Grid System
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns

## Component Specifications

### Buttons

**Primary (Gold)**
```css
Background: #F2C14E
Text: #0B0B0C
Padding: 12px 24px (mobile), 12px 32px (desktop)
Border-radius: 4px
Font: Montserrat 13px 600 uppercase
Hover: 
  - Transform: translateY(-2px)
  - Box-shadow: gold glow
  - Duration: 180ms
```

**Secondary (Outline)**
```css
Background: transparent
Border: 1px solid rgba(246, 243, 239, 0.3)
Text: #F6F3EF
Padding: 12px 24px
Border-radius: 4px
Hover:
  - Background: rgba(246, 243, 239, 0.06)
  - Border-color: #F2C14E
```

### Cards

**Standard Card**
```css
Background: #2A2B2F
Border: 1px solid rgba(246, 243, 239, 0.1)
Border-radius: 4px
Padding: 24px
Box-shadow: soft
Hover:
  - Border-color: #F2C14E (hover intensifies border)
  - Box-shadow: medium
  - Duration: 220ms
```

### Inputs

**Text Input**
```css
Background: #0B0B0C
Border: 1px solid rgba(246, 243, 239, 0.2)
Color: #F6F3EF
Padding: 12px
Border-radius: 4px
Focus:
  - Border: 1px solid #F2C14E
  - Box-shadow: 0 0 20px rgba(242, 193, 78, 0.2)
```

## Best Practices

### ✅ Do
- Use the gold color sparingly (emphasis only)
- Keep enough text contrast (WCAG AA minimum)
- Use generous line-height for premium feel
- Animate transitions smoothly
- Test on mobile devices
- Use semantic HTML structure

### ❌ Don't
- Use heavy shadows (luxury = subtle)
- Overuse animations (1-2 per interaction)
- Mix multiple accent colors
- Truncate text unnecessarily
- Use automatic color adjustments
- Forget about accessibility

## Accessibility Considerations

- **Color Contrast**: All text meets WCAG AA (4.5:1 minimum)
- **Focus States**: Visible focus rings on all interactive elements
- **Motion**: Respect `prefers-reduced-motion` preference
- **Font Scale**: Minimum 14px for body text
- **Touch Targets**: Minimum 44px x 44px for buttons

## Implementation Examples

### Gold Button with Hover Glow
```javascript
// React/Framer Motion
<motion.button
  whileHover={{ 
    y: -2, 
    boxShadow: '0 0 20px rgba(242, 193, 78, 0.3)' 
  }}
  className="px-8 py-4 bg-brand-gold text-black 
             font-montserrat text-button rounded-sm"
>
  REQUEST QUOTE
</motion.button>
```

### Premium Card Hover
```javascript
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  className="p-6 border border-off-white/10 
             rounded-sm hover:border-brand-gold/30 
             transition-colors duration-300"
>
  {/* Card content */}
</motion.div>
```

### Scroll Reveal Animation
```javascript
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
>
  {/* Section content */}
</motion.section>
```

---

**Last Updated**: March 2, 2026
**Version**: 1.0
**Design System Used**: SUNRISE STONE INDUSTRIES Premium Brand System
