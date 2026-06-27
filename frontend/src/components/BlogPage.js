import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Seo, { SITE_URL } from './Seo';

// ---- Article content ----
// Three SEO-targeted starter articles for US buyers searching granite, marble,
// and limestone topics. Keep tone informative, vendor-neutral until the closing
// CTA so the articles read as real buyer education rather than ad copy.

const ARTICLES = {
  'granite-vs-marble-kitchen-countertops': {
    title: 'Granite vs Marble for Kitchen Countertops: A 2026 Buyer\'s Guide',
    description: 'Granite vs marble for kitchen countertops — durability, maintenance, price, heat resistance and resale value compared. Honest pros and cons from a working stone supplier.',
    keywords: 'granite vs marble, marble vs granite countertops, best stone for kitchen countertop, granite countertops pros cons, marble countertops pros cons',
    excerpt: 'The honest answer is "it depends" — but it depends on a small number of specific things. Here is how to actually choose.',
    publishedAt: '2026-06-01',
    readMinutes: 9,
    body: [
      { type: 'h2', text: 'The short answer' },
      { type: 'p', text: 'Granite is harder, more heat-resistant, and almost never etches from kitchen acids — but it shows seams and has more pattern variation. Marble looks softer and more luxurious, but it scratches, etches from lemon juice and vinegar, and stains if not sealed regularly. For a working kitchen where the cook does not want to think about the counter, granite wins. For a baking-and-presentation kitchen where the owner is willing to maintain the surface, marble is the better aesthetic.' },
      { type: 'h2', text: 'Hardness and scratch resistance' },
      { type: 'p', text: 'Granite is a 6–7 on the Mohs hardness scale. Marble is a 3–4. A steel knife is roughly a 6. That means a dropped knife will not scratch most granites but will leave a visible line on marble. Even fingernails (about 2.5) can leave a faint mark on a soft marble like Carrara if dragged hard.' },
      { type: 'h2', text: 'Heat resistance' },
      { type: 'p', text: 'Both stones can take a hot pan straight off the burner without cracking. The risk is thermal shock at the seam, not the slab itself. We still recommend a trivet on either surface — not because it will damage the stone, but because long-term heat exposure can dull the polish on marble and slowly affect epoxy seams on either.' },
      { type: 'h2', text: 'Stain and etch behavior' },
      { type: 'p', text: 'This is where the materials really separate. Marble is a calcium carbonate — anything acidic (lemon, vinegar, tomato, wine, even some cleaning sprays) chemically reacts with the surface and dulls it in seconds. The mark is permanent without re-polishing. Granite is an igneous stone made mostly of quartz and feldspar; acids do nothing to it. Both can absorb oil stains if unsealed, but a sealed granite is essentially worry-free for daily kitchen use.' },
      { type: 'h2', text: 'Cost in the US market (2026)' },
      { type: 'p', text: 'For installed countertops in the US, mid-range granite typically runs $40–$80 per square foot installed. Mid-range marble (Carrara, Calacatta lite) runs $60–$120 per square foot installed. Exotic varieties of either stone go well above $200/sqft. If you are buying slabs wholesale or by the container, the gap narrows considerably.' },
      { type: 'h2', text: 'Resale value' },
      { type: 'p', text: 'In the US residential market, granite is still the more widely accepted "premium" finish for kitchens — buyers recognize it as durable and low-maintenance. Marble carries a higher luxury association in primary bathrooms and bar tops, where the lifestyle promise matters more than daily punishment. For a kitchen flip, granite typically delivers better dollar-for-dollar return.' },
      { type: 'h2', text: 'Which Indian granites work best for kitchens?' },
      { type: 'p', text: 'For US kitchens, the most consistently shipped Indian granites are Black Pearl, Tan Brown, Steel Grey, Imperial Blue, and Kashmir White. All are widely fabricated by US shops, hold standard 2 cm and 3 cm thicknesses, and have stable patterning across slabs — important when you need bookmatched islands or continuous backsplashes.' },
      { type: 'h2', text: 'Bottom line' },
      { type: 'p', text: 'If this is a working kitchen used by a family, choose granite. If it is a show kitchen or a bar in a primary suite, marble is defensible — just commit to the maintenance. Either way, source from a supplier that can show you actual slab photos (not catalog renders) before you commit, because natural stone varies block to block.' },
    ],
  },
  'importing-indian-granite-to-usa': {
    title: 'Importing Indian Granite to the USA: A Practical Buyer\'s Guide',
    description: 'How to import Indian granite to the United States: container loading, FOB vs CIF, US customs and HTS codes, lead times, MOQs and what to demand from a supplier.',
    keywords: 'importing granite from India, Indian granite supplier USA, granite container shipping, FOB granite India, granite HTS code, granite slab import',
    excerpt: 'A practical walkthrough of what really happens between a quarry block in Andhra Pradesh and a slab on a Brooklyn fabricator\'s rack.',
    publishedAt: '2026-06-08',
    readMinutes: 11,
    body: [
      { type: 'h2', text: 'Why import direct rather than buy domestically' },
      { type: 'p', text: 'A US fabricator buying a slab off a distributor in New Jersey is typically paying 2.5–4x the FOB India price. The markup covers shipping, duties, the importer\'s margin, the distributor\'s margin, and inventory cost. For volume buyers — fabricators, builders running multi-unit projects, or distributors themselves — going one or two steps closer to the quarry is where the unit economics shift.' },
      { type: 'h2', text: 'Container math' },
      { type: 'p', text: 'A 20\' container fits roughly 18–22 tons of slabs (about 280–320 sqm of 2 cm material in A-bundles), depending on packaging. A 40\' high-cube fits roughly 24–26 tons and 540–620 sqm. MOQ from most Indian exporters is one 20\' container. Below that you are looking at LCL (less than container load) which kills the cost advantage.' },
      { type: 'h2', text: 'FOB vs CIF vs DDP' },
      { type: 'p', text: 'FOB ("free on board") means the supplier delivers to the Indian port — Krishnapatnam, Chennai, or Mundra — and you handle ocean freight, US customs, and inland trucking. CIF ("cost, insurance, freight") means the supplier delivers to the US destination port and you handle customs onward. DDP ("delivered duty paid") means the supplier handles everything to your warehouse door. First-time importers should start with DDP from a US-presence supplier; experienced importers move to FOB once they have a customs broker relationship.' },
      { type: 'h2', text: 'US tariffs and HTS codes' },
      { type: 'p', text: 'Granite slabs typically classify under HTS 6802.93 (worked monumental or building stone — granite). At time of writing the standard duty rate is in the 3–5% range for most countries including India. Always confirm the current rate with your customs broker before quoting downstream — tariff structures change.' },
      { type: 'h2', text: 'Lead times you should expect' },
      { type: 'p', text: 'From PO to slab in your warehouse, plan on 8–12 weeks: 2–3 weeks block sourcing and gang-sawing, 1–2 weeks finishing and packing, 4–6 weeks ocean transit to US East Coast (longer for West Coast via Pacific routing), 1–2 weeks customs clearance and inland delivery. Premium colors that are not in standing inventory can push the front half to 5–6 weeks.' },
      { type: 'h2', text: 'What to demand from your supplier' },
      { type: 'p', text: 'At minimum: real photos of the actual blocks/bundles being shipped (not catalog images), a packing list with bundle dimensions and net weight, container loading photos before the doors close, all certificates needed for US entry (Phytosanitary if wood crating is used, COO for tariff classification), and a fumigation certificate (IPPC stamp on the wood). Suppliers that resist these are not suppliers you want.' },
      { type: 'h2', text: 'Quality risks to underwrite' },
      { type: 'p', text: 'The three things that go wrong: color inconsistency between bundles (avoid by demanding all bundles from the same block whenever possible), hairline cracks that survive QC at origin but show up after stress on the trip (avoid by requiring resin treatment), and damaged corners from poor packing (avoid by inspecting loading photos and using A-frame bundles instead of loose slabs).' },
      { type: 'h2', text: 'Working with a US-presence supplier' },
      { type: 'p', text: 'Sunrise Stones Industries focuses on the US market with the supply chain in India. The reason this matters: a US point of contact for documentation, customs questions, and project planning, alongside direct-from-quarry pricing rather than buying through a chain of distributors.' },
    ],
  },
  'tandur-limestone-properties-applications': {
    title: 'Tandur Limestone: Properties, Finishes, and Best Applications',
    description: 'A working guide to Tandur limestone — Blue, Yellow and Grey varieties from Telangana. Density, compressive strength, water absorption, finish options and where each one is the right pick.',
    keywords: 'Tandur limestone, blue limestone India, yellow limestone, grey limestone, Tandur stone properties, limestone pool coping, limestone pavers, Telangana limestone',
    excerpt: 'Tandur limestone has been quietly building US patios, pool decks, and architectural facades for over a decade. Here is what to know before you spec it.',
    publishedAt: '2026-06-15',
    readMinutes: 8,
    body: [
      { type: 'h2', text: 'What "Tandur" actually refers to' },
      { type: 'p', text: 'Tandur is a town in the Vikarabad district of Telangana, India, that has been quarrying a specific family of limestones since the 1970s. The stone is a dense, fine-grained calcareous sedimentary rock — technically closer to a "limestone-shale" than a coral or skeletal limestone — which gives it unusually high compressive strength for the category.' },
      { type: 'h2', text: 'The three colors and their personalities' },
      { type: 'p', text: 'Blue Limestone (commercially sold as Urban Blue, Tandur Blue, or Lime Black) is the densest of the three. The blue-grey field is even, with subtle veining. It darkens dramatically when wet, which is part of why it is so popular for pool surrounds. Yellow Limestone (Sunwashed, Tandur Yellow) is a warm golden ochre with consistent coloring — the most "Mediterranean" of the family. Grey Limestone (Silver Ash) is a neutral mid-grey with a more uniform appearance, well-suited to contemporary design.' },
      { type: 'h2', text: 'Technical properties' },
      { type: 'p', text: 'Across the three colors: density is roughly 2.6–2.7 g/cm³, compressive strength is 160–170 MPa, and water absorption is 0.5–0.6%. For comparison, typical European limestone runs 1.8–2.4 g/cm³ density and 50–100 MPa compressive strength — Tandur is substantially harder. Water absorption under 1% means it performs well in freeze-thaw climates including the US Northeast and Midwest when properly installed.' },
      { type: 'h2', text: 'Finish options and what they do' },
      { type: 'p', text: 'Natural (split or sawn) is the rawest look. Brushed softens the surface and pulls out the natural color. Tumbled creates a worn-edge antique feel for old-world patios. Sandblasted gives a uniform matte texture with good slip resistance. Honed + sandblasted is the standard for pool decks. Bush-hammered is the most textural — used where slip resistance is the priority and the rough look is wanted.' },
      { type: 'h2', text: 'Best applications' },
      { type: 'p', text: 'Pool coping (bullnose or eased edge) is where Tandur is unmatched in the price band — the density resists chlorine, the low absorption resists staining, and the cool surface temperature in sun is a real advantage over darker stones. Patios and crazy paving for residential landscape work. Wall cladding for commercial and architectural facades. Stair treads and step blocks where the compressive strength matters. Mosaic tiles for accent installations.' },
      { type: 'h2', text: 'Where Tandur is not the right call' },
      { type: 'p', text: 'Heavy-traffic commercial flooring where granite or porcelain make more sense. Kitchen countertops — limestone in general is too soft and too acid-sensitive for daily kitchen abuse, regardless of variety. High-end bathroom vanities where a true marble look is wanted; Tandur reads as casual / outdoor.' },
      { type: 'h2', text: 'Sizing standards we ship' },
      { type: 'p', text: 'Tiles 12"×12" up to 24"×47" in various thicknesses, wall cladding strips 24"×6"×0.6"–1", pool coping pieces 24"–39"×12"–24"×1.2", step blocks 39"–47"×14"–16"×5.5"–6.3", and standard cobbles, palisades, stepping stones, and crazy paving formats. Custom sizes are available with reasonable lead time.' },
    ],
  },
};

const ARTICLE_ORDER = [
  'granite-vs-marble-kitchen-countertops',
  'importing-indian-granite-to-usa',
  'tandur-limestone-properties-applications',
];

function BlogIndex({ onOpenModal, onOpenContact, cartCount }) {
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog`,
    name: 'Sunrise Stones Industries — Stone Buyer\'s Blog',
    url: `${SITE_URL}/blog`,
    blogPost: ARTICLE_ORDER.map((slug) => ({
      '@type': 'BlogPosting',
      headline: ARTICLES[slug].title,
      url: `${SITE_URL}/blog/${slug}`,
      datePublished: ARTICLES[slug].publishedAt,
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        path="/blog"
        title="Stone Buyer's Blog — Granite, Marble & Limestone Guides"
        description="Practical guides for buying natural stone: granite vs marble, importing Indian granite to the USA, Tandur limestone properties, and more from Sunrise Stones Industries."
        keywords="granite buyer's guide, marble buyer's guide, limestone guide, natural stone blog, Indian granite import"
        jsonLd={blogJsonLd}
      />
      <Navbar onOpenModal={onOpenModal} onOpenContact={onOpenContact} cartCount={cartCount} />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20 md:px-12">
        <p className="mb-4 text-xs font-gabarito uppercase tracking-[0.28em] text-gray-500">Resources</p>
        <h1 className="mb-4 text-4xl font-gabarito font-bold text-black md:text-5xl">
          Stone Buyer's Blog
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-gray-700">
          Practical, no-nonsense guides for architects, fabricators, distributors and homeowners buying natural stone in the US market.
        </p>

        <div className="space-y-6">
          {ARTICLE_ORDER.map((slug) => {
            const article = ARTICLES[slug];
            return (
              <Link
                key={slug}
                to={`/blog/${slug}`}
                className="block rounded-[20px] border border-black/10 bg-[#f7f3ea] p-8 transition-all duration-200 hover:border-black/30 hover:shadow-md"
              >
                <p className="mb-3 text-xs font-gabarito uppercase tracking-[0.24em] text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  {' · '}{article.readMinutes} min read
                </p>
                <h2 className="mb-3 text-2xl font-gabarito font-bold text-black md:text-3xl">
                  {article.title}
                </h2>
                <p className="text-base text-gray-700">{article.excerpt}</p>
                <p className="mt-4 text-sm font-gabarito uppercase tracking-[0.24em] text-black">
                  Read article →
                </p>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer onOpenModal={onOpenModal} onOpenContact={onOpenContact} />
    </div>
  );
}

function BlogArticle({ onOpenModal, onOpenContact, cartCount }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Seo path={`/blog/${slug || ''}`} title="Article Not Found" noindex />
        <Navbar onOpenModal={onOpenModal} onOpenContact={onOpenContact} cartCount={cartCount} />
        <div className="px-6 pt-40 text-center">
          <h1 className="text-3xl font-gabarito font-bold text-black">Article not found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 rounded-sm bg-black px-6 py-3 font-gabarito font-semibold text-white hover:bg-gray-800"
          >
            Back to Blog
          </button>
        </div>
        <Footer onOpenModal={onOpenModal} onOpenContact={onOpenContact} />
      </div>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@type': 'Organization', name: 'Sunrise Stones Industries' },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/logo1.webp?v=4`,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL + '/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        path={`/blog/${slug}`}
        title={article.title}
        description={article.description}
        keywords={article.keywords}
        type="article"
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />
      <Navbar onOpenModal={onOpenModal} onOpenContact={onOpenContact} cartCount={cartCount} />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:px-12">
        <button
          onClick={() => navigate('/blog')}
          className="mb-8 text-sm font-gabarito uppercase tracking-[0.24em] text-gray-500 hover:text-black"
        >
          ← Back to Blog
        </button>
        <p className="mb-3 text-xs font-gabarito uppercase tracking-[0.28em] text-gray-500">
          {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {' · '}{article.readMinutes} min read
        </p>
        <h1 className="mb-6 text-4xl font-gabarito font-bold text-black md:text-5xl">
          {article.title}
        </h1>
        <p className="mb-10 text-lg text-gray-600 italic">{article.excerpt}</p>

        <article className="prose prose-stone max-w-none">
          {article.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="mt-10 mb-4 text-2xl font-gabarito font-bold text-black">
                  {block.text}
                </h2>
              );
            }
            return (
              <p key={i} className="mb-5 text-base leading-relaxed text-gray-800">
                {block.text}
              </p>
            );
          })}
        </article>

        <div className="mt-16 rounded-[20px] border border-black/10 bg-[#f7f3ea] p-8">
          <p className="mb-3 text-xs font-gabarito uppercase tracking-[0.28em] text-gray-500">
            Need a quote?
          </p>
          <h3 className="mb-4 text-2xl font-gabarito font-bold text-black">
            Talk to Sunrise Stones Industries
          </h3>
          <p className="mb-6 text-gray-700">
            US-based supplier with the supply chain in India. Custom sizes, container-load export, and direct-from-quarry pricing.
          </p>
          <button
            onClick={onOpenModal}
            className="rounded-sm bg-black px-6 py-3 font-gabarito font-semibold text-white hover:bg-gray-800"
          >
            Request a Quote
          </button>
        </div>
      </main>
      <Footer onOpenModal={onOpenModal} onOpenContact={onOpenContact} />
    </div>
  );
}

export { BlogIndex, BlogArticle };
