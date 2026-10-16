// Converte as imagens do site para AVIF (sharp).
//  - src/assets/legacy/portfolio-web-<slug>.jpg + portfolio-web-<slug>-g.jpg (projetos legados):
//    gera <slug>.avif (miniatura 640px) e <slug>-g.avif (lightbox, ate 1920px), remove os JPGs
//    e grava width/height da miniatura em src/data/portfolio.json.
//  - src/assets/**: converte PNG/JPG/JPEG para AVIF e remove o original.
//  - src/assets/portfolio/**/<nome>.avif (capturas dos projetos em destaque): gera <nome>-mini.avif
//    (480px) para as miniaturas da galeria; a imagem cheia fica para a foto principal e o lightbox.
// Os caminhos finais sao resolvidos pelo Vite (src/data/legacyProjects.ts); nada disso fica em public/.
// Uso: node scripts/otimizar-imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const MANTER = new Set(['logo.png', 'logo-marca.png', 'logo-vertical.png', 'favicon.png']);
const THUMB_W = 640;
const LARGE_W = 1920;
const MINI_W = 480;

const kb = (n) => Math.round(n / 1024);
let antes = 0;
let depois = 0;

async function paraAvif(entrada, saida, { largura, qualidade }) {
  let img = sharp(entrada);
  if (largura) img = img.resize({ width: largura, withoutEnlargement: true });
  const info = await img.avif({ quality: qualidade, effort: 6 }).toFile(saida);
  antes += fs.statSync(entrada).size;
  depois += info.size;
  return info;
}

// 1) Projetos legados
const pasta = 'src/assets/legacy';
const jsonPath = 'src/data/portfolio.json';
const portfolio = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

for (const item of portfolio) {
  const base = `portfolio-web-${item.slug}`;
  const jpgThumb = path.join(pasta, `${base}.jpg`);
  const jpgLarge = path.join(pasta, `${base}-g.jpg`);
  if (!fs.existsSync(jpgLarge)) continue;

  const thumb = await paraAvif(jpgLarge, path.join(pasta, `${base}.avif`), {
    largura: THUMB_W,
    qualidade: 55,
  });
  await paraAvif(jpgLarge, path.join(pasta, `${base}-g.avif`), { largura: LARGE_W, qualidade: 58 });
  if (fs.existsSync(jpgThumb)) antes += fs.statSync(jpgThumb).size;

  item.width = thumb.width;
  item.height = thumb.height;

  fs.rmSync(jpgThumb, { force: true });
  fs.rmSync(jpgLarge, { force: true });
}
fs.writeFileSync(jsonPath, JSON.stringify(portfolio, null, 2) + '\n');

// 2) Assets importados pelo codigo (src)
function arquivos(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? arquivos(p) : [p];
  });
}
for (const p of arquivos('src/assets')) {
  if (!/\.(png|jpe?g)$/i.test(p) || MANTER.has(path.basename(p))) continue;
  const largura = path.basename(p).startsWith('image-home') ? 2000 : undefined;
  await paraAvif(p, p.replace(/\.(png|jpe?g)$/i, '.avif'), { largura, qualidade: 60 });
  fs.rmSync(p);
}

// 3) Miniaturas dos projetos em destaque (so as que ainda nao existem ou estao desatualizadas)
let miniaturas = 0;
for (const p of arquivos('src/assets/portfolio')) {
  if (!p.endsWith('.avif') || p.endsWith('-mini.avif')) continue;
  const mini = p.replace(/\.avif$/, '-mini.avif');
  if (fs.existsSync(mini) && fs.statSync(mini).mtimeMs >= fs.statSync(p).mtimeMs) continue;
  await sharp(p)
    .resize({ width: MINI_W, withoutEnlargement: true })
    .avif({ quality: 55, effort: 6 })
    .toFile(mini);
  miniaturas++;
}

if (antes) {
  console.log(
    `antes: ${kb(antes)} KB  depois: ${kb(depois)} KB  (-${Math.round((1 - depois / antes) * 100)}%)`,
  );
}
console.log(`miniaturas geradas: ${miniaturas}`);
