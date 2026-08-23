import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteRequestModal from './QuoteRequestModal';
import Seo, { SITE_URL } from './Seo';

// ─── URL paths (served from /public/granite/ — loaded on demand, not bundled) ───
const graniteAlaskaRed       = '/granite/tan-red-granite.webp';
const graniteJuparana        = '/granite/indian-juparana-granite.webp';
const graniteKashmirWhite    = '/granite/kashmir-white-granite.webp';
const graniteParadiso        = '/granite/paradiso-bash-granite.webp';
const graniteSapphire        = '/granite/sapphire-blue-granite.webp';
const graniteTanBrown        = '/granite/tan-brown-granite.webp';
const graniteBlackPearl      = '/granite/black-pearl-granite.webp';
const graniteSteelGrey       = '/granite/steel-grey-granite.webp';
const graniteBlackForest     = '/granite/black-forest-granite.webp';
const graniteImperialBlue    = '/granite/imperial-blue-granite.webp';
const graniteCoffeeBrown     = '/granite/coffee-brown-granite.webp';
const graniteThunderBlack    = '/granite/thunder-black-granite.webp';
const graniteParadisoClassico = '/granite/paradiso-classico-granite.webp';
const graniteCopperSilk      = '/granite/copper-silk-granite.webp';
const graniteSilverSilk      = '/granite/silver-silk-granite.webp';
const graniteMulticolorRed   = '/granite/multicolor-red-granite.webp';

// ─── Ripple hook — call triggerRipple(e) on click ───
function useRipple() {
  const ref = useRef(null);
  const triggerRipple = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left;
    const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top;
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.8;
    ripple.style.cssText = `
      position:absolute;left:${x - size/2}px;top:${y - size/2}px;
      width:${size}px;height:${size}px;border-radius:50%;
      background:rgba(201,168,76,0.22);pointer-events:none;
      transform:scale(0);animation:_ripple 0.5s ease-out forwards;
    `;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, []);
  return [ref, triggerRipple];
}

const GRANITE_TYPES = [
  {
    name: 'Slabs',
    sizes: '96"–130" × 60"–78"  ·  2 cm & 3 cm',
    badge: 'Most Ordered',
    badgeColor: 'gold',
    description: 'Full-size granite slabs for countertops, islands, walls, and large installations.',
  },
  {
    name: 'Custom Size',
    sizes: 'Made to your project dimensions',
    badge: null,
    description: 'Cut-to-size granite prepared for your drawings, cutouts, and installation needs.',
  },
];

const GRANITE_FINISHES = [
  {
    name: 'Polished',
    badge: 'Most Popular',
    badgeColor: 'gold',
    description: 'Mirror-like reflective surface. Deepens colour and highlights natural veining.',
    swatch: 'polished',
    swatchLabel: 'High Gloss',
  },
  {
    name: 'Honed',
    badge: 'Popular',
    badgeColor: 'neutral',
    description: 'Smooth matte surface with a soft, understated luxury and zero glare.',
    swatch: 'honed',
    swatchLabel: 'Flat Matte',
  },
  {
    name: 'Leathered',
    badge: 'Trending',
    badgeColor: 'green',
    description: 'Organic textured surface that hides fingerprints and resists water marks.',
    swatch: 'leathered',
    swatchLabel: 'Bump Texture',
  },
  {
    name: 'Brushed',
    badge: 'Trending',
    badgeColor: 'green',
    description: 'Lightly abraded surface with fine linear texture and depth of character.',
    swatch: 'brushed',
    swatchLabel: 'Linear Grain',
  },
  {
    name: 'Flamed',
    badge: 'Outdoor Use',
    badgeColor: 'stone',
    description: 'Rough anti-slip surface created by intense heat. Ideal for exterior applications.',
    swatch: 'flamed',
    swatchLabel: 'Rough Surface',
  },
  {
    name: 'Sandblasted',
    badge: 'Specialty',
    badgeColor: 'slate',
    description: 'Uniform fine-grained matte texture for architectural and feature stone work.',
    swatch: 'sandblasted',
    swatchLabel: 'Fine Grain',
  },
];

const GRANITE_EDGES = [
  {
    name: 'Eased Edge',
    tag: 'Most Popular · US',
    tagColor: 'gold',
    description: 'Softly squared profile. Clean, versatile, and suited to any interior style.',
  },
  {
    name: 'Straight Edge',
    tag: 'Modern',
    tagColor: 'neutral',
    description: 'Crisp 90° profile. Sharp, architectural, and strictly contemporary.',
  },
  {
    name: 'Beveled Edge',
    tag: 'Contemporary',
    tagColor: 'neutral',
    description: 'Angled face cut at 45°. Adds visual weight and a precision-crafted look.',
  },
  {
    name: 'Half Bullnose',
    tag: 'Classic',
    tagColor: 'neutral',
    description: 'Rounded top with a flat underside. Timeless, safe, and highly practical.',
  },
  {
    name: 'Full Bullnose',
    tag: 'Traditional',
    tagColor: 'neutral',
    description: 'Fully rounded profile on all sides. Soft, classic, and family-friendly.',
  },
  {
    name: 'Ogee Edge',
    tag: 'Luxury',
    tagColor: 'gold',
    description: 'Elegant S-curve profile. The hallmark edge of high-end and formal interiors.',
  },
];

const SWATCH_STYLES = {
  // Mirror-like gloss: bold diagonal highlight stripe
  polished: {
    background: 'linear-gradient(118deg, #060606 0%, #0e0e0e 22%, #3a3a50 35%, #b0b0c8 42%, #eeeeff 48%, #b0b0c8 54%, #3a3a50 61%, #0e0e0e 76%, #060606 100%)',
  },
  // Pure flat matte: no shine, no pattern
  honed: {
    backgroundColor: '#2c2c2c',
  },
  // Organic bump texture: dot grid pattern
  leathered: {
    backgroundImage: 'radial-gradient(ellipse 2.5px 2px at 4px 4px, #3e3e3e 70%, transparent 80%)',
    backgroundSize: '8px 8px',
    backgroundColor: '#1c1c1c',
  },
  // Fine parallel grooves: clear horizontal lines
  brushed: {
    backgroundImage: 'repeating-linear-gradient(0deg, #181818 0px, #181818 2px, #303030 2px, #303030 5px)',
    backgroundColor: '#1e1e1e',
  },
  // Rough heat texture: diagonal warm stripes
  flamed: {
    backgroundImage: 'repeating-linear-gradient(125deg, #3a1e08 0px, #3a1e08 3px, #562410 3px, #562410 7px, #3a1e08 7px, #3a1e08 10px)',
    backgroundColor: '#3a1e08',
  },
  // Fine grain: tiny uniform dots
  sandblasted: {
    backgroundImage: 'radial-gradient(circle 1px at 2px 2px, #5a5a5a 100%, transparent 0)',
    backgroundSize: '4px 4px',
    backgroundColor: '#3a3a3a',
  },
};

const graniteData = {
  'alaska-red': {
    name: 'Alaska Red Granite',
    code: 'GRT-ALR',
    image: graniteAlaskaRed,
    accent: 'red',
    description: 'A bold red granite with tan, cream, and charcoal movement. It is a strong choice for statement flooring, countertops, wall features, and exterior architectural work.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Use', value: 'Indoor & Outdoor' },
    ],
    applications: [
      'Kitchen Countertops',
      'Feature Walls',
      'Flooring',
      'Staircases',
      'Exterior Cladding',
      'Commercial Lobbies',
      'Vanity Tops',
      'Table Tops',
    ],
    longContent: [
      {
        heading: 'About Alaska Red Granite',
        body: 'Despite the name, Alaska Red is quarried in India — the "Alaska" naming is a trade convention used across the stone industry for certain red granite families, similar to how "Baltic Brown" and "Kashmir White" reference visual character rather than literal origin. The stone combines a bold red base with tan, cream, and charcoal mineral movement, giving it more visual energy than typical brown or grey granites while remaining easier to work with in a design scheme than Imperial Blue or other rare colors.',
      },
      {
        heading: 'Why US buyers choose Alaska Red',
        body: 'Red and warm-toned granites see consistent demand in the US Southwest and South, where terracotta, adobe, and warm color palettes dominate residential and commercial design. Alaska Red also performs well as an accent stone paired with neutral cabinetry or flooring elsewhere in a project — a red granite backsplash or fireplace surround against grey or white surfaces is a common specification pattern we see from US designers.',
      },
      {
        heading: 'Performance and specifications',
        body: 'Mohs hardness of 6–6.5, water absorption around 0.4%, suitable for both interior and exterior use including cladding and paving in most US climates. Standard annual sealing maintains stain resistance; the busy pattern hides minor everyday wear better than solid-color stones.',
      },
      {
        heading: 'Finishes and available formats',
        body: 'Polished finish is standard and brings out the full contrast between the red field and the tan/charcoal movement. Flamed and bush-hammered finishes are available for exterior paving and slip-resistant applications. Slab format: 96"–130" × 60"–78" in 2 cm and 3 cm. Tiles in 12"×12" and 18"×18" for accent applications and smaller installations.',
      },
      {
        heading: 'Ordering and US delivery',
        body: 'MOQ is one 20\' container. Standard lead time from PO to US port is 8–12 weeks with full documentation, container photos, and FOB/CIF/DDP shipping options available.',
      },
    ],
  },
  'indian-juparana': {
    name: 'Indian Juparana Granite',
    code: 'GRT-IJG',
    image: graniteJuparana,
    accent: 'amber',
    description: 'A warm flowing granite with peach, beige, grey, and brown mineral patterns. It works well where natural movement and a softer luxury finish are needed.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Pattern', value: 'Flowing Veins' },
    ],
    applications: [
      'Countertops',
      'Flooring',
      'Wall Panels',
      'Reception Desks',
      'Bathroom Vanities',
      'Stair Treads',
      'Hotel Interiors',
      'Fireplace Surrounds',
    ],
    longContent: [
      {
        heading: 'About Indian Juparana Granite',
        body: '"Juparana" is one of the most established granite family names in the international stone trade, originally associated with Brazilian quarries but now also produced from comparable deposits across India. Indian Juparana carries the same warm, flowing character the name is known for — peach, beige, grey, and brown tones moving across the slab in soft bands rather than the busy speckle pattern of most granites.',
      },
      {
        heading: 'Why Indian Juparana works for luxury and hospitality projects',
        body: 'The flowing, marble-like movement makes Indian Juparana a favorite for hotel lobbies, reception desks, and upscale residential projects where a granite needs to read as elegant rather than purely functional. It pairs naturally with warm wood tones, brass fixtures, and traditional or transitional design schemes — US hospitality buyers specifically search for this pattern type when a client wants granite\'s durability with a softer visual profile than typical speckled stones.',
      },
      {
        heading: 'Technical performance',
        body: 'Mohs hardness 6–6.5, water absorption approximately 0.4%, comparable durability to other premium Indian granites. The flowing pattern means slab selection matters more than with uniform colors — we provide photos of specific slabs for bookmatched applications like reception desks and large countertop runs.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished finish is standard and essential to showcase the flowing pattern; honed available on request. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm. Tiles in 12"×12", 18"×18", and 24"×24" for flooring applications.',
      },
      {
        heading: 'Ordering and shipping',
        body: 'MOQ one 20\' container, though for pattern-matched projects (reception desks, bookmatched islands) we recommend confirming slab selection before container loading. Standard lead time 8–12 weeks from PO to US port with full export documentation.',
      },
    ],
  },
  'kashmir-white': {
    name: 'Kashmir White Granite',
    code: 'GRT-KWG',
    image: graniteKashmirWhite,
    accent: 'slate',
    description: 'A light granite with soft white, grey, and burgundy mineral accents. It brings a clean premium look to kitchens, flooring, and bright interior spaces.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Light Neutral' },
    ],
    applications: [
      'Kitchen Islands',
      'Premium Flooring',
      'Bathroom Vanities',
      'Backsplashes',
      'Wall Cladding',
      'Table Tops',
      'Retail Interiors',
      'Residential Projects',
    ],
    longContent: [
      {
        heading: 'About Kashmir White Granite',
        body: 'Kashmir White is one of the most recognizable light granites on the US market, quarried from deposits across India and prized for its soft white-and-grey base scattered with distinctive burgundy and maroon mineral flecks. Unlike engineered whites or true marbles, Kashmir White retains the durability of natural granite while delivering the bright, airy look that many US homeowners and designers want in kitchens and bathrooms without sacrificing scratch or heat resistance.',
      },
      {
        heading: 'Why Kashmir White remains a top US seller',
        body: 'Light granites have surged in popularity as open-concept kitchens and all-white interiors have become the dominant US residential design trend. Kashmir White answers that demand while still being a true granite — harder, more heat resistant, and more stain resistant than marble or quartzite. The burgundy fleck gives it just enough visual interest to avoid looking flat or artificial, which is a common complaint with some engineered white surfaces. It pairs naturally with white shaker cabinets, brass or matte black fixtures, and warm wood tones.',
      },
      {
        heading: 'Performance and care',
        body: 'Kashmir White rates 6–6.5 on the Mohs hardness scale with water absorption around 0.4%. As with all light-colored granites, staining is more visible than on dark stones, so we recommend sealing twice per year rather than the standard annual schedule, particularly in kitchens with heavy oil or wine exposure. Once sealed, the surface resists everyday acids, heat, and scratching as well as any granite in our range.',
      },
      {
        heading: 'Finishes, sizes, and edge options',
        body: 'Polished is by far the most requested finish for Kashmir White — it maximizes the brightness and depth of the white background. Honed is available for a softer, more contemporary matte look. Standard slab format is 96"–130" × 60"–78" in 2 cm and 3 cm; tiles available in 12"×12", 18"×18", and 24"×24". All standard edge profiles supported, with mitered and waterfall edges especially popular for the large kitchen islands this stone is typically specified for.',
      },
      {
        heading: 'Ordering and shipping to the US',
        body: 'Minimum order quantity is one 20\' container (approximately 280–320 sqm of 2 cm material). Standard lead time from purchase order to US port is 8–12 weeks. Because Kashmir White is a high-demand color, we recommend placing orders 2–3 weeks earlier than usual during peak US renovation season (spring and early summer) to avoid block availability delays. Full documentation, container loading photos, and FOB/CIF/DDP options are available on every order.',
      },
    ],
  },
  'paradiso-ash': {
    name: 'Paradiso Ash Granite',
    code: 'GRT-PAG',
    image: graniteParadiso,
    accent: 'violet',
    description: 'A dramatic granite with ash, violet, and grey wave movement. It is ideal for high-impact installations that need a rich natural pattern.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Pattern', value: 'Wave Movement' },
    ],
    applications: [
      'Feature Walls',
      'Countertops',
      'Flooring',
      'Staircases',
      'Reception Areas',
      'Luxury Bathrooms',
      'Exterior Facades',
      'Custom Furniture',
    ],
    longContent: [
      {
        heading: 'About Paradiso Ash Granite',
        body: 'Paradiso Ash is one of the more visually complex granites in our range — soft ash-grey and violet tones move across the slab in wave-like bands, closer in feel to an exotic quartzite than a typical uniform granite. This is a specification stone: buyers usually find it after already deciding they want something distinctive for a signature surface, rather than browsing generic "granite" searches.',
      },
      {
        heading: 'Where Paradiso Ash gets specified',
        body: 'The wave pattern and violet undertone make this variety a natural fit for luxury bathroom vanities, feature walls behind bar areas, and reception desks in boutique hospitality projects. It reads as more contemporary than traditional browns and tans, which is why we see it requested most often for modern and transitional interiors rather than classic kitchen countertop work.',
      },
      {
        heading: 'Performance specs',
        body: 'Mohs hardness 6–6.5, water absorption near 0.4%. As with other pattern-driven granites, we recommend reviewing slab photos before finalizing large single-surface applications so the wave movement flows the way you expect across seams.',
      },
      {
        heading: 'Finishes and sizes',
        body: 'Polished is the standard and recommended finish to bring out the depth of the ash and violet tones. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm. Because this is a lower-volume specialty color, we recommend confirming block availability before committing to a project timeline.',
      },
      {
        heading: 'Ordering and lead times',
        body: 'MOQ and lead times are more flexible for this variety given its specialty status — smaller LCL shipments are common for accent applications. Standard container lead time (when ordering full volume) is 8–12 weeks from PO to US port.',
      },
    ],
  },
  'sapphire-blue': {
    name: 'Sapphire Blue Granite',
    code: 'GRT-SBG',
    image: graniteSapphire,
    accent: 'blue',
    description: 'A deep blue-grey granite with crystalline movement and a refined surface character. It suits premium interiors, counters, and exterior stonework.',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Blue Grey' },
    ],
    applications: [
      'Kitchen Countertops',
      'Flooring',
      'Wall Features',
      'Bathroom Vanities',
      'Outdoor Paving',
      'Commercial Counters',
      'Staircases',
      'Architectural Details',
    ],
    longContent: [
      {
        heading: 'About Sapphire Blue Granite',
        body: 'Sapphire Blue sits between Imperial Blue\'s vivid rarity and Steel Grey\'s everyday neutrality — a deep blue-grey field with crystalline mineral movement that reads as sophisticated rather than showy. It is more readily available than true blue granites like Imperial Blue, making it a practical choice for buyers who want a blue-toned stone without the premium pricing or availability constraints of rarer varieties.',
      },
      {
        heading: 'Why Sapphire Blue works across residential and commercial projects',
        body: 'The deep blue-grey base is versatile enough for full kitchen countertop coverage (unlike Imperial Blue, which is typically reserved for accent pieces due to cost and availability), while still offering more color character than standard greys and blacks. US buyers searching for "blue granite countertop" who find Imperial Blue outside their budget frequently land on Sapphire Blue as the practical alternative.',
      },
      {
        heading: 'Technical specifications',
        body: 'Mohs hardness 6–6.5, water absorption approximately 0.4%, compressive strength in line with other premium Indian granites. Suitable for both interior surfaces and exterior paving/cladding applications in most US climates.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished finish is standard and shows the crystalline sparkle best. Honed available for a more contemporary matte look. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm; tiles in standard 12"×12" and 18"×18" formats.',
      },
      {
        heading: 'Ordering and US shipping',
        body: 'MOQ one 20\' container, standard lead time 8–12 weeks from PO to US port. Full documentation and FOB/CIF/DDP shipping options available on every order.',
      },
    ],
  },
  'tan-brown': {
    name: 'Tan Brown Granite',
    code: 'GRT-TBR',
    image: graniteTanBrown,
    accent: 'amber',
    description: 'One of India\'s most exported granites worldwide. A rich dark background interspersed with tan, gold, and burgundy mineral crystals. Extremely popular in the US market for kitchen countertops and flooring.',
    specs: [
      { label: 'Origin', value: 'Andhra Pradesh, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Dark Brown & Gold' },
    ],
    applications: [
      'Kitchen Countertops',
      'Flooring',
      'Bathroom Vanities',
      'Feature Walls',
      'Commercial Lobbies',
      'Outdoor Paving',
      'Staircases',
      'Table Tops',
    ],
    longContent: [
      {
        heading: 'About Tan Brown Granite',
        body: 'Tan Brown is one of the most heavily exported Indian granites to the United States, prized for its warm dark background and consistent crystalline pattern. The stone is quarried in the Ongole and Prakasam districts of Andhra Pradesh, where the deposits yield blocks with the deep coffee-brown base and distinctive golden-amber feldspar that the variety is known for. Because the pattern is fine-grained and uniform rather than veined, Tan Brown rarely shows the dramatic bookmatching of more flowing granites — but it gives you something equally valuable: predictable, low-variation slabs that work across multi-island kitchens, large flooring runs, and commercial installations where consistency matters more than drama.',
      },
      {
        heading: 'Why US fabricators choose Tan Brown',
        body: 'Tan Brown holds a 6.5 on the Mohs hardness scale and a compressive strength of about 200 MPa, putting it among the most durable countertop granites available. Water absorption sits at roughly 0.4%, meaning sealed surfaces are essentially stain-proof against typical kitchen exposures including red wine, oil, and citrus. The dark color hides crumbs and watermarks far better than light granites, which is why it has remained a top seller in US kitchens for over twenty years despite the rise of engineered quartz alternatives. It also pairs naturally with both maple and dark cabinetry, brushed nickel and oil-rubbed bronze fixtures, and white or beige backsplashes — a flexibility that makes it a safe spec for builder-grade through luxury work.',
      },
      {
        heading: 'Finishes and edge profiles available',
        body: 'We supply Tan Brown in polished, leathered, honed, and flamed finishes. Polished is the most common request and showcases the stone\'s natural depth — the gold crystals practically glow under direct light. Leathered offers a soft matte texture that hides fingerprints and minor wear, increasingly popular on islands and outdoor kitchens. Standard edge profiles include eased, bullnose, ogee, and full bullnose; custom edge work is available for premium projects. All slabs are resin-treated at origin to seal micro-fissures.',
      },
      {
        heading: 'Available sizes and order minimums',
        body: 'Standard slab format is 96"–130" × 60"–78" in 2 cm and 3 cm thicknesses. Gang-sawn slabs typically run 110" × 70" — large enough to fabricate most US island countertops without seams. Tiles are available in 12"×12", 18"×18", and 24"×24". Minimum order quantity for direct container shipment is one 20\' container (roughly 280–320 sqm of 2 cm slabs); LCL shipments are possible for smaller fabricators but cost economics are weaker.',
      },
      {
        heading: 'Lead times and shipping to the US',
        body: 'Standard lead time from purchase order to US East Coast port is 8–12 weeks: 2–3 weeks block selection and slab cutting in Andhra Pradesh, 1 week resin treatment and packing, 4–6 weeks ocean freight (longer to West Coast via Pacific routing), 1–2 weeks customs clearance and inland trucking. We coordinate FOB, CIF, and DDP arrangements depending on whether you have an established US customs broker. All shipments include packing lists, container loading photos, IPPC-stamped wood crating, and certificates of origin for tariff classification.',
      },
    ],
  },
  'black-pearl': {
    name: 'Black Pearl Granite',
    code: 'GRT-BPL',
    image: graniteBlackPearl,
    accent: 'slate',
    description: 'A uniform jet-black granite with fine silver and white mineral speckling throughout. One of the most consistent and sought-after black granites in the US and European markets.',
    specs: [
      { label: 'Origin', value: 'Karnataka / Andhra Pradesh, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Black & Silver' },
    ],
    applications: [
      'Kitchen Countertops',
      'Bathroom Vanities',
      'Flooring',
      'Wall Cladding',
      'Commercial Counters',
      'Stair Treads',
      'Exterior Facades',
      'Architectural Details',
    ],
    longContent: [
      {
        heading: 'About Black Pearl Granite',
        body: 'Black Pearl is the most consistent black granite quarried in India, drawn from deposits across Karnataka and northern Andhra Pradesh. The stone has a deep charcoal-to-jet-black background scattered with fine silver, white, and occasional pale-gold mineral flecks. Unlike Absolute Black or Indian Premium Black, which read as solid black, Black Pearl has visible texture and sparkle that catches light — making it a popular choice for kitchen islands, bar tops, and feature walls where the surface itself becomes a design element.',
      },
      {
        heading: 'Why Black Pearl ships to the US in such high volume',
        body: 'Three reasons. First, color consistency: block-to-block variation is unusually low for a natural granite, so a US fabricator ordering a container can confidently match seams across multiple slabs. Second, hardness — Black Pearl rates 7 on the Mohs scale, harder than most kitchen knife steels, which is why it resists scratches even from heavy daily use. Third, pricing: because the quarries are large and the variety is mature in the export market, Black Pearl trades at a more accessible price than Absolute Black while delivering similar visual impact. We see strong reorder rates from kitchen showrooms in Texas, Florida, the Mid-Atlantic, and the Pacific Northwest.',
      },
      {
        heading: 'Performance and maintenance',
        body: 'Compressive strength sits at 200–220 MPa, water absorption at 0.3%, and porosity under 0.5%. With proper sealing (recommended annually), Black Pearl is essentially impervious to common kitchen acids, oils, and hot pans. The dark surface does show watermarks more visibly than mid-toned granites — we recommend a leathered or honed finish rather than polished if the installation is in a high-use prep kitchen, since matte surfaces hide the mineral residue from hard water far better than a glossy polish.',
      },
      {
        heading: 'Finishes, sizes, and edge work',
        body: 'Available in polished (most popular), leathered (premium textured matte), honed (smooth matte), and flamed (rough for outdoor use). Standard slab dimensions: 96"–130" × 60"–78" in 2 cm and 3 cm. Large-format gang-sawn slabs available for monolithic island installations. Tiles in 12"×12", 18"×18", and 24"×24". All standard edge profiles supported (eased, bullnose, ogee, mitered, full bullnose), with custom edges priced separately.',
      },
      {
        heading: 'Ordering and US delivery',
        body: 'MOQ is one 20\' container (roughly 280–320 sqm). Lead time from purchase order to US port is 8–12 weeks, plus 1–2 weeks for customs clearance and inland trucking. We provide block photos before cutting, slab photos before packing, container loading photos before sealing, and full documentation including phyto certificates, COO, and packing lists. FOB Krishnapatnam, CIF most US ports, and DDP to warehouse all available. Container freight typically routes via Suez to East/Gulf coasts or via Pacific to West Coast.',
      },
    ],
  },
  'steel-grey': {
    name: 'Steel Grey Granite',
    code: 'GRT-STG',
    image: graniteSteelGrey,
    accent: 'slate',
    description: 'A premium medium-dark grey granite with swirling silver and white cloud patterns. One of Karnataka\'s highest-volume exports with strong demand across the US, Germany, and the Middle East.',
    specs: [
      { label: 'Origin', value: 'Karnataka, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Dark Grey & Silver' },
    ],
    applications: [
      'Kitchen Countertops',
      'Flooring',
      'Wall Panels',
      'Exterior Cladding',
      'Bathroom Vanities',
      'Commercial Flooring',
      'Stair Treads',
      'Paving',
    ],
    longContent: [
      {
        heading: 'About Steel Grey Granite',
        body: 'Steel Grey is one of the most exported granites from Karnataka, India, recognizable by its swirling cloud-like pattern of silver, white, and charcoal-grey crystals across a medium-dark grey background. Unlike fine-grained black granites, Steel Grey has visible movement and depth — each slab carries a unique distribution of silver and pewter swirls. This makes it the natural choice for architects and designers who want a contemporary neutral with character rather than a flat field of color.',
      },
      {
        heading: 'Why Steel Grey works for both residential and commercial projects',
        body: 'Steel Grey hits the sweet spot between Black Pearl (too dark for some interiors) and Kashmir White (too busy for minimalist designs). The mid-grey field reads as sophisticated and modern, pairing equally well with white shaker cabinets in a residential kitchen and stainless steel fixtures in a corporate lobby. Because the pattern is randomized rather than veined, you get visual interest without the bookmatching complexity of marble-look granites. It is also one of the more forgiving granites for fabricators — seams blend naturally into the pattern, and small imperfections are absorbed by the busy surface rather than highlighted.',
      },
      {
        heading: 'Technical performance',
        body: 'Mohs hardness of 6–7, compressive strength of 190–210 MPa, water absorption at 0.4%, and porosity below 0.6%. Steel Grey passes the standard freeze-thaw cycling tests required for exterior installations in the US Northeast and Midwest, making it suitable for cladding, paving, and pool decks in addition to interior surfaces. Like all granites, sealing once per year preserves stain resistance against oil, wine, and acidic spills.',
      },
      {
        heading: 'Finishes, formats, and applications',
        body: 'Polished is the standard finish and delivers the deepest contrast between the silver crystals and the grey field. Honed is increasingly popular for residential kitchens — it softens the visual to a smooth matte while retaining the pattern. Flamed and bush-hammered finishes are available for exterior paving and slip-critical commercial floors. Slab format: 96"–130" × 60"–78" in 2 cm and 3 cm. Tile formats: 12"×12", 18"×18", 24"×24". Custom cut-to-size available for stair treads, vanity tops, and wall cladding panels.',
      },
      {
        heading: 'Ordering, MOQ, and US delivery',
        body: 'Minimum order is one 20\' container (about 280–320 sqm of 2 cm material). Lead time from PO to US port is 8–12 weeks. Steel Grey ships in significant volume from Krishnapatnam and Chennai ports, with reliable ocean freight schedules to US East Coast, Gulf, and West Coast destinations. We provide block-to-bundle photo documentation, IPPC-stamped wood crating, and full export documentation. FOB India, CIF US port, and DDP to US warehouse pricing all available depending on your customs and inland logistics preferences.',
      },
    ],
  },
  'black-forest': {
    name: 'Black Forest Granite',
    code: 'GRT-BFT',
    image: graniteBlackForest,
    accent: 'slate',
    description: 'A dramatic deep black granite with bold flowing white and cream veins. The high contrast pattern makes it a statement choice for feature walls, kitchen islands, and luxury interiors.',
    specs: [
      { label: 'Origin', value: 'Karnataka, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Pattern', value: 'Bold Flowing Veins' },
    ],
    applications: [
      'Kitchen Islands',
      'Feature Walls',
      'Bathroom Vanities',
      'Flooring',
      'Reception Desks',
      'Staircases',
      'Luxury Interiors',
      'Commercial Counters',
    ],
    longContent: [
      {
        heading: 'About Black Forest Granite',
        body: 'Black Forest is quarried in Karnataka and stands apart from other black granites for its bold, high-contrast veining — flowing bands of white and cream cutting across a deep black field, closer in visual drama to a marble-look granite than the uniform speckle of Black Pearl or Absolute Black. This is the variety designers reach for when a kitchen island or feature wall needs to be the room\'s focal point rather than a quiet backdrop.',
      },
      {
        heading: 'Why designers spec Black Forest for statement pieces',
        body: 'Every slab of Black Forest carries a unique vein pattern, which means fabricators and designers treat it more like a marble slab selection process — buyers often want to see and approve the specific slab before fabrication, particularly for bookmatched island installations where the veining needs to mirror across the seam. We support slab selection by photo for US buyers who want to approve pattern and vein flow before their container ships. This is the granite variety most likely to be requested by name after a client has seen a photo online, which is exactly the kind of high-intent search traffic a distinctive stone like this can capture.',
      },
      {
        heading: 'Performance and technical specs',
        body: 'Despite the dramatic pattern, Black Forest performs like a standard high-grade granite: Mohs hardness of 6.5–7, compressive strength around 200 MPa, water absorption near 0.4%. The veining does not represent a structural weak point — it is mineral banding native to the stone, not a fracture line, and slabs are resin-treated at origin the same as any other variety we ship.',
      },
      {
        heading: 'Finishes, formats, and fabrication notes',
        body: 'Polished finish is standard and essential for this variety — it is what makes the vein contrast pop. Honed is available on request but is rarely chosen for Black Forest since it mutes the pattern that makes the stone desirable. Slab format: 96"–130" × 60"–78" in 2 cm and 3 cm, large-format gang-sawn slabs available for monolithic islands. We recommend 3 cm thickness for waterfall-edge islands to give the vein pattern enough visual weight on the vertical face.',
      },
      {
        heading: 'Ordering and US delivery',
        body: 'MOQ is one 20\' container. Because vein-pattern granites have more block-to-block variation than uniform colors, we recommend ordering slightly above your calculated square footage need (5–8% buffer) to allow for pattern matching and waste during fabrication. Lead time from PO to US port is 8–12 weeks, with slab selection photos provided before cutting for approval.',
      },
    ],
  },
  'imperial-blue': {
    name: 'Imperial Blue Granite',
    code: 'GRT-IMB',
    image: graniteImperialBlue,
    accent: 'blue',
    description: 'A striking vivid blue granite dense with silver and white mica sparkle. Quarried in Andhra Pradesh, it is a premium and distinctive stone that commands attention in any installation.',
    specs: [
      { label: 'Origin', value: 'Andhra Pradesh, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Vivid Blue & Silver' },
    ],
    applications: [
      'Feature Walls',
      'Bathroom Vanities',
      'Kitchen Countertops',
      'Flooring',
      'Exterior Facades',
      'Luxury Interiors',
      'Commercial Counters',
      'Architectural Details',
    ],
    longContent: [
      {
        heading: 'About Imperial Blue Granite',
        body: 'Imperial Blue is one of the rarest true-blue granites available from India, quarried in a limited number of sites across Andhra Pradesh. The vivid blue field is dense with silver and white mica particles that catch light dramatically under both natural sun and interior spotlighting — a mineral composition that occurs in very few granite deposits worldwide, which is part of why this variety commands premium pricing relative to standard colors.',
      },
      {
        heading: 'Why Imperial Blue is a premium-tier specification',
        body: 'Blue is the rarest color in the granite spectrum because it requires a specific mineral (typically sodalite or similar blue silicates) that most quarries simply do not contain. This scarcity is why Imperial Blue is typically specified for signature pieces — a bar top, a statement bathroom vanity, a reception desk — rather than whole-kitchen coverage. US buyers searching for "blue granite countertop" or "rare granite colors" are almost always looking for exactly this variety, and the search volume, while smaller than mainstream colors, converts to higher-value orders because buyers already know they want something unusual.',
      },
      {
        heading: 'Technical performance',
        body: 'Mohs hardness 6–6.5, water absorption approximately 0.4%, compressive strength around 180–200 MPa — comparable durability to other premium granites despite the unusual mineral composition. Sealing is recommended annually as with any granite; the dark blue background hides most everyday marks well, similar to other dark-toned stones.',
      },
      {
        heading: 'Finishes, sizes, and fabrication considerations',
        body: 'Polished is essentially the only finish requested for Imperial Blue — the mica sparkle is the entire point of the stone and a matte finish would mute it substantially. Available in standard slab format 96"–130" × 60"–78", though because block yield is lower than mainstream colors, large single-slab pieces should be reserved and confirmed early in project planning. Tile format available in 12"×12" and 18"×18" for smaller accent applications.',
      },
      {
        heading: 'Ordering, availability, and lead times',
        body: 'Because Imperial Blue comes from a small number of quarry sites, availability is less predictable than mainstream granites — we recommend reserving blocks 4–6 weeks before you need cutting to begin, longer than the standard lead time for common colors. MOQ can be more flexible for this variety; LCL (less than container load) shipment is more commonly used given that most orders are for accent pieces rather than whole-house volume. Contact us directly to confirm current block availability before finalizing a project timeline.',
      },
    ],
  },
  'coffee-brown': {
    name: 'Coffee Brown Granite',
    code: 'GRT-CFB',
    image: graniteCoffeeBrown,
    accent: 'amber',
    description: 'A rich dark olive-brown granite with scattered golden, amber, and cream crystalline flecks. A reliable and popular earth-tone granite with consistent demand in residential and commercial projects.',
    specs: [
      { label: 'Origin', value: 'South India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Dark Brown & Gold' },
    ],
    applications: [
      'Kitchen Countertops',
      'Flooring',
      'Bathroom Vanities',
      'Wall Cladding',
      'Outdoor Paving',
      'Stair Treads',
      'Table Tops',
      'Commercial Flooring',
    ],
    longContent: [
      {
        heading: 'About Coffee Brown Granite',
        body: 'Coffee Brown is a dependable earth-tone granite from South India, sitting visually between Tan Brown\'s golden warmth and darker charcoal browns. The olive-brown base with scattered golden and cream crystalline flecks gives it a grounded, understated look that works in almost any design context without competing for attention — the reason it remains a steady seller year over year rather than a trend-driven color.',
      },
      {
        heading: 'Why Coffee Brown is a safe, versatile specification',
        body: 'When a US buyer needs a brown granite but isn\'t sure which specific variety fits their project, Coffee Brown is frequently the answer — it reads as warm without being as dramatic as Tan Brown, and pairs with a wider range of cabinetry and flooring choices. Contractors and builders working on spec homes or multi-unit residential projects favor it for exactly this reason: broad compatibility reduces design risk across many buyers.',
      },
      {
        heading: 'Performance specs',
        body: 'Mohs hardness 6–6.5, water absorption around 0.4%, suitable for both interior surfaces and exterior applications. Standard sealing maintains stain resistance against typical kitchen and outdoor exposure.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished is the standard finish; flamed and honed available for exterior paving and contemporary interiors respectively. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm. Tiles in 12"×12", 18"×18", and 24"×24".',
      },
      {
        heading: 'Ordering and delivery',
        body: 'MOQ one 20\' container, standard lead time 8–12 weeks from PO to US port. Reliable block availability given the volume this variety is quarried at.',
      },
    ],
  },
  'thunder-black': {
    name: 'Thunder Black Granite',
    code: 'GRT-THB',
    image: graniteThunderBlack,
    accent: 'slate',
    description: 'A very dark charcoal-black granite with subtle swirling grey patterns and a fine uniform texture. An excellent choice for sleek modern interiors and high-traffic commercial spaces.',
    specs: [
      { label: 'Origin', value: 'Karnataka, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Charcoal Black' },
    ],
    applications: [
      'Flooring',
      'Kitchen Countertops',
      'Wall Cladding',
      'Exterior Facades',
      'Commercial Lobbies',
      'Stair Treads',
      'Bathroom Vanities',
      'Outdoor Paving',
    ],
    longContent: [
      {
        heading: 'About Thunder Black Granite',
        body: 'Thunder Black is a very dark charcoal granite with subtle swirling grey undertones and a finer, more uniform texture than Black Pearl or Black Forest. Where those varieties show visible sparkle or bold veining, Thunder Black reads as close to solid black while still carrying enough natural mineral variation to distinguish it from engineered black surfaces.',
      },
      {
        heading: 'Why Thunder Black suits commercial and modern residential work',
        body: 'The fine, near-uniform texture makes Thunder Black a favorite for large-scale commercial flooring and cladding projects where visual consistency across dozens or hundreds of slabs matters more than individual pattern character. It is also frequently specified for sleek, minimalist kitchen designs where a true near-solid black is wanted without the premium pricing of Absolute Black.',
      },
      {
        heading: 'Technical performance',
        body: 'Mohs hardness 6.5–7, water absorption approximately 0.3–0.4%, high compressive strength suitable for heavy-traffic commercial flooring. Excellent stain resistance once sealed, with the dark tone hiding everyday wear exceptionally well.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished, honed, and flamed finishes all available. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm; large-format gang-sawn slabs available for commercial flooring runs requiring minimal seams. Tiles in standard 12"×12", 18"×18", and 24"×24" formats.',
      },
      {
        heading: 'Ordering and shipping',
        body: 'MOQ one 20\' container, standard lead time 8–12 weeks from PO to US port, with strong consistent block availability given the high volume this variety is quarried at.',
      },
    ],
  },
  'paradiso-classico': {
    name: 'Paradiso Classico Granite',
    code: 'GRT-PDC',
    image: graniteParadisoClassico,
    accent: 'violet',
    description: 'A distinctive banded granite with strong diagonal layers of grey, salmon-pink, and black. Quarried in Hassan District, Karnataka, it is well recognised internationally and prized for its unique natural movement.',
    specs: [
      { label: 'Origin', value: 'Hassan District, Karnataka, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Pattern', value: 'Diagonal Banding' },
    ],
    applications: [
      'Feature Walls',
      'Flooring',
      'Countertops',
      'Bathroom Vanities',
      'Hotel Interiors',
      'Reception Areas',
      'Staircases',
      'Exterior Cladding',
    ],
    longContent: [
      {
        heading: 'About Paradiso Classico Granite',
        body: 'Paradiso Classico is quarried specifically in the Hassan District of Karnataka and is internationally recognized for its distinctive diagonal banding — strong layers of grey, salmon-pink, and black running across the slab at an angle rather than the wave or swirl patterns typical of other granites. This directional banding is the variety\'s signature and the reason it is specified by name by architects who have seen it in prior projects.',
      },
      {
        heading: 'Why architects specify Paradiso Classico by name',
        body: 'The diagonal banding creates striking visual effects when slabs are laid in sequence — feature walls and flooring runs can be arranged to create continuous or mirrored diagonal patterns across a room. This is a design-forward stone: buyers searching for it typically already know the name from seeing it in a portfolio, magazine, or prior installation, making it a strong candidate for direct-match SEO once a page exists to be found.',
      },
      {
        heading: 'Technical performance',
        body: 'Mohs hardness 6–6.5, water absorption around 0.4%. Because the banding is directional, we recommend confirming slab orientation preferences before cutting — buyers typically want the diagonal bands to run consistently across sequential slabs for continuous flooring or wall installations.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished finish is standard and required to properly showcase the banding contrast. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm. Tiles available in 12"×12" and 18"×18" for smaller accent applications, though the banding is best appreciated in larger slab format.',
      },
      {
        heading: 'Ordering and lead times',
        body: 'MOQ one 20\' container. Given the specific quarry source, we recommend confirming block availability and desired banding orientation 2–3 weeks before your project cutting date. Standard lead time 8–12 weeks from PO to US port.',
      },
    ],
  },
  'copper-silk': {
    name: 'Copper Silk Granite',
    code: 'GRT-CPS',
    image: graniteCopperSilk,
    accent: 'red',
    description: 'A warm copper-rust granite with flowing dark green and black veining. A classic South Indian stone from Andhra Pradesh and Tamil Nadu with good export presence in the Middle East and European markets.',
    specs: [
      { label: 'Origin', value: 'Andhra Pradesh / Tamil Nadu, India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Copper & Dark Green' },
    ],
    applications: [
      'Countertops',
      'Flooring',
      'Wall Cladding',
      'Bathroom Vanities',
      'Fireplace Surrounds',
      'Feature Walls',
      'Hotel Interiors',
      'Table Tops',
    ],
    longContent: [
      {
        heading: 'About Copper Silk Granite',
        body: 'Copper Silk is a classic South Indian granite quarried across Andhra Pradesh and Tamil Nadu, historically one of India\'s strongest export stones to the Middle East and Europe and increasingly requested by US buyers seeking a warm copper-rust tone with distinctive dark green and black veining. The combination of warm base color and cool green veining gives it more visual complexity than typical brown granites.',
      },
      {
        heading: 'Why Copper Silk appeals to US buyers now',
        body: 'As warm metallics (copper, brass, bronze fixtures) have become a dominant US interior design trend, granites with genuine copper-toned coloring like Copper Silk have seen renewed interest from designers looking to echo metallic fixture finishes in a natural stone surface. It is particularly effective for fireplace surrounds and accent walls where the copper tone can be a focal point.',
      },
      {
        heading: 'Technical specifications',
        body: 'Mohs hardness 6–6.5, water absorption around 0.4%, consistent quality given the long-established quarry operations producing this variety. Suitable for both interior surfaces and select exterior applications.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished finish is standard and recommended to bring out the copper-to-green contrast. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm. Tiles available in 12"×12" and 18"×18" formats.',
      },
      {
        heading: 'Ordering and US delivery',
        body: 'MOQ one 20\' container, standard lead time 8–12 weeks from PO to US port. Given established export history to Europe and the Middle East, block availability and quality consistency are typically reliable for this variety.',
      },
    ],
  },
  'silver-silk': {
    name: 'Silver Silk Granite',
    code: 'GRT-SVS',
    image: graniteSilverSilk,
    accent: 'slate',
    description: 'A grey granite with golden-caramel wavy banding and strong foliation patterns. The warm gold tones against a cool grey base give it a distinctive and luxurious character popular in the Middle East and Southeast Asia.',
    specs: [
      { label: 'Origin', value: 'South India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Pattern', value: 'Wavy Banding' },
    ],
    applications: [
      'Countertops',
      'Flooring',
      'Wall Panels',
      'Reception Desks',
      'Bathroom Vanities',
      'Hotel Interiors',
      'Stair Treads',
      'Fireplace Surrounds',
    ],
    longContent: [
      {
        heading: 'About Silver Silk Granite',
        body: 'Silver Silk combines a cool grey base with warm golden-caramel wavy banding, a foliation pattern that occurs when the original rock formation was subjected to intense heat and pressure over geological time, creating the flowing, almost fabric-like bands the stone is named for. This contrast between cool grey and warm gold gives it a distinctly luxurious character that has made it popular in high-end Middle Eastern and Southeast Asian hospitality projects.',
      },
      {
        heading: 'Why Silver Silk suits premium hospitality and residential projects',
        body: 'The combination of neutral grey (which fits contemporary Western design sensibilities) with warm gold banding (which reads as luxurious rather than dated) makes Silver Silk a strong crossover choice for US buyers who want something more distinctive than standard grey granites without moving into bold or unconventional color territory. It works particularly well for reception desks and feature walls where the foliation pattern can be showcased as a design statement.',
      },
      {
        heading: 'Technical performance',
        body: 'Mohs hardness 6–6.5, water absorption approximately 0.4%. As with other banded/foliated granites, slab selection and orientation matter for continuous pattern flow across large installations — we provide slab photos for approval on request.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished finish is standard and essential to showcase the silver-to-gold contrast. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm. Tiles available in 12"×12" and 18"×18" for smaller installations.',
      },
      {
        heading: 'Ordering and shipping to the US',
        body: 'MOQ one 20\' container, standard lead time 8–12 weeks from PO to US port. Full documentation and FOB/CIF/DDP options available.',
      },
    ],
  },
  'multicolor-red': {
    name: 'Multicolor Red Granite',
    code: 'GRT-MCR',
    image: graniteMulticolorRed,
    accent: 'red',
    description: 'A warm multi-toned granite with copper, brown, cream, and dark mineral swirling throughout. A vibrant and characterful stone suited to projects requiring strong natural colour and movement.',
    specs: [
      { label: 'Origin', value: 'South India' },
      { label: 'Material', value: 'Natural Granite' },
      { label: 'Thickness', value: '2 cm / 3 cm' },
      { label: 'Tone', value: 'Copper Brown & Cream' },
    ],
    applications: [
      'Feature Walls',
      'Flooring',
      'Countertops',
      'Exterior Cladding',
      'Bathroom Vanities',
      'Stair Treads',
      'Commercial Spaces',
      'Table Tops',
    ],
    longContent: [
      {
        heading: 'About Multicolor Red Granite',
        body: 'Multicolor Red lives up to its name — copper, brown, cream, and dark mineral tones swirl throughout the slab rather than settling into a single dominant color family. This is the most visually energetic granite in our range, chosen specifically by buyers who want a natural stone surface to function as the room\'s centerpiece rather than a supporting background element.',
      },
      {
        heading: 'Where Multicolor Red gets specified',
        body: 'This variety works best in spaces designed around bold natural materials — rustic and Mediterranean-influenced kitchens, outdoor entertaining areas, and commercial spaces (restaurants, boutique retail) wanting a distinctive natural stone identity. It pairs well with warm wood tones and wrought iron or bronze fixtures, and is a strong match for buyers specifically searching for "colorful granite" or "multicolor natural stone" rather than standard neutral options.',
      },
      {
        heading: 'Performance specifications',
        body: 'Mohs hardness 6–6.5, water absorption around 0.4%, suitable for interior and exterior applications including cladding and paving. The busy, multi-toned pattern is highly forgiving of everyday wear and minor surface marks.',
      },
      {
        heading: 'Finishes and formats',
        body: 'Polished finish is standard; flamed available for exterior paving applications requiring slip resistance. Slab format 96"–130" × 60"–78" in 2 cm and 3 cm. Tiles in 12"×12" and 18"×18" formats.',
      },
      {
        heading: 'Ordering and US delivery',
        body: 'MOQ one 20\' container, standard lead time 8–12 weeks from PO to US port with full export documentation and container loading photos provided on every shipment.',
      },
    ],
  },
};

function EdgeSVG({ name, selected }) {
  const stroke = selected ? '#c9a84c' : '#999';
  const fill = selected ? 'rgba(201,168,76,0.14)' : 'rgba(150,150,145,0.14)';
  // Wider viewBox (0 0 72 100) gives the stone body clear width
  // Right side of each path = the visible edge profile
  // Top of each path (y=14) = counter surface (horizontal)
  const paths = {
    'Eased Edge':    'M 5 14 L 56 14 Q 66 14 66 24 L 66 90 L 5 90 Z',
    'Straight Edge': 'M 5 14 L 66 14 L 66 90 L 5 90 Z',
    'Beveled Edge':  'M 5 14 L 52 14 L 66 28 L 66 90 L 5 90 Z',
    'Half Bullnose': 'M 5 14 L 40 14 Q 66 14 66 40 L 66 90 L 5 90 Z',
    'Full Bullnose': 'M 5 14 L 24 14 A 36 38 0 0 1 24 90 L 5 90 Z',
    'Ogee Edge':     'M 5 14 L 40 14 C 70 14 70 40 40 53 C 10 66 10 76 40 90 L 5 90 Z',
  };
  return (
    <svg viewBox="0 0 72 104" width="58" height="84" aria-hidden="true">
      {/* Subtle top-surface extension line */}
      <line x1="5" y1="14" x2="70" y2="14" stroke={stroke} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
      <path
        d={paths[name] || paths['Straight Edge']}
        fill={fill}
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getBadgeClasses(color, isSelected) {
  if (color === 'gold') return 'bg-[#c9a84c] text-white';
  if (color === 'green') return 'bg-emerald-600 text-white';
  if (color === 'stone') return 'bg-stone-500 text-white';
  if (color === 'slate') return 'bg-slate-600 text-white';
  if (color === 'dark') return isSelected ? 'bg-white/15 text-white/80' : 'bg-black text-white';
  return isSelected ? 'bg-white/10 text-white/60' : 'bg-stone-100 text-stone-600';
}

export default function GraniteDetail({ cartItems = [], onAddToCart, onRemoveMatchingCartItem, onOpenContact }) {
  const { graniteId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedEdge, setSelectedEdge] = useState('');
  const [isBuyerGuideOpen, setIsBuyerGuideOpen] = useState(false);
  const [addMessage, setAddMessage] = useState('');
  const [, triggerSizeRipple] = useRipple();
  const [, triggerFinishRipple] = useRipple();
  const [, triggerEdgeRipple] = useRipple();

  const stone = graniteData[graniteId];
  const cartCount = cartItems.reduce((sum, item) => sum + (item.sqm || 0), 0);
  const selectedCartItem = cartItems.find((item) => (
    item.colorId === graniteId
    && item.size === selectedSize
    && item.finish === selectedFinish
    && item.edge === selectedEdge
  ));
  const selectedCartCount = selectedCartItem?.sqm || 0;
  // Smooth scroll for this page
  useEffect(() => {
    let animId;
    let active = true;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });
    function raf(t) { if (active) { lenis.raf(t); animId = requestAnimationFrame(raf); } }
    animId = requestAnimationFrame(raf);
    return () => { active = false; cancelAnimationFrame(animId); lenis.destroy(); };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [graniteId]);

  useEffect(() => {
    if (!addMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setAddMessage('');
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [addMessage]);

  const handleSizeSelect = (sizeName, e) => {
    if (e) triggerSizeRipple(e);
    setSelectedSize(sizeName);
    setSelectedFinish('');
    setSelectedEdge('');
  };

  const handleFinishSelect = (finishName, e) => {
    if (!selectedSize) return;
    if (e) triggerFinishRipple(e);
    setSelectedFinish(finishName);
    setSelectedEdge('');
  };

  const handleEdgeSelect = (edgeName, e) => {
    if (!selectedFinish) return;
    if (e) triggerEdgeRipple(e);
    setSelectedEdge(edgeName);
    if (edgeName !== selectedEdge) {
      handleAddToCart(edgeName, 1);
    }
  };

  const handleAddToCart = (edgeName = selectedEdge, quantity = 1) => {
    if (!stone || !selectedSize || !selectedFinish || !edgeName) {
      return;
    }

    onAddToCart?.({
      id: `${stone.code}-${selectedSize}-${selectedFinish}-${edgeName}`,
      category: 'granite',
      stoneName: stone.name,
      stoneCode: stone.code,
      colorId: graniteId,
      size: selectedSize,
      finish: selectedFinish,
      edge: edgeName,
      sqm: quantity,
    });
    setAddMessage(`${stone.name} added to cart.`);
  };

  const handleRemoveFromCart = (quantity = 1) => {
    if (!stone || !selectedSize || !selectedFinish || !selectedEdge) {
      return;
    }

    onRemoveMatchingCartItem?.({
      colorId: graniteId,
      size: selectedSize,
      finish: selectedFinish,
      edge: selectedEdge,
      sqm: quantity,
    });
  };

  const handleCustomizeSpecs = () => {
    navigate('/customize-stone', {
      state: {
        stoneName: stone?.name,
        colorId: graniteId,
      },
    });
  };

  if (!stone) {
    return (
      <div className="min-h-screen bg-white">
        <Seo path={`/granite/${graniteId || ''}`} title="Granite Not Found" noindex />
        <Navbar onOpenModal={() => setIsModalOpen(true)} onOpenContact={onOpenContact} cartCount={cartCount} />
        <div className="px-6 pt-40 text-center">
          <h1 className="text-3xl font-gabarito font-bold text-black">Granite not found</h1>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'limestone-collection' } })}
            className="mt-6 rounded-sm bg-black px-6 py-3 font-gabarito font-semibold text-white hover:bg-gray-800"
          >
            Back to Collection
          </button>
        </div>
        <Footer onOpenModal={() => setIsModalOpen(true)} onOpenContact={onOpenContact} />
        <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }

  const productImageUrl = stone.image && stone.image.startsWith('http') ? stone.image : `${SITE_URL}${stone.image}`;
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stone.name,
    sku: stone.code,
    image: [productImageUrl],
    description: stone.description,
    brand: { '@type': 'Brand', name: 'Sunrise Stones Industries' },
    category: 'Natural Granite',
    material: 'Granite',
    countryOfOrigin: 'IN',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Granite', item: SITE_URL + '/#granite-collection' },
      { '@type': 'ListItem', position: 3, name: stone.name, item: `${SITE_URL}/granite/${graniteId}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        path={`/granite/${graniteId}`}
        title={`${stone.name} — Slabs, Tiles & Custom Sizes`}
        description={`Buy ${stone.name} direct from Sunrise Stones Industries. ${stone.description.slice(0, 110)}... Custom slabs, tiles and fabrication. US nationwide supply.`}
        keywords={`${stone.name}, ${stone.name} slabs, ${stone.name} tiles, ${stone.name} countertops, Indian granite, granite supplier USA, wholesale granite`}
        image={productImageUrl}
        imageAlt={`${stone.name} slab — polished surface`}
        type="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onOpenContact={onOpenContact}
        cartCount={cartCount}
      />

      <main className="pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl px-6 py-6 md:px-12"
        >
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'limestone-collection' } })}
            className="group flex items-center gap-2 font-gabarito text-sm text-stone-500 transition-all duration-200 hover:text-black"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Granite Collection
          </button>
        </motion.div>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 overflow-hidden rounded-sm shadow-lg md:h-[500px]">
                <img src={stone.image} alt={stone.name} className="h-full w-full object-cover" loading="eager" decoding="async" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <p className="mb-2 font-gabarito text-sm uppercase tracking-wide text-gray-600">
                Product Code: {stone.code}
              </p>
              <h1 className="mb-6 text-4xl font-gabarito font-bold text-black md:text-5xl">
                {stone.name}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                {stone.description}
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4">
                {stone.specs.map((spec) => (
                  <div key={spec.label} className="rounded-sm bg-gray-100 p-4">
                    <p className="mb-2 font-gabarito text-xs uppercase tracking-wide text-gray-600">
                      {spec.label}
                    </p>
                    <p className="font-gabarito text-lg font-bold text-black">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 rounded-sm bg-black py-4 font-gabarito font-bold tracking-wide text-white transition-all duration-220 hover:bg-gray-800"
                >
                  Request Quote
                </button>
                <button
                  onClick={handleCustomizeSpecs}
                  className="rounded-sm border border-black px-5 py-3 font-gabarito text-sm font-semibold tracking-wide text-black transition-all duration-220 hover:bg-black hover:text-white sm:w-auto"
                >
                  Customize Specs
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="mb-10">
              <p className="mb-2 font-gabarito text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
                Step 01
              </p>
              <h2 className="text-3xl font-gabarito font-bold text-black md:text-4xl">
                Format & Size
              </h2>
              <div className="mt-4 h-px bg-gradient-to-r from-[#c9a84c] via-[#c9a84c]/20 to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {GRANITE_TYPES.map((type, index) => (
                <motion.button
                  key={type.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                  onClick={(e) => handleSizeSelect(type.name, e)}
                  className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                    selectedSize === type.name
                      ? 'border-[#c9a84c] bg-[#0a0a0a] shadow-[0_0_0_1px_#c9a84c,0_20px_60px_rgba(0,0,0,0.28)]'
                      : 'border-[#e8e8e4] bg-white hover:border-[#c9a84c]/40 hover:shadow-xl'
                  }`}
                >
                  {selectedSize === type.name && (
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#c9a84c]" />
                  )}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className={`font-gabarito text-base font-bold leading-snug ${selectedSize === type.name ? 'text-white' : 'text-black'}`}>
                      {type.name}
                    </h3>
                    {type.badge && (
                      <span className={`shrink-0 rounded-full px-2.5 py-1 font-gabarito text-[10px] font-bold uppercase tracking-wider ${getBadgeClasses(type.badgeColor, selectedSize === type.name)}`}>
                        {type.badge}
                      </span>
                    )}
                  </div>
                  <p className={`mb-2.5 font-mono text-[11px] tracking-wide ${selectedSize === type.name ? 'text-[#c9a84c]' : 'text-stone-400'}`}>
                    {type.sizes}
                  </p>
                  <p className={`text-sm leading-relaxed ${selectedSize === type.name ? 'text-white/60' : 'text-stone-500'}`}>
                    {type.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-20"
          >
            <div className="mb-10">
              <p className="mb-2 font-gabarito text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
                Step 02
              </p>
              <h2 className="text-3xl font-gabarito font-bold text-black md:text-4xl">
                Surface Finish
              </h2>
              <div className="mt-4 h-px bg-gradient-to-r from-[#c9a84c] via-[#c9a84c]/20 to-transparent" />
              {!selectedSize && (
                <p className="mt-3 font-gabarito text-sm text-stone-400">
                  Select a format above to unlock finish options.
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {GRANITE_FINISHES.map((finish, index) => (
                <motion.button
                  key={finish.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={selectedSize ? { y: -3 } : undefined}
                  onClick={(e) => handleFinishSelect(finish.name, e)}
                  className={`group flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                    !selectedSize
                      ? 'cursor-not-allowed border-[#e8e8e4] opacity-40'
                      : selectedFinish === finish.name
                        ? 'border-[#c9a84c] shadow-[0_0_0_1px_#c9a84c,0_20px_60px_rgba(0,0,0,0.18)]'
                        : 'border-[#e8e8e4] hover:border-[#c9a84c]/40 hover:shadow-xl'
                  }`}
                >
                  {/* Full-width swatch area on top */}
                  <div
                    className="relative h-20 w-full"
                    style={SWATCH_STYLES[finish.swatch]}
                  >
                    <span className="absolute bottom-2 left-3 font-gabarito text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">
                      {finish.swatchLabel}
                    </span>
                  </div>
                  {/* Text content below */}
                  <div className={`flex flex-1 flex-col p-4 transition-colors duration-300 ${selectedFinish === finish.name ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <span className={`font-gabarito text-sm font-bold ${selectedFinish === finish.name ? 'text-white' : 'text-black'}`}>
                        {finish.name}
                      </span>
                      {finish.badge && (
                        <span className={`rounded-full px-2 py-0.5 font-gabarito text-[9px] font-bold uppercase tracking-wider ${getBadgeClasses(finish.badgeColor, selectedFinish === finish.name)}`}>
                          {finish.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${selectedFinish === finish.name ? 'text-white/55' : 'text-stone-500'}`}>
                      {finish.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-20"
          >
            <div className="mb-10">
              <p className="mb-2 font-gabarito text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
                Step 03
              </p>
              <h2 className="text-3xl font-gabarito font-bold text-black md:text-4xl">
                Edge Profile
              </h2>
              <div className="mt-4 h-px bg-gradient-to-r from-[#c9a84c] via-[#c9a84c]/20 to-transparent" />
              {!selectedFinish && (
                <p className="mt-3 font-gabarito text-sm text-stone-400">
                  Select a surface finish above to unlock edge options.
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {GRANITE_EDGES.map((edge, index) => (
                <motion.button
                  key={edge.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={selectedFinish ? { y: -3 } : undefined}
                  onClick={(e) => handleEdgeSelect(edge.name, e)}
                  className={`group flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                    !selectedFinish
                      ? 'cursor-not-allowed border-[#e8e8e4] opacity-40'
                      : selectedEdge === edge.name
                        ? 'border-[#c9a84c] shadow-[0_0_0_1px_#c9a84c,0_20px_60px_rgba(0,0,0,0.18)]'
                        : 'border-[#e8e8e4] hover:border-[#c9a84c]/40 hover:shadow-xl'
                  }`}
                >
                  {/* Large icon area on top */}
                  <div className={`flex h-28 items-center justify-center transition-colors duration-300 ${selectedEdge === edge.name ? 'bg-[#111111]' : 'bg-[#f5f5f2]'}`}>
                    <EdgeSVG name={edge.name} selected={selectedEdge === edge.name} />
                  </div>
                  {/* Text content below */}
                  <div className={`flex flex-1 flex-col p-4 transition-colors duration-300 ${selectedEdge === edge.name ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <span className={`font-gabarito text-sm font-bold ${selectedEdge === edge.name ? 'text-white' : 'text-black'}`}>
                        {edge.name}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 font-gabarito text-[9px] font-bold uppercase tracking-wider ${getBadgeClasses(edge.tagColor, selectedEdge === edge.name)}`}>
                        {edge.tag}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${selectedEdge === edge.name ? 'text-white/55' : 'text-stone-500'}`}>
                      {edge.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16 rounded-[28px] border border-[#c9a84c]/15 bg-[#0a0a0a] p-8 md:p-12"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 font-gabarito text-xs font-bold uppercase tracking-[0.3em] text-[#c9a84c]">
                  Your Selection
                </p>
                <h2 className="text-3xl font-gabarito font-bold text-white md:text-4xl">
                  Ready to order
                </h2>
              </div>
              <span className="hidden rounded-full border border-white/15 px-4 py-2 font-gabarito text-xs text-white/50 sm:block">
                Added automatically
              </span>
            </div>

            <div className="mb-6 rounded-[20px] border border-white/10 bg-white/5 p-5 md:p-6">
              <div className="grid grid-cols-1 gap-3 font-gabarito text-sm sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a84c]">Product</p>
                  <p className="mt-2.5 text-sm font-semibold text-white">{selectedSize || '—'}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a84c]">Finish</p>
                  <p className="mt-2.5 text-sm font-semibold text-white">{selectedFinish || '—'}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a84c]">Edge Profile</p>
                  <p className="mt-2.5 text-sm font-semibold text-white">{selectedEdge || '—'}</p>
                </div>
                <div className="rounded-2xl bg-[#c9a84c] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/55">Cart Qty</p>
                  <p className="mt-0.5 text-xs text-black/40">This selection</p>
                  <p className="mt-1 text-3xl font-bold text-black">{selectedCartCount}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/5">
                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="font-gabarito text-xs font-bold uppercase tracking-[0.24em] text-[#c9a84c]">Cart Quantity</p>
                    <p className="mt-2 font-gabarito text-base font-semibold text-white">
                      {selectedCartCount > 0
                        ? 'Adjust this exact granite selection'
                        : 'Add this specification to activate quantity controls'}
                    </p>
                  </div>
                  <div className="flex items-center overflow-hidden rounded-full border border-white/15">
                    <button
                      onClick={() => handleRemoveFromCart(1)}
                      disabled={!selectedEdge || selectedCartCount === 0}
                      className={`flex h-14 w-14 items-center justify-center font-gabarito text-2xl transition-colors duration-220 ${
                        selectedEdge && selectedCartCount > 0
                          ? 'text-white hover:bg-white/10'
                          : 'cursor-not-allowed text-white/20'
                      }`}
                      aria-label="Decrease cart quantity"
                    >
                      −
                    </button>
                    <div className="flex h-14 min-w-16 items-center justify-center border-l border-r border-white/10 px-4 font-gabarito text-xl font-bold text-white">
                      {selectedCartCount}
                    </div>
                    <button
                      onClick={() => handleAddToCart(selectedEdge, 1)}
                      disabled={!selectedEdge || selectedCartCount === 0}
                      className={`flex h-14 w-14 items-center justify-center font-gabarito text-2xl transition-colors duration-220 ${
                        selectedEdge && selectedCartCount > 0
                          ? 'text-white hover:bg-white/10'
                          : 'cursor-not-allowed text-white/20'
                      }`}
                      aria-label="Increase cart quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {addMessage && (
                <p className="rounded-[18px] border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-5 py-3 font-gabarito text-sm text-[#c9a84c] md:col-span-2">
                  {addMessage}
                </p>
              )}

              <div className="grid gap-3 md:col-span-2 md:grid-cols-[minmax(0,1fr)_auto]">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-[22px] border border-white/15 bg-white/8 py-4 font-gabarito font-bold tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  Request Quote
                </motion.button>
                <motion.button
                  onClick={handleCustomizeSpecs}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-[22px] border border-white/15 px-5 py-4 font-gabarito text-sm font-semibold tracking-wide text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  Customize Specs
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="mb-12 text-3xl font-gabarito font-bold text-black md:text-4xl">
              Popular Uses
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stone.applications.map((application, index) => (
                <motion.div
                  key={application}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                  className="rounded-sm border-l-4 border-black bg-white p-5 transition-all duration-300 hover:shadow-lg"
                >
                  <p className="text-center font-gabarito font-semibold text-black md:text-left">{application}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {stone.longContent && stone.longContent.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-20 overflow-hidden rounded-[20px] border border-black/10 bg-[#fafaf7]"
            >
              <button
                type="button"
                onClick={() => setIsBuyerGuideOpen((isOpen) => !isOpen)}
                aria-expanded={isBuyerGuideOpen}
                className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors duration-220 hover:bg-black/[0.03] md:p-8"
              >
                <span>
                  <span className="mb-2 block font-gabarito text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
                    Buyer Guide
                  </span>
                  <span className="block text-2xl font-gabarito font-bold text-black md:text-3xl">
                    Everything to know about {stone.name}
                  </span>
                  <span className="mt-2 block text-sm text-gray-500">
                    {isBuyerGuideOpen ? 'Hide detailed product information' : 'Open detailed product information'}
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 text-2xl font-light text-black">
                  {isBuyerGuideOpen ? '−' : '+'}
                </span>
              </button>
              {isBuyerGuideOpen && (
                <div className="border-t border-black/10 p-6 md:p-12">
                  <div className="space-y-8">
                    {stone.longContent.map((section) => (
                      <div key={section.heading}>
                        <h3 className="mb-3 text-xl font-gabarito font-bold text-black md:text-2xl">
                          {section.heading}
                        </h3>
                        <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </section>
      </main>

      <Footer onOpenModal={() => setIsModalOpen(true)} onOpenContact={onOpenContact} />
      <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
