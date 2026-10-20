// Gera os icones do site a partir de src/assets/logo-marca.png:
//  - favicon.ico (16/32/48) e favicon.png: marca com FUNDO TRANSPARENTE (aba do navegador)
//  - apple-touch-icon.png, icon-192.png e icon-512.png: marca sobre fundo escuro, porque o iOS e o
//    Android pintam fundo transparente de preto ou branco por conta propria
// src/assets/favicon.png e uma versao antiga da marca, guardada de proposito para uma troca futura
// do favicon: nada a importa nem o script a le. Para usa-la, e so apontar MARCA para ela.
// Uso: node scripts/gerar-icones.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const MARCA = 'src/assets/logo-marca.png';
const FUNDO = '#1a1a1a';

// arredondado: favicon/manifest; o iOS aplica o proprio arredondamento, entao la o quadrado e cheio
async function icone(tamanho, { arredondado = true, margem = 0.18, fundo = true } = {}) {
  const lado = Math.round(tamanho * (1 - 2 * margem));
  const marca = await sharp(MARCA)
    .resize(lado, lado, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const raio = arredondado ? Math.round(tamanho * 0.22) : 0;
  const base = fundo
    ? Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}"><rect width="${tamanho}" height="${tamanho}" rx="${raio}" fill="${FUNDO}"/></svg>`,
      )
    : {
        create: {
          width: tamanho,
          height: tamanho,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      };
  return sharp(base)
    .composite([{ input: marca, gravity: 'centre' }])
    .png()
    .toBuffer();
}

// ICO com PNGs embutidos (suportado por todos os navegadores atuais)
function montarIco(imagens) {
  const cabecalho = Buffer.alloc(6);
  cabecalho.writeUInt16LE(1, 2); // tipo: icone
  cabecalho.writeUInt16LE(imagens.length, 4);
  let deslocamento = 6 + imagens.length * 16;
  const entradas = imagens.map(({ tamanho, png }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(tamanho >= 256 ? 0 : tamanho, 0);
    e.writeUInt8(tamanho >= 256 ? 0 : tamanho, 1);
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(deslocamento, 12);
    deslocamento += png.length;
    return e;
  });
  return Buffer.concat([cabecalho, ...entradas, ...imagens.map((i) => i.png)]);
}

const ico = await Promise.all(
  [16, 32, 48].map(async (t) => ({
    tamanho: t,
    png: await icone(t, { margem: 0.04, fundo: false }),
  })),
);
fs.writeFileSync('public/favicon.ico', montarIco(ico));
fs.writeFileSync('public/favicon.png', await icone(64, { margem: 0.04, fundo: false }));
fs.writeFileSync(
  'public/apple-touch-icon.png',
  await icone(180, { arredondado: false, margem: 0.2 }),
);
fs.writeFileSync('public/icon-192.png', await icone(192));
fs.writeFileSync('public/icon-512.png', await icone(512));

fs.writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Saullo Bueno | Desenvolvedor Full Stack & UI/UX Designer',
      short_name: 'Saullo Bueno',
      lang: 'pt-BR',
      start_url: '/',
      display: 'browser',
      theme_color: '#1a1a1a',
      background_color: '#1a1a1a',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log('icones gerados em public/');
