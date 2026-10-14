// Gera src/assets/fundo-papel.avif: textura de papel de jornal em tons de cinza, sem conteudo,
// sobre o tom escuro do site (#1a1a1a): manchas suaves de tom, veios na direcao da fabricacao do
// papel, fibras curtas, pontinhos e dobras (o grao fino fica em CSS, no componente fundoCodigo). Tudo bem discreto para nao competir com os textos.
// Uso: node scripts/gerar-fundo-papel.mjs
import sharp from 'sharp';

const W = 1600;
const H = 7200;
const BASE = 26; // #1a1a1a

// intensidade de cada camada (variacao maxima de tom, em niveis de 0 a 255)
const PESOS = { manchasGrandes: 6, manchas: 4, nuvens: 2.5, veios: 1.2 };
const FIBRAS = 5500; // quantidade de fibras curtas
const OPACIDADE_FIBRAS = 0.1;

// mulberry32: gerador deterministico sem a correlacao entre valores vizinhos do LCG simples
// (que aparecia como listras no grao)
const rnd = (() => {
  let a = 20260620;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
})();
const entre = (a, b) => a + rnd() * (b - a);

// ruido aleatorio de baixa resolucao ampliado suavemente ate o tamanho final
async function ruido(w, h) {
  const b = Buffer.alloc(w * h);
  for (let i = 0; i < b.length; i++) b[i] = Math.floor(rnd() * 256);
  return sharp(b, { raw: { width: w, height: h, channels: 1 } })
    .resize(W, H, { kernel: 'cubic', fit: 'fill' })
    .raw()
    .toBuffer();
}

const manchasGrandes = await ruido(14, 64);
const manchas = await ruido(60, 260);
const nuvens = await ruido(300, 1300);
const veios = await ruido(260, 2800); // fibras curtas, esticadas na horizontal

const N = W * H;
const out = Buffer.alloc(N * 3);
for (let i = 0; i < N; i++) {
  const v =
    BASE +
    (manchasGrandes[i] / 127.5 - 1) * PESOS.manchasGrandes +
    (manchas[i] / 127.5 - 1) * PESOS.manchas +
    (nuvens[i] / 127.5 - 1) * PESOS.nuvens +
    (veios[i] / 127.5 - 1) * PESOS.veios;
  const g = Math.max(0, Math.min(255, Math.round(v)));
  out[i * 3] = out[i * 3 + 1] = out[i * 3 + 2] = g;
}

// fibras curtas e dobras (SVG sobreposto)
let tracos = '';
for (let i = 0; i < FIBRAS; i++) {
  const x = entre(0, W);
  const y = entre(0, H);
  const len = entre(5, 34);
  const ang = entre(-0.5, 0.5) + (rnd() < 0.3 ? Math.PI / 2 : 0); // maioria na horizontal
  const dx = Math.cos(ang) * len;
  const dy = Math.sin(ang) * len;
  const cx = (x + dx / 2 + entre(-3, 3)).toFixed(1);
  const cy = (y + dy / 2 + entre(-3, 3)).toFixed(1);
  const cor = rnd() < 0.62 ? '#fff' : '#000';
  tracos += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}Q${cx} ${cy} ${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}" stroke="${cor}" stroke-width="${entre(0.4, 0.9).toFixed(2)}" opacity="${entre(0.3, 1).toFixed(2)}" fill="none"/>`;
}
// pontinhos esparsos (poeira e inclusoes do papel): escuros e claros, de varios tamanhos
let pontos = '';
for (let i = 0; i < 520; i++) {
  const claro = rnd() < 0.45;
  const r = rnd() < 0.9 ? entre(0.5, 1.4) : entre(1.6, 3.2);
  pontos += `<ellipse cx="${entre(0, W).toFixed(1)}" cy="${entre(0, H).toFixed(1)}" rx="${r.toFixed(2)}" ry="${(r * entre(0.6, 1.5)).toFixed(2)}" transform="rotate(${entre(0, 180).toFixed(0)} 0 0)" fill="${claro ? '#fff' : '#000'}" opacity="${(claro ? entre(0.1, 0.3) : entre(0.25, 0.6)).toFixed(2)}"/>`;
}
// manchas largas e suaves de tom
let manchasSuaves = '';
for (let i = 0; i < 45; i++) {
  manchasSuaves += `<ellipse cx="${entre(0, W).toFixed(0)}" cy="${entre(0, H).toFixed(0)}" rx="${entre(90, 380).toFixed(0)}" ry="${entre(90, 380).toFixed(0)}" fill="url(#${rnd() < 0.5 ? 'mClara' : 'mEscura'})" opacity="${entre(0.35, 1).toFixed(2)}"/>`;
}
// faixas verticais de tom quase imperceptiveis (como no papel de referencia)
let faixas = '';
for (let i = 0; i < 7; i++) {
  const x = entre(0, W - 200);
  faixas += `<rect x="${x.toFixed(0)}" y="0" width="${entre(160, 520).toFixed(0)}" height="${H}" fill="${rnd() < 0.5 ? '#fff' : '#000'}" opacity="${entre(0.012, 0.03).toFixed(3)}"/>`;
}
let dobras = '';
for (let d = 1; d < H / 2400; d++) {
  dobras += `<rect y="${d * 2400 - 1}" width="${W}" height="2" fill="#000" opacity="0.2"/><rect y="${d * 2400 + 1}" width="${W}" height="3" fill="#fff" opacity="0.035"/>`;
}
dobras += `<rect x="${W / 2 - 1}" width="2" height="${H}" fill="#000" opacity="0.12"/><rect x="${W / 2 + 1}" width="3" height="${H}" fill="#fff" opacity="0.025"/>`;

const sobreposicao = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><radialGradient id="mClara"><stop offset="0" stop-color="#fff" stop-opacity="0.05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="mEscura"><stop offset="0" stop-color="#000" stop-opacity="0.12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>${faixas}${manchasSuaves}<g opacity="${OPACIDADE_FIBRAS}">${tracos}</g>${pontos}${dobras}</svg>`;

const info = await sharp(out, { raw: { width: W, height: H, channels: 3 } })
  .composite([{ input: Buffer.from(sobreposicao), density: 72 }])
  .avif({ quality: 60, effort: 6 })
  .toFile('src/assets/fundo-papel.avif');
console.log(`src/assets/fundo-papel.avif gerada: ${W}x${H}, ${Math.round(info.size / 1024)} KB`);
