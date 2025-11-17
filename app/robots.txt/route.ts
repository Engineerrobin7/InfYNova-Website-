import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `# InfyNova - AI Smartphone Website
# https://www.robotstxt.org/robotstxt.html

# Allow all search engines
User-agent: *
Allow: /

# Crawl delay (be nice to servers)
Crawl-dela/api/
Disallow: /dashboard/
Disallow: /_next/
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
