// Gera src/assets/fundo-pontos.avif: retícula de micro pontos (efeito de tela) em tons de cinza,
// misturada ao tom escuro do site (#1a1a1a). A imagem de referencia (scripts/fonte/pontos.png) e
// usada como mapa de brilho: onde ela tem pontos grandes (laterais, topo e base) os pontos daqui
// ficam maiores e mais claros; no centro escuro ficam minusculos. A intensidade cai na faixa
// central, onde ficam os textos.
// Uso: node scripts/gerar-fundo-pontos.mjs
import sharp from 'sharp';

const FONTE = 'scripts/fonte/pontos.png';
const SAIDA = 'src/assets/fundo-pontos.avif';
const BG = { r: 26, g: 26, b: 26 }; // #1a1a1a
const W = 1600;

const PASSO = 4; // distancia entre os centros dos pontos, em px
const RAIO_MIN = 0.35; // raio dos pontos nas areas escuras
const RAIO_MAX = 1.4; // raio dos pontos nas areas claras
const TOM_MIN = 70; // cinza dos pontos menores (0-255)
const TOM_MAX = 125; // cinza dos pontos maiores

const OPACIDADE_LATERAL = 0.8; // intensidade da retícula nas laterais
const OPACIDADE_CENTRO = 0.2; // intensidade na faixa central
const INICIO_FAIXA = [0.2, 0.36]; // x (0..1) onde a lateral desce ate o centro
const FIM_FAIXA = [0.64, 0.8]; // x (0..1) onde o centro sobe ate a lateral

const meta = await sharp(FONTE).metadata();
const H = Math.round((W * meta.height) / meta.width);
const colunas = Math.ceil(W / PASSO);
const linhas = Math.ceil(H / PASSO);

// brilho medio local da referencia: desfoca na escala dos pontos dela e amostra uma vez por ponto
const campo = await sharp(FONTE)
  .greyscale()
  .blur(5)
  .resize(colunas, linhas, { fit: 'fill', kernel: 'cubic' })
  .raw()
  .toBuffer();
let min = 255;
let max = 0;
for (const v of campo) {
  if (v < min) min = v;
  if (v > max) max = v;
}
const nivel = (i) => Math.pow((campo[i] - min) / (max - min || 1), 0.85); // 0..1

const suave = (t) => t * t * (3 - 2 * t);
const passo = (x, [a, b]) => suave(Math.min(1, Math.max(0, (x - a) / (b - a))));
const opacidadeColuna = new Float32Array(W);
for (let x = 0; x < W; x++) {
  const t = x / (W - 1);
  const centro = passo(t, INICIO_FAIXA) * (1 - passo(t, FIM_FAIXA));
  opacidadeColuna[x] = OPACIDADE_LATERAL + (OPACIDADE_CENTRO - OPACIDADE_LATERAL) * centro;
}

// desenha cada pixel conforme o ponto da retícula a que pertence (borda suavizada)
const rgba = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  const gy = Math.floor(y / PASSO);
  const cy = (gy + 0.5) * PASSO;
  for (let x = 0; x < W; x++) {
    const gx = Math.floor(x / PASSO);
    const t = nivel(Math.min(gy, linhas - 1) * colunas + Math.min(gx, colunas - 1));
    const raio = RAIO_MIN + (RAIO_MAX - RAIO_MIN) * Math.sqrt(t);
    const d = Math.hypot(x + 0.5 - (gx + 0.5) * PASSO, y + 0.5 - cy);
    const cobertura = Math.min(1, Math.max(0, raio - d + 0.5));
    const i = (y * W + x) * 4;
    rgba[i] = rgba[i + 1] = rgba[i + 2] = Math.round(TOM_MIN + (TOM_MAX - TOM_MIN) * t);
    rgba[i + 3] = Math.round(cobertura * opacidadeColuna[x] * 255);
  }
}

const pontos = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .png()
  .toBuffer();

const info = await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([{ input: pontos }])
  .avif({ quality: 65, effort: 6 })
  .toFile(SAIDA);

console.log(`${SAIDA} gerada: ${W}x${H}, ${Math.round(info.size / 1024)} KB`);
