// Gera src/assets/fundo-escritorio.avif: cena de um escritorio home office de madrugada, em
// ilustracao vetorial colorida, seguindo o layout de uma foto de referencia: monitor com codigo
// em laranja a esquerda, janela com chuva e luzes da cidade desfocadas a direita, relogio, pilha
// de livros, laptop com teclado vermelho, caneca, caderno de ideias, mouse e fones sobre a mesa.
// A cena (1600x2400) aparece 3 vezes empilhadas, com textos e luzes diferentes, e todo o conjunto
// e esmaecido no tom escuro do site; o centro, onde ficam os textos, fica ainda mais apagado.
// Uso: node scripts/gerar-fundo-escritorio.mjs [--svg]
import fs from 'node:fs';
import sharp from 'sharp';

const W = 1600;
const CENA_H = 2400;
const REPETICOES = 3;
const H = CENA_H * REPETICOES;
const ESCALA = W / 736; // a cena e desenhada em 736x1104 (proporcao da foto de referencia)
const BG = '#1a1a1a';
const MONO = "Consolas, 'DejaVu Sans Mono', Menlo, monospace";
const SANS = "Bahnschrift, 'Segoe UI', Arial, sans-serif";
const MANUSCRITA = "'Ink Free', 'Segoe Print', 'Bradley Hand ITC', cursive";

const OPACIDADE = 0.55; // intensidade geral da cena sobre o fundo
const OPACIDADE_CENTRO = 0.45; // fracao da intensidade mantida na faixa central (textos)

const CREME = '#f1e4c8';
const LARANJA = '#ff9b52';
const VERMELHO = '#ff5a4a';
const LUZES = ['#ffb347', '#ff9d3c', '#ff7a2f', '#ffd27a', '#ff4d3a', '#fff0cf', '#7fc8ff'];

let semente = 20260618;
const rnd = () => {
  semente = (semente * 1664525 + 1013904223) % 4294967296;
  return semente / 4294967296;
};
const entre = (a, b) => a + rnd() * (b - a);
const sorteia = (lista) => lista[Math.floor(rnd() * lista.length)];
const n = (v) => v.toFixed(1);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const texto = (
  x,
  y,
  t,
  { tam = 20, cor = CREME, fonte = MONO, peso = 400, ancora = 'start', extra = '' } = {},
) =>
  `<text x="${x}" y="${y}" font-size="${tam}" font-family="${fonte}" font-weight="${peso}" text-anchor="${ancora}" fill="${cor}" ${extra}>${esc(t)}</text>`;

// Variacoes de cada repeticao da cena
const VARIANTES = [
  {
    codigo: [
      ['while', ' (not_successful) {'],
      ['try_again();'],
      ['learn();'],
      ['improve();'],
      ['}'],
      ['success = ', 'inevitable', ';'],
    ],
    hora: '2:47',
    livros: ['FOCUS.', 'GROW.', 'BECOME BETTER.'],
    caneca: ['STAY', 'BUILDING.'],
    ideias: ['MAKE SOMETHING', 'GROW DAILY', "DON'T QUIT."],
  },
  {
    codigo: [
      ['if', ' (tired) {'],
      ['drink(coffee);'],
      ['keep_going();'],
      ['ship();'],
      ['}'],
      ['morning = ', 'better', ';'],
    ],
    hora: '3:14',
    livros: ['DEEP WORK.', 'PRACTICE.', 'KEEP SHIPPING.'],
    caneca: ['KEEP', 'SHIPPING.'],
    ideias: ['SHIP IT', 'LEARN MORE', 'REST WELL.'],
  },
  {
    codigo: [
      ['for', ' (day of days) {'],
      ['commit();'],
      ['push();'],
      ['repeat();'],
      ['}'],
      ['growth = ', 'compound', ';'],
    ],
    hora: '1:58',
    livros: ['READ.', 'WRITE.', 'REFACTOR.'],
    caneca: ['DEBUG', 'LIFE.'],
    ideias: ['WRITE TESTS', 'REFACTOR', 'DEPLOY FRIDAY?'],
  },
];

// ---------- cena (coordenadas em 736x1104) ----------

function janela() {
  let s = `<rect x="498" y="0" width="238" height="470" fill="url(#noite)"/>`;
  // predios ao longe, com janelas acesas
  let predios = '';
  let x = 498;
  while (x < 736) {
    const bw = entre(24, 52);
    const bh = entre(70, 270);
    predios += `<rect x="${n(x)}" y="${n(470 - bh)}" width="${n(bw)}" height="${n(bh)}" fill="#0a0c14"/>`;
    for (let i = 0; i < bw * bh * 0.012; i++) {
      predios += `<rect x="${n(x + entre(2, bw - 4))}" y="${n(470 - bh + entre(4, bh - 6))}" width="3" height="4" fill="${sorteia(['#ffb347', '#ffd27a', '#ff9d3c', '#fff0cf'])}" opacity="${n(entre(0.5, 1))}"/>`;
    }
    x += bw + entre(0, 6);
  }
  s += `<g filter="url(#b2)">${predios}</g>`;
  // luzes desfocadas (bokeh)
  let bokeh = '';
  for (let i = 0; i < 40; i++) {
    bokeh += `<circle cx="${n(entre(505, 730))}" cy="${n(entre(190, 470))}" r="${n(entre(4, 15))}" fill="${sorteia(LUZES)}" opacity="${n(entre(0.45, 0.95))}"/>`;
  }
  bokeh += `<circle cx="590" cy="203" r="13" fill="#fff6e0" opacity="0.95"/><circle cx="660" cy="456" r="11" fill="#ff3b30" opacity="0.9"/>`;
  s += `<g filter="url(#b6)">${bokeh}</g>`;
  // folhas escuras no canto superior direito
  s += `<g filter="url(#b3)" fill="#0b1a10"><ellipse cx="725" cy="40" rx="22" ry="60"/><ellipse cx="700" cy="10" rx="16" ry="34"/></g>`;
  // gotas de chuva no vidro
  for (let i = 0; i < 170; i++) {
    const gx = entre(500, 734);
    const gy = entre(2, 468);
    const rx = entre(0.5, 1.5);
    const ry = rx * entre(1.5, 2.6);
    s += `<ellipse cx="${n(gx)}" cy="${n(gy)}" rx="${n(rx)}" ry="${n(ry)}" fill="none" stroke="#d6e6ff" stroke-width="0.5" opacity="0.4"/>`;
    s += `<circle cx="${n(gx - rx * 0.3)}" cy="${n(gy - ry * 0.4)}" r="0.5" fill="#fff" opacity="0.65"/>`;
  }
  for (let i = 0; i < 12; i++) {
    s += `<path d="M${n(entre(505, 730))} ${n(entre(0, 300))}v${n(entre(30, 110))}" stroke="#d6e6ff" stroke-width="0.7" opacity="0.18"/>`;
  }
  return s;
}

function monitor(v) {
  let s = `<rect x="-20" y="-20" width="530" height="570" fill="#08080a"/>`;
  s += `<rect x="0" y="0" width="497" height="522" fill="#06070a"/>`;
  // editor ao fundo: numeros de linha e trechos de codigo miniatura
  for (let i = 0; i < 34; i++) {
    const y = 12 + i * 14.6;
    s += texto(24, y + 3, String(23 + i), {
      tam: 7,
      cor: '#d08a4a',
      ancora: 'end',
      extra: 'opacity="0.6"',
    });
    s += `<path d="M30 ${n(y)}h${n(entre(6, 70))}" stroke="${sorteia([LARANJA, '#f1e4c8', VERMELHO, '#7fc8ff'])}" stroke-width="3" opacity="0.5"/>`;
  }
  s += `<path d="M108 218V352" stroke="#3a3a3a" stroke-width="1"/>`;
  const linhas = [
    [195, 100, v.codigo[0], true],
    [247, 153, v.codigo[1]],
    [286, 153, v.codigo[2]],
    [331, 153, v.codigo[3]],
    [369, 105, v.codigo[4]],
    [436, 105, v.codigo[5]],
  ];
  const codigo = linhas
    .map(([y, x, partes, primeira]) => {
      const spans = partes
        .map((t, i) => {
          let cor = CREME;
          if (primeira && i === 0) cor = VERMELHO;
          else if (!primeira && partes.length === 1 && t !== '}') cor = LARANJA;
          else if (partes.length === 3 && i === 1) cor = LARANJA;
          return `<tspan fill="${cor}">${esc(t)}</tspan>`;
        })
        .join('');
      return `<text x="${x}" y="${y}" font-size="26" font-family="${MONO}" xml:space="preserve">${spans}</text>`;
    })
    .join('');
  s += `<g filter="url(#glow)" opacity="0.85">${codigo}</g>${codigo}`;
  s += `<rect x="0" y="0" width="497" height="522" fill="url(#reflexo)"/>`;
  // barra de tarefas
  s += `<rect x="0" y="522" width="497" height="24" fill="#12141a"/>`;
  for (let i = 0; i < 16; i++) {
    s += `<circle cx="${12 + i * 18}" cy="534" r="5" fill="${sorteia(['#ffb347', '#4db8ff', '#ff5a4a', '#4ade80', '#fff0cf'])}" opacity="0.8"/>`;
  }
  s += `<rect x="0" y="544" width="500" height="3" fill="#2a2a2e"/>`;
  return s;
}

function prateleira() {
  let s = `<rect x="0" y="547" width="736" height="150" fill="#0c0b0b"/>`;
  s += `<g fill="none" stroke="#1d1c1c" stroke-width="5" opacity="0.9"><path d="M330 640Q360 600 395 640T440 630"/><path d="M360 660Q400 690 430 650"/></g>`;
  s += `<ellipse cx="380" cy="700" rx="160" ry="40" fill="#ff4a30" opacity="0.14" filter="url(#b12)"/>`;
  return s;
}

function mesa() {
  return `<rect x="0" y="690" width="736" height="414" fill="url(#mesa)"/>`;
}

function relogio(v) {
  let s = `<rect x="525" y="478" width="190" height="108" rx="8" fill="#0c0c0d" stroke="#1d1d20" stroke-width="2"/>`;
  const num =
    texto(552, 548, v.hora, { tam: 54, cor: '#fff1e6', fonte: SANS, peso: 700 }) +
    texto(672, 552, 'AM', { tam: 24, cor: '#fff1e6', fonte: SANS, peso: 700 });
  s += `<g filter="url(#glow)" opacity="0.8">${num}</g>${num}`;
  return s;
}

function livros(v) {
  let s = '';
  // livro ao fundo, mais a esquerda, com paginas aparecendo
  s += `<g><rect x="430" y="575" width="120" height="36" rx="3" fill="#161a1f"/><path d="M432 585h116M432 592h116M432 599h116" stroke="#cfc3a6" stroke-width="2" opacity="0.4"/></g>`;
  const pilha = [
    [545, 745, 191, 66, '#1a1e23', v.livros[2], 0],
    [538, 690, 198, 54, '#20252b', v.livros[1], 0],
    [534, 636, 202, 54, '#1c2025', v.livros[0], -0.8],
  ];
  for (const [x, y, w, h, cor, rot, giro] of pilha) {
    s += `<g transform="rotate(${giro} ${x} ${y})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${cor}" stroke="#30353c" stroke-width="1.5"/>`;
    s += `<path d="M${x + 3} ${y + 1.5}H${x + w}" stroke="#ffb347" stroke-width="1.5" opacity="0.45"/>`;
    s += texto(x + 44, y + h / 2 + 7, rot, {
      tam: 19,
      fonte: SANS,
      peso: 600,
      cor: '#d2c4a4',
      extra: 'letter-spacing="1.5" opacity="0.9"',
    });
    s += `</g>`;
  }
  return s;
}

function laptop() {
  let s = `<ellipse cx="240" cy="725" rx="190" ry="40" fill="#ff3a28" opacity="0.28" filter="url(#b12)"/>`;
  s += `<polygon points="52,662 410,648 425,742 70,790" fill="#0b0b0d" stroke="#232428" stroke-width="2"/>`;
  s += `<g transform="matrix(1 -0.04 0.04 1 0 0)">`;
  for (let r = 0; r < 5; r++) {
    for (let i = 0; i < 15; i++) {
      const kx = 66 + i * 22.5 + r * 2;
      const ky = 676 + r * 17;
      s += `<rect x="${n(kx)}" y="${n(ky)}" width="19" height="13" rx="2" fill="#15171b" stroke="#ff4a36" stroke-width="0.9" opacity="0.85"/>`;
    }
  }
  s += `</g>`;
  s += `<polygon points="195,752 340,746 346,780 200,788" fill="#141619" stroke="#26282c" stroke-width="1.5"/>`;
  // post-it laranja
  s += `<g transform="rotate(-8 85 650)"><rect x="35" y="612" width="105" height="76" fill="#cf7a32" opacity="0.92"/><rect x="35" y="612" width="105" height="76" fill="#ff9b52" opacity="0.25" filter="url(#b3)"/></g>`;
  return s;
}

function laptopFrente() {
  let s = `<g filter="url(#b3)">`;
  s += `<polygon points="-20,640 85,626 230,900 215,1104 -20,1104" fill="#0b0c10"/>`;
  s += `<polygon points="-20,646 70,634 165,860 -20,880" fill="#0c1a30"/>`;
  s += `<g opacity="0.5">`;
  for (let r = 0; r < 6; r++) {
    s += `<rect x="${-10 + r * 4}" y="${905 + r * 30}" width="${190 - r * 6}" height="18" rx="3" fill="#15171b" stroke="#ff4a36" stroke-width="0.8"/>`;
  }
  s += `</g></g>`;
  return s;
}

function caneca(v) {
  let s =
    `<g transform="translate(-42 0)">` +
    `<path d="M560 740Q618 738 616 800Q612 856 558 846" fill="none" stroke="#161617" stroke-width="16"/>`;
  s += `<path d="M560 740Q618 738 616 800Q612 856 558 846" fill="none" stroke="#2f3136" stroke-width="1.5"/>`;
  s += `<rect x="420" y="708" width="142" height="168" rx="14" fill="#151516" stroke="#2a2b2f" stroke-width="2"/>`;
  s += `<path d="M426 730V860" stroke="#ffb347" stroke-width="2" opacity="0.35"/>`;
  s += `<ellipse cx="491" cy="708" rx="71" ry="15" fill="#0d0d0e" stroke="#33353a" stroke-width="2"/>`;
  s += `<ellipse cx="491" cy="710" rx="60" ry="10" fill="#3a2312"/>`;
  const estilo = {
    tam: 19,
    fonte: SANS,
    peso: 600,
    ancora: 'middle',
    cor: '#d2c4a4',
    extra: 'letter-spacing="2" opacity="0.88"',
  };
  s += texto(491, 786, v.caneca[0], estilo);
  s += texto(491, 812, v.caneca[1], estilo);
  return `${s}</g>`;
}

function caderno(v) {
  let s = `<g transform="rotate(-9 340 940)">`;
  s += `<rect x="118" y="792" width="470" height="300" rx="5" fill="#d8cdb0"/>`;
  for (let y = 814; y < 1090; y += 14)
    s += `<path d="M118 ${y}H588" stroke="#8d8570" stroke-width="0.6" opacity="0.4"/>`;
  for (let x = 136; x < 588; x += 14)
    s += `<path d="M${x} 792V1092" stroke="#8d8570" stroke-width="0.6" opacity="0.4"/>`;
  for (let y = 806; y < 1090; y += 18)
    s += `<circle cx="118" cy="${y}" r="4" fill="#1c1c1e" stroke="#9a9a9e" stroke-width="1"/>`;
  s += texto(166, 836, 'IDEAS:', { tam: 21, cor: '#2b2b2d', fonte: MANUSCRITA, peso: 700 });
  s += `<path d="M166 842H225" stroke="#2b2b2d" stroke-width="1.5"/>`;
  v.ideias.forEach((t, i) => {
    const y = 880 + i * 32;
    s += `<rect x="168" y="${y - 15}" width="17" height="17" rx="2" fill="none" stroke="#2b2b2d" stroke-width="1.6"/>`;
    s += `<path d="M171 ${y - 6}l5 5l9 -12" fill="none" stroke="#2b2b2d" stroke-width="2"/>`;
    s += texto(196, y, t, { tam: 18, cor: '#2b2b2d', fonte: MANUSCRITA, peso: 700 });
  });
  s += `<path d="M262 1050L296 1000L318 1022L362 972" fill="none" stroke="#2b2b2d" stroke-width="1.6"/><path d="M262 1050V965M262 1050H372" stroke="#2b2b2d" stroke-width="1.6"/>`;
  s += `<path d="M290 802q22 -16 48 0t8 30t-40 8" fill="none" stroke="#2b2b2d" stroke-width="1.6"/>`;
  s += `<path d="M375 905l28 -14l-4 28zM384 936q18 -10 30 6t-22 14" fill="none" stroke="#2b2b2d" stroke-width="1.6"/>`;
  s += `<rect x="118" y="792" width="470" height="300" rx="5" fill="url(#sombraPapel)"/>`;
  // caneta
  s += `<path d="M395 900L548 1020" stroke="#0d0d0f" stroke-width="9" stroke-linecap="round"/><path d="M470 962L490 978" stroke="#9aa0a8" stroke-width="9" stroke-linecap="round"/><path d="M398 902L545 1017" stroke="#fff" stroke-width="1" opacity="0.25"/>`;
  s += `</g>`;
  return s;
}

function mouseFones() {
  let s = `<path d="M580 905Q575 862 640 858Q724 856 730 915Q734 972 665 968Q590 966 580 905Z" fill="#0e0e0f" stroke="#2a2a2d" stroke-width="2"/>`;
  s += `<path d="M652 859V905" stroke="#2a2a2d" stroke-width="2"/><circle cx="652" cy="882" r="3" fill="#ffa45c"/><circle cx="652" cy="882" r="12" fill="#ff8a3c" opacity="0.55" filter="url(#b3)"/>`;
  // fones de ouvido
  s += `<g><ellipse cx="548" cy="920" rx="16" ry="14" fill="#e8e6e0" opacity="0.88" transform="rotate(-20 548 920)"/><rect x="556" y="926" width="8" height="26" rx="4" fill="#e8e6e0" opacity="0.88" transform="rotate(-20 548 920)"/><circle cx="543" cy="915" r="4" fill="#fff" opacity="0.8"/>`;
  s += `<ellipse cx="594" cy="958" rx="17" ry="14" fill="#e8e6e0" opacity="0.88" transform="rotate(25 594 958)"/><rect x="578" y="962" width="8" height="26" rx="4" fill="#e8e6e0" opacity="0.88" transform="rotate(25 594 958)"/></g>`;
  // marcador
  s += `<g transform="rotate(18 680 822)"><rect x="610" y="810" width="124" height="24" rx="6" fill="#d9d6cf" opacity="0.8"/><rect x="610" y="810" width="30" height="24" rx="6" fill="#d33a30"/></g>`;
  // livros no canto inferior direito (fora de foco)
  s += `<g filter="url(#b3)"><polygon points="650,985 736,970 736,1104 640,1104" fill="#0d1018"/><path d="M655 1000L736 987" stroke="#4db8ff" stroke-width="2" opacity="0.4"/></g>`;
  return s;
}

function cena(v) {
  return [
    `<rect x="-20" y="-20" width="780" height="1150" fill="${BG}"/>`,
    mesa(),
    janela(),
    monitor(v),
    prateleira(),
    relogio(v),
    livros(v),
    laptop(),
    laptopFrente(),
    caneca(v),
    caderno(v),
    mouseFones(),
    `<ellipse cx="330" cy="900" rx="320" ry="260" fill="url(#calor)"/>`,
  ].join('');
}

// ---------- composicao ----------

const defs = `<defs>
  <linearGradient id="noite" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0d18"/><stop offset="1" stop-color="#241326"/></linearGradient>
  <linearGradient id="mesa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26190f"/><stop offset="1" stop-color="#0c0806"/></linearGradient>
  <linearGradient id="reflexo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.05"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="sombraPapel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.65"/><stop offset="0.55" stop-color="#000" stop-opacity="0.08"/></linearGradient>
  <radialGradient id="calor"><stop offset="0" stop-color="#ffa040" stop-opacity="0.22"/><stop offset="1" stop-color="#ffa040" stop-opacity="0"/></radialGradient>
  <filter id="b2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.2"/></filter>
  <filter id="b3" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="b6" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="b12" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="12"/></filter>
  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5"/></filter>
  <linearGradient id="fadeV" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${CENA_H}">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.08" stop-color="#fff"/>
    <stop offset="0.86" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="mascaraV" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${CENA_H}"><rect width="${W}" height="${CENA_H}" fill="url(#fadeV)"/></mask>
  <linearGradient id="lados" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">
    <stop offset="0" stop-color="#fff"/><stop offset="0.22" stop-color="#fff"/><stop offset="0.36" stop-color="#fff" stop-opacity="${OPACIDADE_CENTRO}"/>
    <stop offset="0.64" stop-color="#fff" stop-opacity="${OPACIDADE_CENTRO}"/><stop offset="0.78" stop-color="#fff"/><stop offset="1" stop-color="#fff"/>
  </linearGradient>
  <mask id="mascaraLados" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#lados)"/></mask>
</defs>`;

let cenas = '';
VARIANTES.forEach((v, i) => {
  cenas += `<g transform="translate(0 ${i * CENA_H})"><g mask="url(#mascaraV)"><g transform="scale(${ESCALA.toFixed(4)})">${cena(v)}</g></g></g>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${defs}
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <g mask="url(#mascaraLados)" opacity="${OPACIDADE}">${cenas}</g>
</svg>`;

if (process.argv.includes('--svg')) fs.writeFileSync('fundo-escritorio.preview.svg', svg);

const info = await sharp(Buffer.from(svg), { density: 72 })
  .avif({ quality: 45, effort: 6 })
  .toFile('src/assets/fundo-escritorio.avif');
console.log(
  `src/assets/fundo-escritorio.avif gerada: ${W}x${H}, ${Math.round(info.size / 1024)} KB`,
);
