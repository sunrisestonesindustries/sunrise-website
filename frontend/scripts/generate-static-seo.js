/**
 * generate-static-seo.js
 *
 * Fixes the "every page shows homepage meta tags" problem in this
 * client-side-rendered React app.
 *
 * Why this exists: react-snap (full Puppeteer prerendering) fails on
 * Vercel's build image (missing libnss3.so). Rather than fight that,
 * this script does a much lighter version of the same job: it takes the
 * already-built build/index.html and, for each route in ROUTES below,
 * writes a copy to build/<route>/index.html with the <title>,
 * <meta description>, <link canonical>, and Open Graph / Twitter tags
 * swapped to match that route's real content.
 *
 * No headless browser, no React rendering — just string replacement on
 * static HTML. Vercel (and any static host) serves a matching file at
 * build/<route>/index.html before falling back to the SPA catch-all, so
 * crawlers that don't execute JS (Bing, social share bots, the first
 * pass of most crawlers) see the correct per-page tags immediately.
 *
 * The React app's own <Seo> component (react-helmet-async) still runs
 * client-side and keeps tags correct for users and JS-executing
 * crawlers — this script only fixes what they see *before* JS runs.
 *
 * Run automatically via `npm run build` (see package.json "postbuild").
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.sunrisestonesindustries.com';
const SITE_NAME = 'Sunrise Stones Industries';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg?v=1`;
const BUILD_DIR = path.join(__dirname, '..', 'build');

// ─── Route manifest — mirrors the <Seo> props set in each React page ───
// Keep this in sync with src/App.js, GraniteDetail.js, LimestoneDetail.js,
// StoneCustomizationPage.js, CompanyInfoPage.js, BlogPage.js.
const ROUTES = [
  {
    path: '/',
    title: 'Granite, Limestone & Natural Stone Supplier for US Buyers | Sunrise Stones Industries',
    description: 'Premium Indian granite, Tandur limestone and custom-fabricated countertops, slabs and tiles shipped to the USA. Direct-from-quarry pricing, container-load export, and reliable nationwide delivery for US distributors, architects and contractors.',
    keywords: 'natural stone supplier USA, Indian granite exporter, Tandur limestone supplier, wholesale granite slabs USA, custom stone fabrication, granite countertops, limestone tiles, marble alternative, stone import USA, granite import',
  },
  {
    path: '/customize-stone',
    title: 'Custom Stone Fabrication — Size, Finish & Edge Builder | Sunrise Stones Industries',
    description: 'Build custom-fabricated granite and limestone to your project spec: size, thickness, finish and edge profile. Sunrise Stones Industries — direct quarry sourcing, US nationwide supply.',
    keywords: 'custom stone fabrication, custom granite countertops, custom limestone tiles, stone edge profiles, granite finishes, made-to-spec stone, natural stone fabricator USA',
  },
  {
    path: '/terms',
    title: 'Terms of Supply | Sunrise Stones Industries',
    description: 'Terms of supply for Sunrise Stones Industries — quotations, custom orders, natural stone variation policy and export logistics terms.',
  },
  {
    path: '/privacy',
    title: 'Privacy & Contact Data | Sunrise Stones Industries',
    description: 'How Sunrise Stones Industries handles enquiry and quote data, customer information, and export documentation.',
  },
  {
    path: '/shipping-info',
    title: 'Shipping & Export Information | Sunrise Stones Industries',
    description: 'Container-load export, lead times, packaging and shipment planning for granite and limestone orders from Sunrise Stones Industries.',
  },
  {
    path: '/blog',
    title: "Stone Buyer's Blog — Granite, Marble & Limestone Guides | Sunrise Stones Industries",
    description: "Practical guides for buying natural stone: granite vs marble, importing Indian granite to the USA, Tandur limestone properties, and more from Sunrise Stones Industries.",
    keywords: "granite buyer's guide, marble buyer's guide, limestone guide, natural stone blog, Indian granite import",
  },
  {
    path: '/blog/granite-vs-marble-kitchen-countertops',
    title: "Granite vs Marble for Kitchen Countertops: A 2026 Buyer's Guide | Sunrise Stones Industries",
    description: 'Granite vs marble for kitchen countertops — durability, maintenance, price, heat resistance and resale value compared. Honest pros and cons from a working stone supplier.',
    keywords: 'granite vs marble, marble vs granite countertops, best stone for kitchen countertop, granite countertops pros cons, marble countertops pros cons',
    type: 'article',
  },
  {
    path: '/blog/importing-indian-granite-to-usa',
    title: "Importing Indian Granite to the USA: A Practical Buyer's Guide | Sunrise Stones Industries",
    description: 'How to import Indian granite to the United States: container loading, FOB vs CIF, US customs and HTS codes, lead times, MOQs and what to demand from a supplier.',
    keywords: 'importing granite from India, Indian granite supplier USA, granite container shipping, FOB granite India, granite HTS code, granite slab import',
    type: 'article',
  },
  {
    path: '/blog/tandur-limestone-properties-applications',
    title: 'Tandur Limestone: Properties, Finishes, and Best Applications | Sunrise Stones Industries',
    description: 'A working guide to Tandur limestone — Blue, Yellow and Grey varieties from Telangana. Density, compressive strength, water absorption, finish options and where each one is the right pick.',
    keywords: 'Tandur limestone, blue limestone India, yellow limestone, grey limestone, Tandur stone properties, limestone pool coping, limestone pavers, Telangana limestone',
    type: 'article',
  },
  {
    path: '/blog/best-indian-granites-for-us-kitchen-countertops',
    title: 'Best Indian Granites for US Kitchen Countertops in 2026 | Sunrise Stones Industries',
    description: 'The Indian granite varieties US buyers actually order for kitchen countertops in 2026 — Tan Brown, Black Pearl, Steel Grey, Kashmir White and more, compared by durability, price tier and design fit.',
    keywords: 'best granite for kitchen countertops, Indian granite colors, granite countertop colors 2026, wholesale granite USA, granite kitchen countertop guide',
    type: 'article',
  },

  // ─── Granite product pages ───
  { path: '/granite/alaska-red', ...granite('Alaska Red Granite', '/granite/tan-red-granite.webp') },
  { path: '/granite/indian-juparana', ...granite('Indian Juparana Granite', '/granite/indian-juparana-granite.webp') },
  { path: '/granite/kashmir-white', ...granite('Kashmir White Granite', '/granite/kashmir-white-granite.webp') },
  { path: '/granite/paradiso-ash', ...granite('Paradiso Ash Granite', '/granite/paradiso-bash-granite.webp') },
  { path: '/granite/sapphire-blue', ...granite('Sapphire Blue Granite', '/granite/sapphire-blue-granite.webp') },
  { path: '/granite/tan-brown', ...granite('Tan Brown Granite', '/granite/tan-brown-granite.webp') },
  { path: '/granite/black-pearl', ...granite('Black Pearl Granite', '/granite/black-pearl-granite.webp') },
  { path: '/granite/steel-grey', ...granite('Steel Grey Granite', '/granite/steel-grey-granite.webp') },
  { path: '/granite/black-forest', ...granite('Black Forest Granite', '/granite/black-forest-granite.webp') },
  { path: '/granite/imperial-blue', ...granite('Imperial Blue Granite', '/granite/imperial-blue-granite.webp') },
  { path: '/granite/coffee-brown', ...granite('Coffee Brown Granite', '/granite/coffee-brown-granite.webp') },
  { path: '/granite/thunder-black', ...granite('Thunder Black Granite', '/granite/thunder-black-granite.webp') },
  { path: '/granite/paradiso-classico', ...granite('Paradiso Classico Granite', '/granite/paradiso-classico-granite.webp') },
  { path: '/granite/copper-silk', ...granite('Copper Silk Granite', '/granite/copper-silk-granite.webp') },
  { path: '/granite/silver-silk', ...granite('Silver Silk Granite', '/granite/silver-silk-granite.webp') },
  { path: '/granite/multicolor-red', ...granite('Multicolor Red Granite', '/granite/multicolor-red-granite.webp') },

  // ─── Limestone product pages ───
  { path: '/limestone/blue', ...limestone('Urban Blue Limestone') },
  { path: '/limestone/yellow', ...limestone('Sunwashed Limestone') },
  { path: '/limestone/grey', ...limestone('Silver Ash Limestone') },
];

function granite(name, imagePath) {
  return {
    title: `${name} — Slabs, Tiles & Custom Sizes | ${SITE_NAME}`,
    description: `Buy ${name} direct from Sunrise Stones Industries. Premium Indian granite with custom slabs, tiles and fabrication. US nationwide supply.`,
    keywords: `${name}, ${name} slabs, ${name} tiles, ${name} countertops, Indian granite, granite supplier USA, wholesale granite`,
    image: `${SITE_URL}${imagePath}`,
    imageAlt: `${name} slab — polished surface`,
    type: 'product',
  };
}

function limestone(name) {
  return {
    title: `${name} — Tiles, Slabs, Pavers & Pool Coping | ${SITE_NAME}`,
    description: `${name} from Sunrise Stones Industries. Tandur limestone direct from the quarry — tiles, palisades, pool coping, cobbles. US nationwide supply.`,
    keywords: `${name}, Tandur limestone, ${name} tiles, ${name} pavers, limestone pool coping, limestone supplier USA, Indian limestone exporter`,
    type: 'product',
  };
}

// ─── Build ───
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function main() {
  const baseHtmlPath = path.join(BUILD_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('generate-static-seo: build/index.html not found — run `react-scripts build` first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');
  let written = 0;
  let skipped = 0;

  for (const route of ROUTES) {
    if (route.path === '/') {
      // Homepage tags already match build/index.html defaults — nothing to do.
      skipped += 1;
      continue;
    }

    const canonicalUrl = `${SITE_URL}${route.path}`;
    const fullTitle = escapeHtml(route.title);
    const description = escapeHtml(route.description || '');
    const keywords = route.keywords ? escapeHtml(route.keywords) : null;
    const image = route.image || DEFAULT_OG_IMAGE;
    const imageAlt = escapeHtml(route.imageAlt || `${SITE_NAME} — natural stone supplier`);
    const ogType = route.type === 'product' ? 'website' : (route.type || 'website');

    let html = baseHtml;

    // <title>
    html = html.replace(/<title>.*?<\/title>/s, `<title>${fullTitle}</title>`);

    // meta description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*>/s,
      `<meta name="description" content="${description}">`
    );

    // meta keywords (only replace if this route defines its own; otherwise leave homepage default)
    if (keywords) {
      html = html.replace(
        /<meta name="keywords" content="[^"]*">/,
        `<meta name="keywords" content="${keywords}">`
      );
    }

    // canonical
    html = html.replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${canonicalUrl}">`
    );

    // Open Graph
    html = html.replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${ogType}">`);
    html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${fullTitle}">`);
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*>/s,
      `<meta property="og:description" content="${description}">`
    );
    html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${image}">`);
    html = html.replace(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${imageAlt}">`);

    // Twitter
    html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${fullTitle}">`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${image}">`);

    const outDir = path.join(BUILD_DIR, route.path);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    written += 1;
  }

  console.log(`generate-static-seo: wrote ${written} static route(s), skipped ${skipped} (homepage already correct).`);
}

main();
