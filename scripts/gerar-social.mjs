// Gera public/social.jpg (1200x630) usada em Open Graph / Twitter Card.
import sharp from 'sharp';

const W = 1200;
const H = 630;

const fundo = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e2a342"/>
      <stop offset="0.5" stop-color="#0059b2"/>
      <stop offset="1" stop-color="#e34040"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#1a1a1a"/>
  <rect width="${W}" height="10" fill="url(#g)"/>
  <rect y="${H - 10}" width="${W}" height="10" fill="url(#g)"/>
  <g font-family="Roboto, 'Segoe UI', Arial, sans-serif" fill="#ffffff">
    <text x="420" y="270" font-size="40" fill="#9a9a9a">Saullo Bueno</text>
    <text x="420" y="350" font-size="76" font-weight="700">DESENVOLVEDOR</text>
    <text x="420" y="430" font-size="76" font-weight="700">FULL STACK</text>
    <text x="420" y="500" font-size="32" fill="#64d2ff">UI/UX Design • Node.js • React • React Native</text>
  </g>
</svg>`);

const logo = await sharp('src/assets/logo-vertical.png')
  .resize({ height: 340 })
  .modulate({ brightness: 5 })
  .toBuffer();

await sharp(fundo)
  .composite([{ input: logo, left: 110, top: 145 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/social.jpg');

console.log('public/social.jpg gerada');
