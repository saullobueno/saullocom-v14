// Gera src/assets/fundo-doodles.avif: imagem longa com "figurinhas" de desenvolvimento desenhadas
// em traco branco (laptop, caneca, livros, chaves, aviao de papel, planta...) com acentos coloridos.
// As figurinhas ficam nas laterais (mais visiveis); o centro, onde ficam os textos, tem poucas
// figurinhas bem apagadas. Mesmo tom escuro do site (#1a1a1a).
// Uso: node scripts/gerar-fundo-doodles.mjs [--svg]
import fs from 'node:fs';
import sharp from 'sharp';

const W = 1600;
const H = 7200;
const BG = '#1a1a1a';
const MANUSCRITA = "'Ink Free', 'Segoe Print', 'Bradley Hand ITC', 'Comic Sans MS', cursive";
const MONO = "Consolas, 'DejaVu Sans Mono', Menlo, monospace";

const OPACIDADE_LATERAL = 0.5; // figurinhas das laterais
const OPACIDADE_CENTRO = 0.1; // figurinhas do centro (bem apagadas, mas presentes)
const LARGURA_LATERAL = 300; // faixa de cada lado, em px da imagem

// cores dos acentos (as mesmas familias do site, mais claras para o traco fino)
const VERDE = '#4ade80';
const AZUL = '#4db8ff';
const AMARELO = '#ffd23f';
const ROSA = '#ff7ac8';
const CORAL = '#ff6b6b';
const ROXO = '#b39dff';

let semente = 20260616;
const rnd = () => {
  semente = (semente * 1664525 + 1013904223) % 4294967296;
  return semente / 4294967296;
};

const p = (d, cor) => `<path d="${d}"${cor ? ` stroke="${cor}"` : ''}/>`;
const txt = (x, y, t, { cor = '#fff', tam = 16, fonte = MANUSCRITA, ancora = 'middle' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${tam}" font-family="${fonte}" text-anchor="${ancora}" fill="${cor}" stroke="none">${t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>`;

function engrenagem() {
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? 62 : 48;
    for (const d of [-0.12, 0.12]) {
      const a = ((i + d) / 16) * Math.PI * 2;
      pts.push(`${(100 + Math.cos(a) * r).toFixed(1)},${(100 + Math.sin(a) * r).toFixed(1)}`);
    }
  }
  return `<polygon points="${pts.join(' ')}"/><circle cx="100" cy="100" r="20"/>`;
}

function chip() {
  let s =
    '<rect x="60" y="60" width="80" height="80" rx="6"/><rect x="80" y="80" width="40" height="40" rx="3" stroke="#4db8ff"/>';
  for (let i = 0; i < 4; i++) {
    const v = 72 + i * 19;
    s += p(`M${v} 60V42M${v} 140V158M60 ${v}H42M140 ${v}H158`);
  }
  return s;
}

function teclado() {
  let s = '<rect x="12" y="60" width="176" height="86" rx="10"/>';
  const linhas = [8, 8, 7];
  linhas.forEach((n, r) => {
    for (let i = 0; i < n; i++) {
      const w = 15;
      const x = 22 + i * (w + 3) + (r === 2 ? 10 : 0);
      s += `<rect x="${x}" y="${70 + r * 19}" width="${w}" height="13" rx="3"${r === 0 && i === 7 ? ` stroke="${VERDE}"` : ''}/>`;
    }
  });
  s += `<rect x="52" y="127" width="96" height="11" rx="3" stroke="${AMARELO}"/>`;
  return s;
}

function lista() {
  let s = '<rect x="40" y="22" width="120" height="156" rx="8"/>';
  const cores = [VERDE, VERDE, '#fff', '#fff'];
  cores.forEach((c, i) => {
    const y = 50 + i * 34;
    s += `<rect x="55" y="${y - 10}" width="18" height="18" rx="4"/>`;
    s += p(`M84 ${y}H142`, c === VERDE ? AZUL : '#fff');
    if (c === VERDE) s += p(`M58 ${y - 1}L64 ${y + 5}L73 ${y - 8}`, VERDE);
  });
  return s;
}

// Cada figurinha desenhada numa caixa de 200x200
const FIGURAS = {
  laptop: () =>
    '<rect x="38" y="30" width="124" height="90" rx="7"/>' +
    p('M50 48H88', VERDE) +
    p('M50 60H112', AZUL) +
    p('M58 72H100', AMARELO) +
    p('M50 84H82', ROSA) +
    p('M58 96H122', VERDE) +
    p('M20 128H180L170 152Q168 156 162 156H38Q32 156 30 152Z') +
    p('M82 142H118'),
  aviao: () =>
    p('M20 96L180 28L126 172L98 114Z') +
    p('M98 114L180 28') +
    p('M98 114L94 150L118 128') +
    p('M18 150Q30 108 66 128', AZUL).replace('/>', ' stroke-dasharray="2 9"/>'),
  terminal: () =>
    '<rect x="22" y="36" width="156" height="98" rx="18"/>' +
    p('M56 134L46 168L90 134') +
    p('M52 68L78 86L52 104', VERDE) +
    p('M92 106H124', VERDE),
  chaves: () =>
    p('M84 28Q58 28 58 54V80Q58 98 38 100Q58 102 58 120V146Q58 172 84 172', VERDE) +
    p('M116 28Q142 28 142 54V80Q142 98 162 100Q142 102 142 120V146Q142 172 116 172', VERDE),
  tag: () => p('M68 56L28 100L68 144') + p('M132 56L172 100L132 144') + p('M114 44L86 156', AZUL),
  caneca: () =>
    p('M46 70H142V140Q142 168 114 168H74Q46 168 46 140Z') +
    p('M142 86Q176 86 176 114Q176 140 142 134') +
    p('M74 54Q62 40 76 28Q90 16 78 4') +
    p('M108 54Q96 40 110 28Q124 16 112 4') +
    txt(94, 100, 'keep', { tam: 17 }) +
    txt(94, 120, 'learning', { tam: 17 }) +
    `<rect x="64" y="136" width="60" height="10" rx="5"/>` +
    p('M68 141H98', VERDE).replace('<path', '<path stroke-width="6"'),
  planta: () =>
    p('M60 122H140L132 176Q131 182 125 182H75Q69 182 68 176Z') +
    p('M100 122V96', VERDE) +
    p('M100 108Q56 104 52 60Q96 58 100 108Z', VERDE) +
    p('M100 98Q142 92 152 50Q106 48 100 98Z', VERDE) +
    p('M100 70Q84 48 100 22Q116 48 100 70Z', VERDE),
  fones: () =>
    p('M44 112V98Q44 34 100 34Q156 34 156 98V112') +
    '<rect x="30" y="106" width="28" height="50" rx="13"/>' +
    '<rect x="142" y="106" width="28" height="50" rx="13"/>',
  livros: () =>
    '<rect x="22" y="36" width="156" height="38" rx="4"/>' +
    '<rect x="30" y="80" width="156" height="38" rx="4"/>' +
    '<rect x="20" y="124" width="156" height="38" rx="4"/>' +
    txt(100, 60, 'DATA STRUCTURES', { cor: AZUL, tam: 12 }) +
    txt(108, 104, 'ALGORITHMS', { cor: VERDE, tam: 12 }) +
    txt(98, 148, 'SYSTEM DESIGN', { cor: AMARELO, tam: 12 }),
  engrenagem,
  nota: () =>
    '<rect x="38" y="30" width="124" height="140" rx="6"/>' +
    `<rect x="84" y="18" width="32" height="24" rx="5" fill="${BG}"/>` +
    txt(100, 84, 'COFFEE', { tam: 22 }) +
    txt(100, 112, 'FOCUS', { tam: 22 }) +
    p('M66 124H134', AMARELO) +
    txt(100, 150, '{ } </>', { tam: 16, fonte: MONO, cor: VERDE }),
  janela: () =>
    '<rect x="22" y="38" width="156" height="124" rx="9"/>' +
    p('M22 66H178') +
    `<circle cx="38" cy="52" r="3.5" stroke="${CORAL}"/><circle cx="52" cy="52" r="3.5" stroke="${AMARELO}"/><circle cx="66" cy="52" r="3.5" stroke="${VERDE}"/>` +
    p('M38 88H78', VERDE) +
    p('M46 104H116', AZUL) +
    p('M46 120H92', AMARELO) +
    p('M38 136H70', ROSA),
  branch: () =>
    '<circle cx="60" cy="38" r="9"/><circle cx="60" cy="162" r="9"/><circle cx="142" cy="80" r="9" stroke="#4ade80"/>' +
    p('M60 47V153') +
    p('M60 122Q60 80 133 80', VERDE),
  banco: () =>
    '<ellipse cx="100" cy="50" rx="56" ry="18"/>' +
    p('M44 50V150') +
    p('M156 50V150') +
    p('M44 150Q44 168 100 168Q156 168 156 150') +
    p('M44 83Q44 101 100 101Q156 101 156 83', AZUL) +
    p('M44 116Q44 134 100 134Q156 134 156 116', AZUL),
  nuvem: () =>
    p(
      'M54 142Q22 142 28 112Q32 90 56 94Q60 54 102 54Q142 54 146 90Q178 90 172 120Q168 142 144 142Z',
    ) +
    p('M100 168V108', AZUL) +
    p('M78 128L100 106L122 128', AZUL),
  bug: () =>
    '<ellipse cx="100" cy="116" rx="36" ry="46"/><circle cx="100" cy="58" r="16"/>' +
    p('M92 44L80 24M108 44L120 24') +
    p('M65 96L34 82M65 118L30 120M68 140L38 160M135 96L166 82M135 118L170 120M132 140L162 160') +
    p('M100 74V160', CORAL).replace('/>', ' stroke-dasharray="3 7"/>'),
  foguete: () =>
    p('M100 18Q144 62 136 134H64Q56 62 100 18Z') +
    `<circle cx="100" cy="76" r="14" stroke="${AZUL}"/>` +
    p('M64 112L34 154L66 140M136 112L166 154L134 140') +
    p('M84 144Q100 190 116 144', AMARELO),
  lampada: () =>
    p('M100 24Q54 24 54 76Q54 102 76 120V136H124V120Q146 102 146 76Q146 24 100 24Z', AMARELO) +
    p('M80 150H120M86 164H114') +
    p('M88 120L100 96L112 120', AMARELO),
  lupa: () =>
    '<circle cx="84" cy="84" r="50"/>' +
    p('M120 120L176 176').replace('<path', '<path stroke-width="6"') +
    p('M68 68L54 84L68 100', VERDE) +
    p('M100 68L114 84L100 100', VERDE),
  pasta: () =>
    p(
      'M24 62V152Q24 162 34 162H166Q176 162 176 152V76Q176 66 166 66H100L84 44H34Q24 44 24 54Z',
      AMARELO,
    ) + p('M24 80H176'),
  wifi: () =>
    p('M38 96Q100 38 162 96', AZUL) +
    p('M62 120Q100 84 138 120', AZUL) +
    p('M82 142Q100 126 118 142', AZUL) +
    `<circle cx="100" cy="160" r="5" fill="${AZUL}" stroke="none"/>`,
  cursor: () =>
    p('M54 24V152L86 120L112 174L134 164L108 112L152 108Z') +
    p('M150 52L166 36') +
    p('M168 78H190') +
    p('M134 28V8'),
  cadeado: () =>
    '<rect x="44" y="92" width="112" height="80" rx="10"/>' +
    p('M64 92V66Q64 24 100 24Q136 24 136 66V92') +
    `<circle cx="100" cy="126" r="9" stroke="${VERDE}"/>` +
    p('M100 135V152', VERDE),
  chip,
  teclado,
  mouse: () =>
    '<rect x="64" y="34" width="72" height="124" rx="36"/>' +
    p('M100 34V86M64 86H136') +
    p('M100 50V68', AZUL),
  lista,
  nuvemTexto: () =>
    p(
      'M30 40H170Q180 40 180 50V120Q180 130 170 130H92L58 162V130H30Q20 130 20 120V50Q20 40 30 40Z',
    ) + txt(100, 92, 'Hello, World!', { tam: 22 }),
  slogan: () =>
    txt(20, 56, 'code.', { tam: 34, ancora: 'start' }) +
    txt(20, 96, 'build.', { tam: 34, ancora: 'start' }) +
    txt(20, 136, 'debug.', { tam: 34, ancora: 'start' }) +
    txt(20, 176, 'repeat.', { tam: 34, ancora: 'start' }),
  hex: () =>
    txt(100, 96, '0x400', { cor: AZUL, tam: 40 }) + txt(100, 140, 'CAFE', { cor: AZUL, tam: 40 }),
  npm: () =>
    '<rect x="14" y="70" width="172" height="52" rx="26"/>' +
    txt(100, 104, 'npm run dev', { cor: VERDE, tam: 22, fonte: MONO }),
  push: () =>
    '<rect x="14" y="70" width="172" height="52" rx="26"/>' +
    txt(100, 104, 'git push', { cor: AMARELO, tam: 22, fonte: MONO }),
  erro404: () =>
    txt(100, 112, '404', { cor: CORAL, tam: 64 }) + txt(100, 148, 'not found', { tam: 20 }),
  todo: () => txt(100, 108, '// TODO', { cor: ROXO, tam: 30, fonte: MONO }),
  loop: () =>
    txt(100, 80, 'while (alive) {', { tam: 17, fonte: MONO, cor: ROSA }) +
    txt(112, 106, 'code();', { tam: 17, fonte: MONO, cor: VERDE }) +
    txt(100, 132, '}', { tam: 17, fonte: MONO, cor: ROSA }),
};
const NOMES = Object.keys(FIGURAS);

function brilho(cx, cy, r, cor) {
  return `<path d="M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z" stroke="${cor}" stroke-width="1.6"/>`;
}

// Embaralha uma copia da lista de nomes (cada figurinha so repete depois de usar todas)
let fila = [];
const proxima = () => {
  if (!fila.length) {
    fila = [...NOMES];
    for (let i = fila.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [fila[i], fila[j]] = [fila[j], fila[i]];
    }
  }
  return fila.pop();
};

const colocados = [];
const colide = (r, margem) =>
  colocados.some(
    (c) =>
      r.x < c.x + c.w + margem &&
      r.x + r.w + margem > c.x &&
      r.y < c.y + c.h + margem &&
      r.y + r.h + margem > c.y,
  );

let laterais = '';
let centro = '';
let enfeites = '';

// zona: 'esq' | 'dir' | 'centro'
function sortearPosicao(zona, lado) {
  if (zona === 'centro')
    return 20 + LARGURA_LATERAL + rnd() * (W - 2 * LARGURA_LATERAL - 40 - lado);
  if (zona === 'esq') return 10 + rnd() * (LARGURA_LATERAL - lado);
  return W - LARGURA_LATERAL + rnd() * (LARGURA_LATERAL - lado - 10);
}

function povoar(zona, tentativas, escalaMin, escalaMax, margem) {
  let alvo = '';
  for (let t = 0; t < tentativas; t++) {
    const nome = proxima();
    const s = escalaMin + rnd() * (escalaMax - escalaMin);
    const lado = 200 * s;
    const x = sortearPosicao(zona, lado);
    const y = 10 + rnd() * (H - lado - 20);
    const r = { x, y, w: lado, h: lado };
    if (colide(r, margem)) {
      fila.push(nome);
      continue;
    }
    colocados.push(r);
    const giro = ((rnd() - 0.5) * 24).toFixed(1);
    alvo += `<g transform="translate(${(x + lado / 2).toFixed(1)} ${(y + lado / 2).toFixed(1)}) rotate(${giro}) scale(${s.toFixed(2)}) translate(-100 -100)">${FIGURAS[nome]()}</g>`;
  }
  return alvo;
}

laterais += povoar('esq', 48, 0.36, 0.64, 110);
laterais += povoar('dir', 48, 0.36, 0.64, 110);
centro += povoar('centro', 26, 0.3, 0.46, 160);

// brilhos (estrelinhas) e pontinhos espalhados pelos vaos
for (let i = 0; i < 90; i++) {
  const lat = rnd() < 0.8;
  const zona = lat ? (rnd() < 0.5 ? 'esq' : 'dir') : 'centro';
  const r = 5 + rnd() * 9;
  const x = sortearPosicao(zona, 2 * r) + r;
  const y = 10 + rnd() * (H - 20);
  const caixa = { x: x - r, y: y - r, w: 2 * r, h: 2 * r };
  if (colide(caixa, 60)) continue;
  colocados.push(caixa);
  const cor = rnd() < 0.7 ? '#fff' : [AZUL, VERDE, AMARELO, ROSA][Math.floor(rnd() * 4)];
  const forma = brilho(+x.toFixed(1), +y.toFixed(1), +r.toFixed(1), cor);
  if (zona === 'centro') centro += forma;
  else laterais += forma;
}

const estilo =
  'fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <g ${estilo} opacity="${OPACIDADE_LATERAL}">${laterais}</g>
  <g ${estilo} opacity="${OPACIDADE_CENTRO}">${centro}${enfeites}</g>
</svg>`;

if (process.argv.includes('--svg')) fs.writeFileSync('fundo-doodles.preview.svg', svg);

const info = await sharp(Buffer.from(svg), { density: 72 })
  .avif({ quality: 40, effort: 6 })
  .toFile('src/assets/fundo-doodles.avif');
console.log(
  `src/assets/fundo-doodles.avif gerada: ${W}x${H}, ${Math.round(info.size / 1024)} KB, ${colocados.length} elementos`,
);
