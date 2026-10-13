// Gera src/assets/fundo-foto.avif a partir da foto de referencia (scripts/fonte/escritorio-noite.png):
// a foto e misturada ao tom escuro do site (#1a1a1a) com opacidade reduzida, e ainda mais apagada
// na faixa central, onde ficam os textos.
// Uso: node scripts/gerar-fundo-foto.mjs
import sharp from 'sharp';

// foto ativa; em standby: scripts/fonte/escritorio.png (monitor com codigo laranja)
const FONTE = 'scripts/fonte/escritorio-noite.png';
const SAIDA = 'src/assets/fundo-foto.avif';
const BG = { r: 26, g: 26, b: 26 }; // #1a1a1a
const ESCALA = 2; // a foto tem 736px de largura; 2x basta (o navegador ajusta ao viewport)

const OPACIDADE_LATERAL = 0.25; // intensidade da foto nas laterais
const OPACIDADE_CENTRO = 0.055; // intensidade na faixa central
const INICIO_FAIXA = [0.2, 0.36]; // x (0..1) onde a lateral desce ate o centro
const FIM_FAIXA = [0.64, 0.8]; // x (0..1) onde o centro sobe ate a lateral

const meta = await sharp(FONTE).metadata();
const w = meta.width * ESCALA;
const h = meta.height * ESCALA;

const suave = (t) => t * t * (3 - 2 * t);
const passo = (x, [a, b]) => suave(Math.min(1, Math.max(0, (x - a) / (b - a))));

// opacidade por coluna (nao varia na vertical)
const coluna = Buffer.alloc(w);
for (let x = 0; x < w; x++) {
  const t = x / (w - 1);
  const centro = passo(t, INICIO_FAIXA) * (1 - passo(t, FIM_FAIXA));
  const a = OPACIDADE_LATERAL + (OPACIDADE_CENTRO - OPACIDADE_LATERAL) * centro;
  coluna[x] = Math.round(a * 255);
}
const alfa = Buffer.alloc(w * h);
for (let y = 0; y < h; y++) coluna.copy(alfa, y * w);

// Foto em tons de cinza (1 canal) expandida para RGBA, com a opacidade por coluna no alfa
const cinza = await sharp(FONTE)
  .resize({ width: w, height: h, kernel: 'lanczos3' })
  .greyscale()
  .raw()
  .toBuffer();
const rgba = Buffer.alloc(w * h * 4);
for (let i = 0; i < w * h; i++) {
  rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = cinza[i];
  rgba[i * 4 + 3] = alfa[i];
}
const foto = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toBuffer();

const info = await sharp({ create: { width: w, height: h, channels: 3, background: BG } })
  .composite([{ input: foto }])
  .avif({ quality: 50, effort: 6 })
  .toFile(SAIDA);

console.log(`${SAIDA} gerada: ${w}x${h}, ${Math.round(info.size / 1024)} KB`);
