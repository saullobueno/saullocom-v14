// Gera src/assets/fundo-jornal.avif: textura de pagina de jornal impresso em preto e branco
// (colunas de texto justificado, manchetes, fios, fotos em reticula e grao de papel), em tinta clara
// sobre o tom escuro do site (#1a1a1a). Fica mais apagada na faixa central, onde ficam os textos.
// Uso: node scripts/gerar-fundo-jornal.mjs [--svg]
import fs from 'node:fs';
import sharp from 'sharp';

const W = 1600;
const H = 7200;
const BG = '#1a1a1a';
const TINTA = '#d9d9d9';
const SERIF = "Georgia, 'Times New Roman', 'DejaVu Serif', serif";
const TITULO = "'Times New Roman', Georgia, 'DejaVu Serif', serif";

const OPACIDADE_LATERAL = 0.3; // intensidade da tinta nas laterais
const OPACIDADE_CENTRO = 0.12; // intensidade na faixa central
const GRAO = 9; // intensidade maxima do grao de papel (0-255, em alfa)

const MARGEM = 40;
const COLUNAS = 7;
const CALHA = 22;
const COL_W = (W - 2 * MARGEM - CALHA * (COLUNAS - 1)) / COLUNAS;
const CORPO = 10; // corpo do texto, em px
const LINHA = 12.6;

let semente = 20260619;
const rnd = () => {
  semente = (semente * 1664525 + 1013904223) % 4294967296;
  return semente / 4294967296;
};
const entre = (a, b) => a + rnd() * (b - a);
const sorteia = (l) => l[Math.floor(rnd() * l.length)];
const n = (v) => v.toFixed(1);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const PALAVRAS =
  `a o de da do em para com por que um uma os as dos das no na nos nas ao se mais mas como seu sua
foi são tem pode deve entre sobre desde até após durante ainda também muito novo nova novos novas primeiro
governo mercado empresa projeto sistema equipe cidade estado país mundo tecnologia desenvolvimento software
engenharia dados produto cliente serviço resultado processo qualidade desempenho segurança inovação
trabalho profissional experiência história carreira design interface usuário plataforma aplicativo
economia cultura sociedade educação saúde ciência pesquisa análise estudo relatório medida decisão
mudança crescimento investimento estratégia tendência segundo especialistas informou anunciou afirmou
ontem hoje semana ano mês anos meses dia noite manhã tarde recente atual futuro passado desafio solução
integração arquitetura infraestrutura nuvem aplicações operação equipes metodologia ágil entrega
contrato parceria expansão redução aumento queda alta índice taxa meta objetivo prazo orçamento`.split(
    /\s+/,
  );

const MANCHETES = [
  'Engenharia de software ganha novo ritmo nas empresas',
  'Design e tecnologia caminham juntos na nova economia digital',
  'Plataformas integradas mudam a rotina das equipes de produto',
  'Inteligência artificial redefine o desenvolvimento de sistemas',
  'Aplicativos móveis avançam em serviços essenciais',
  'Arquitetura de nuvem reduz custos e acelera entregas',
  'Experiência do usuário passa a decidir o sucesso dos produtos',
  'Interfaces mais claras ampliam o acesso a serviços digitais',
  'Segurança de dados vira prioridade em projetos de grande porte',
  'Equipes pequenas entregam mais com processos enxutos',
  'Mercado de tecnologia projeta crescimento para o próximo ano',
  'Do papel ao código: a trajetória de quem constrói produtos',
  'Qualidade de software em foco nas decisões de investimento',
  'Novas ferramentas aceleram a criação de sites e sistemas',
  'Desempenho e acessibilidade pautam a web moderna',
  'Cidades conectadas apostam em soluções digitais integradas',
];
const DECKS = [
  'Especialistas apontam que a integração entre design e engenharia reduz retrabalho e melhora a entrega.',
  'Levantamento mostra mudança de hábitos e novas demandas por soluções sob medida.',
  'Métodos ágeis e automação ajudam equipes a manter qualidade em ciclos mais curtos.',
];
const SECOES = [
  'ECONOMIA',
  'TECNOLOGIA',
  'CULTURA',
  'NEGÓCIOS',
  'CIÊNCIA',
  'DESIGN',
  'OPINIÃO',
  'CIDADES',
  'MERCADO',
];

const capitaliza = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// frase de n palavras aleatorias com pontuacao simples
function paragrafo(minPal, maxPal) {
  const total = Math.floor(entre(minPal, maxPal));
  const pal = [];
  for (let i = 0; i < total; i++) pal.push(sorteia(PALAVRAS));
  let s = capitaliza(pal.join(' '));
  s = s.replace(/ (de|da|do|que|com) /g, (m) => (rnd() < 0.08 ? ', ' : m));
  return s + '.';
}

// quebra um texto em linhas de largura aproximada (largura media de um caractere = 0.45 * corpo)
function quebrar(texto, largura, tam, recuo = 0, fator = 0.45) {
  const cw = tam * fator;
  const palavras = texto.split(' ');
  const linhas = [];
  let atual = '';
  let max = Math.floor((largura - recuo) / cw);
  for (const p of palavras) {
    const tentativa = atual ? `${atual} ${p}` : p;
    if (tentativa.length > max && atual) {
      linhas.push(atual);
      atual = p;
      max = Math.floor(largura / cw);
    } else {
      atual = tentativa;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

const defs = [];
let tinta = '';
let idFoto = 0;

const linhaH = (x1, x2, y, op = 0.7, sw = 0.8) =>
  `<path d="M${n(x1)} ${n(y)}H${n(x2)}" stroke="${TINTA}" stroke-width="${sw}" opacity="${op}"/>`;
const linhaV = (x, y1, y2, op = 0.45) =>
  `<path d="M${n(x)} ${n(y1)}V${n(y2)}" stroke="${TINTA}" stroke-width="0.7" opacity="${op}"/>`;

function foto(x, y, w, h) {
  const id = `ft${idFoto++}`;
  const cx = entre(0.2, 0.8) * w;
  const cy = entre(0.2, 0.8) * h;
  defs.push(
    `<radialGradient id="g${id}" gradientUnits="userSpaceOnUse" cx="${n(x + cx)}" cy="${n(y + cy)}" r="${n(Math.max(w, h) * entre(0.55, 0.9))}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#555"/></radialGradient>`,
    `<mask id="m${id}"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="url(#g${id})"/></mask>`,
  );
  return (
    `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="url(#pontos)" mask="url(#m${id})"/>` +
    `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="none" stroke="${TINTA}" stroke-width="0.8" opacity="0.7"/>`
  );
}

// Artigo que ocupa `span` colunas a partir da coluna `c0`, entre yTopo e yFim
function artigo(c0, span, yTopo, yFim) {
  let s = '';
  const x = MARGEM + c0 * (COL_W + CALHA);
  const gw = span * COL_W + (span - 1) * CALHA;
  let y = yTopo + 12;

  // secao (versalete espacado) com fio
  s += `<text x="${n(x)}" y="${n(y)}" font-family="${SERIF}" font-size="8.5" font-weight="700" letter-spacing="1.6" fill="${TINTA}">${sorteia(SECOES)}</text>`;
  y += 5;
  s += linhaH(x, x + gw, y, 0.8, 1.2);
  y += 7;

  // manchete
  const tam = span === 1 ? entre(19, 25) : span === 2 ? entre(30, 40) : entre(42, 58);
  const caixaAlta = rnd() < 0.25;
  let titulo = sorteia(MANCHETES);
  if (caixaAlta) titulo = titulo.toUpperCase();
  const linhasTitulo = quebrar(titulo, gw, tam, 0, caixaAlta ? 0.72 : 0.54).slice(
    0,
    span === 1 ? 4 : 3,
  );
  for (const l of linhasTitulo) {
    y += tam * 0.98;
    s += `<text x="${n(x)}" y="${n(y)}" font-family="${TITULO}" font-size="${n(tam)}" font-weight="700" fill="${TINTA}">${esc(l)}</text>`;
    y += tam * 0.06;
  }
  y += 8;

  // subtitulo em italico
  if (rnd() < 0.7) {
    const ls = quebrar(sorteia(DECKS), gw, 12, 0, 0.42).slice(0, 3);
    for (const l of ls) {
      y += 14;
      s += `<text x="${n(x)}" y="${n(y)}" font-family="${SERIF}" font-size="12" font-style="italic" fill="${TINTA}">${esc(l)}</text>`;
    }
    y += 6;
  }

  // foto em reticula com legenda
  if (yFim - y > 260 && rnd() < (span === 1 ? 0.3 : 0.55)) {
    const fh = Math.min(gw * entre(0.28, 0.5), yFim - y - 140);
    s += foto(x, y + 4, gw, fh);
    y += fh + 4;
    for (const l of quebrar(paragrafo(10, 18), gw, 8.5).slice(0, 2)) {
      y += 11;
      s += `<text x="${n(x)}" y="${n(y)}" font-family="${SERIF}" font-size="8.5" font-style="italic" fill="${TINTA}">${esc(l)}</text>`;
    }
    y += 6;
  }

  // corpo do texto em colunas, justificado
  const yCorpo = y + 4;
  const porColuna = Math.max(0, Math.floor((yFim - 10 - yCorpo) / LINHA));
  const total = porColuna * span;
  const fluxo = [];
  while (fluxo.length < total) {
    const ls = quebrar(paragrafo(40, 110), COL_W, CORPO, 10);
    ls.forEach((l, i) => fluxo.push({ l, recuo: i === 0 ? 10 : 0, ultima: i === ls.length - 1 }));
  }
  for (let c = 0; c < span; c++) {
    const cx = x + c * (COL_W + CALHA);
    for (let i = 0; i < porColuna; i++) {
      const it = fluxo[c * porColuna + i];
      const ly = yCorpo + (i + 1) * LINHA;
      const ajuste = it.ultima ? '' : ` textLength="${n(COL_W - it.recuo)}" lengthAdjust="spacing"`;
      s += `<text x="${n(cx + it.recuo)}" y="${n(ly)}" font-family="${SERIF}" font-size="${CORPO}" fill="${TINTA}"${ajuste}>${esc(it.l)}</text>`;
    }
    if (c > 0) s += linhaV(cx - CALHA / 2, yCorpo, yFim - 12);
  }
  return s;
}

// Faixas horizontais, cada uma dividida em grupos de colunas (um artigo por grupo)
let y = 36;
let artigos = 0;
while (y < H - 260) {
  const alturaFaixa = Math.min(entre(520, 980), H - 30 - y);
  const grupos = [];
  let restante = COLUNAS;
  while (restante > 0) {
    const span = Math.min(restante, sorteia([1, 1, 2, 2, 3]));
    grupos.push(span);
    restante -= span;
  }
  let c0 = 0;
  grupos.forEach((span, i) => {
    tinta += artigo(c0, span, y, y + alturaFaixa);
    artigos++;
    c0 += span;
    if (i < grupos.length - 1) {
      const xr = MARGEM + c0 * (COL_W + CALHA) - CALHA / 2;
      tinta += linhaV(xr, y + 6, y + alturaFaixa - 8, 0.6);
    }
  });
  y += alturaFaixa;
  // fio duplo entre faixas
  tinta +=
    linhaH(MARGEM, W - MARGEM, y - 2, 0.8, 1.6) + linhaH(MARGEM, W - MARGEM, y + 1.5, 0.8, 0.6);
  y += 6;
}

// dobras do papel
let dobras = '';
for (let d = 1; d < H / 2400; d++) {
  dobras += `<rect x="0" y="${d * 2400 - 1}" width="${W}" height="2" fill="#000" opacity="0.22"/><rect x="0" y="${d * 2400 + 1}" width="${W}" height="2" fill="#fff" opacity="0.04"/>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
  <pattern id="pontos" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="1.8" cy="1.8" r="1.25" fill="${TINTA}"/></pattern>
  <linearGradient id="lados" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">
    <stop offset="0" stop-color="#fff"/><stop offset="0.2" stop-color="#fff"/><stop offset="0.36" stop-color="#fff" stop-opacity="${OPACIDADE_CENTRO / OPACIDADE_LATERAL}"/>
    <stop offset="0.64" stop-color="#fff" stop-opacity="${OPACIDADE_CENTRO / OPACIDADE_LATERAL}"/><stop offset="0.8" stop-color="#fff"/><stop offset="1" stop-color="#fff"/>
  </linearGradient>
  <mask id="mascaraLados" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#lados)"/></mask>
  ${defs.join('\n  ')}
</defs>
<rect width="${W}" height="${H}" fill="${BG}"/>
<g mask="url(#mascaraLados)" opacity="${OPACIDADE_LATERAL}">${tinta}</g>
${dobras}
</svg>`;

if (process.argv.includes('--svg')) fs.writeFileSync('fundo-jornal.preview.svg', svg);

// grao de papel: pontos claros/escuros muito fracos sobre toda a imagem
const grao = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const v = rnd() < 0.5 ? 0 : 255;
  grao[i * 4] = grao[i * 4 + 1] = grao[i * 4 + 2] = v;
  grao[i * 4 + 3] = Math.floor(rnd() * GRAO);
}

const base = await sharp(Buffer.from(svg), { density: 72 }).png().toBuffer();
const info = await sharp(base)
  .composite([{ input: grao, raw: { width: W, height: H, channels: 4 } }])
  .avif({ quality: 40, effort: 6 })
  .toFile('src/assets/fundo-jornal.avif');
console.log(
  `src/assets/fundo-jornal.avif gerada: ${W}x${H}, ${Math.round(info.size / 1024)} KB, ${artigos} artigos`,
);
