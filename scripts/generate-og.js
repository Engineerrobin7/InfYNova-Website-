const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const title = "InfYNova - India's First AI-Powered Smartphone";
const subtitle = 'Revolutionary AI smartphone with NovaOS — Pre-order now from ₹29,999.';

function buildSVG({ width = 1200, height = 630 } = {}) {
  const fontSizeTitle = Math.round(width / 16);
  const fontSizeSubtitle = Math.round(width / 32);
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#001219"/>
        <stop offset="100%" stop-color="#005f73"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
    <g font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" fill="#fff">
      <text x="60" y="${Math.round(height * 0.35)}" font-size="${fontSizeTitle}" font-weight="700">${escapeXml(
        title
      )}</text>
      <text x="60" y="${Math.round(height * 0.6)}" font-size="${fontSizeSubtitle}" font-weight="400">${escapeXml(
        subtitle
      )}</text>
    </g>
  </svg>
  `;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generate() {
  const variants = [
    { name: 'og-image', w: 1200, h: 630 },
    { name: 'og-image-small', w: 600, h: 315 },
  ];

  for (const v of variants) {
    const svg = buildSVG({ width: v.w, height: v.h });
    const svgBuffer = Buffer.from(svg);
    const outPng = path.join(outDir, `${v.name}.png`);
    const outWebp = path.join(outDir, `${v.name}.webp`);
    const outAvif = path.join(outDir, `${v.name}.avif`);

    await sharp(svgBuffer)
      .resize(v.w, v.h)
      .png({ quality: 90 })
      .toFile(outPng);

    await sharp(svgBuffer)
      .resize(v.w, v.h)
      .jpeg({ quality: 90 })
      .toFile(path.join(outDir, `${v.name}.jpg`));

    await sharp(svgBuffer)
      .resize(v.w, v.h)
      .webp({ quality: 85 })
      .toFile(outWebp);

    await sharp(svgBuffer)
      .resize(v.w, v.h)
      .avif({ quality: 50 })
      .toFile(outAvif);

    console.log('Generated', outPng, outWebp, outAvif, path.join(outDir, `${v.name}.jpg`));
  }

  const logoSvgPath = path.join(outDir, 'logo.svg');
  if (fs.existsSync(logoSvgPath)) {
    await sharp(logoSvgPath)
      .png({ quality: 90 })
      .toFile(path.join(outDir, 'logo.png'));
    console.log('Generated', path.join(outDir, 'logo.png'));
  }
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
