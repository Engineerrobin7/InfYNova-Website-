import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://infynova.in';
  
  const routes = [
    '',
    '/about',
    '/features',
    '/novaos',
    '/pre-order',
    '/blog',
    '/careers',
    '/contact',
    '/community',
    '/press',
    '/help-center',
    '/developer-api',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
