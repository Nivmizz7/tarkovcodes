import type { APIRoute } from 'astro';
import { updated } from '../codes';

// lastmod tracks the code list, not the deploy date.
export const GET: APIRoute = ({ site }) => {
  const base = site?.origin ?? 'https://tarkovcodes.pages.dev';
  const en = `${base}/`;
  const fr = `${base}/fr/`;
  const alternates = `    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${fr}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${en}</loc>
${alternates}
    <lastmod>${updated}</lastmod>
  </url>
  <url>
    <loc>${fr}</loc>
${alternates}
    <lastmod>${updated}</lastmod>
  </url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
