import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://infynova.in';
  
  const routes = [
    // Main pages
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.9', changefreq: 'weekly' },
    { url: '/features', priority: '0.9', changefreq: 'weekly' },
    { url: '/pre-order', priority: '1.0', changefreq: 'daily' },
    
    // NovaOS pages
    { url: '/novaos', priority: '0.9', changefreq: 'weekly' },
    { url: '/novaos/beta', priority: '0.7', changefreq: 'weekly' },
    { url: '/novaos/docs', priority: '0.7', changefreq: 'weekly' },
    { url: '/novaos/developer-program', priority: '0.7', changefreq: 'weekly' },
    
    // Blog pages
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/blog/posts/introducing-infynova', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog/posts/novaos-explained', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog/posts/why-india-needs-infynova', priority: '0.8', changefreq: 'monthly' },
    
    // Company pages
    { url: '/careers', priority: '0.8', changefreq: 'weekly' },
    { url: '/press', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/community', priority: '0.7', changefreq: 'weekly' },
    { url: '/affiliate', priority: '0.9', changefreq: 'weekly' },
    
    // Support pages
    { url: '/help-center', priority: '0.7', changefreq: 'weekly' },
    { url: '/developer-api', priority: '0.7', changefreq: 'weekly' },
    { url: '/dashboard', priority: '0.6', changefreq: 'weekly' },
    
    // SEO & Tools
    { url: '/seo-tracker', priority: '0.6', changefreq: 'weekly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
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
