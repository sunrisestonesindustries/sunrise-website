import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.sunrisestonesindustries.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo1.webp?v=4`;
const SITE_NAME = 'Sunrise Stones Industries';

/**
 * Per-route SEO. Pass overrides; sensible defaults for the rest.
 *
 * Props:
 *   - title              page <title> (will not get site-name appended if you already include it)
 *   - description        meta description (155–160 char sweet spot)
 *   - path               canonical path, e.g. "/granite/tan-brown"
 *   - image              absolute URL for og:image / twitter:image
 *   - imageAlt           accessibility alt for the OG image
 *   - keywords           comma-separated keywords (optional)
 *   - type               OG type (default: "website"; use "article" for blog posts, "product" for products)
 *   - noindex            true to add noindex
 *   - jsonLd             single object or array of JSON-LD blocks to inject
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  imageAlt = 'Sunrise Stones Industries — natural stone supplier',
  keywords,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = title && title.includes(SITE_NAME)
    ? title
    : title
      ? `${title} | ${SITE_NAME}`
      : `Granite, Limestone & Natural Stone Supplier in the USA | ${SITE_NAME}`;

  const ldBlocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={image} />

      {ldBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
