// Gera src/assets/fundo-codigo.avif: imagem longa, escura e apagada com trechos de codigo web
// (janelas de IDE e codigo solto) usada como fundo com parallax depois do hero.
// O tom de base e o mesmo do site (#1a1a1a) e o codigo fica discreto para nao brigar com os textos.
// Uso: node scripts/gerar-fundo-codigo.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const W = 1600;
const H = 7200;
const BG = '#1a1a1a';
const FONTE = "Consolas, 'DejaVu Sans Mono', Menlo, 'Courier New', monospace";
const TAM = 15;
const LINHA = 23;
const CHAR = TAM * 0.6;
const OPACIDADE = 0.2; // intensidade geral do codigo sobre o fundo

const COR = {
  kw: '#9d85e8',
  str: '#00b259',
  num: '#e2a342',
  fn: '#2ba8d6',
  tag: '#ff6b6b',
  com: '#6e6e6e',
  txt: '#b4b4b4',
  pun: '#8c8c8c',
};

// Gerador pseudoaleatorio deterministico: a imagem sai igual a cada execucao
let semente = 20260614;
const rnd = () => {
  semente = (semente * 1664525 + 1013904223) % 4294967296;
  return semente / 4294967296;
};

const JS_KW =
  /^(const|let|var|function|return|import|from|export|default|async|await|if|else|for|of|in|new|try|catch|throw|class|extends|interface|type|true|false|null|undefined|use|static)\b/;
const SQL_KW =
  /^(SELECT|FROM|WHERE|JOIN|LEFT|ON|GROUP|BY|ORDER|INSERT|INTO|VALUES|UPDATE|SET|CREATE|TABLE|INDEX|PRIMARY|KEY|NOT|NULL|DEFAULT|LIMIT|AS|AND|DESC|COUNT)\b/;
const SH_KW = /^(FROM|RUN|COPY|WORKDIR|EXPOSE|CMD|ENV|npm|git|docker|node|npx|cd)\b/;

// Tokenizador unico: comentario, string, numero, tag, palavra-chave, funcao, pontuacao
function tokenizar(linha, lang) {
  const out = [];
  let resto = linha;
  const push = (texto, cor) => out.push({ texto, cor });
  while (resto.length) {
    let m;
    if (lang === 'css') {
      if ((m = resto.match(/^\/\*.*?\*\//))) push(m[0], COR.com);
      else if ((m = resto.match(/^[.#]?[a-zA-Z][\w-]*(?=[^:;]*\{)/))) push(m[0], COR.tag);
      else if ((m = resto.match(/^[a-z-]+(?=\s*:)/))) push(m[0], COR.fn);
      else if ((m = resto.match(/^#[0-9a-fA-F]{3,8}\b|^-?\d+(\.\d+)?(px|rem|vh|vw|%|ms|s|deg)?/)))
        push(m[0], COR.num);
      else if ((m = resto.match(/^(var|calc|rgb|linear-gradient|translate|scale)(?=\()/)))
        push(m[0], COR.kw);
      else if ((m = resto.match(/^@[a-z-]+/))) push(m[0], COR.kw);
      else if ((m = resto.match(/^[{}:;(),]/))) push(m[0], COR.pun);
      else if ((m = resto.match(/^\s+|^[\w-]+/))) push(m[0], COR.txt);
      else (push(resto[0], COR.txt), (m = [resto[0]]));
    } else {
      if (
        (m = resto.match(/^(\/\/.*|#(?!\w+\s*\{).*|--.*)/)) &&
        !(lang === 'html' || lang === 'json')
      )
        push(m[0], COR.com);
      else if ((m = resto.match(/^<!--.*?-->/))) push(m[0], COR.com);
      else if ((m = resto.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/)))
        push(m[0], lang === 'json' && /^"[^"]*"\s*:/.test(resto) ? COR.fn : COR.str);
      else if (lang === 'html' && (m = resto.match(/^<\/?[A-Za-z][\w.-]*/))) push(m[0], COR.tag);
      else if (lang === 'jsx' && (m = resto.match(/^<\/?[A-Za-z][\w.]*/))) push(m[0], COR.tag);
      else if ((m = resto.match(/^\b\d+(\.\d+)?\b/))) push(m[0], COR.num);
      else if (
        lang === 'sql'
          ? (m = resto.match(SQL_KW))
          : lang === 'sh'
            ? (m = resto.match(SH_KW))
            : (m = resto.match(JS_KW))
      )
        push(m[0], COR.kw);
      else if ((m = resto.match(/^[A-Za-z_$][\w$]*(?=\()/))) push(m[0], COR.fn);
      else if ((m = resto.match(/^[A-Za-z_$][\w$-]*/))) push(m[0], COR.txt);
      else if ((m = resto.match(/^[{}()[\];:,.<>=+\-*/!&|?]+/))) push(m[0], COR.pun);
      else if ((m = resto.match(/^\s+/))) push(m[0], COR.txt);
      else (push(resto[0], COR.txt), (m = [resto[0]]));
    }
    resto = resto.slice(m[0].length);
  }
  return out;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TRECHOS = [
  {
    arquivo: 'Header.tsx',
    lang: 'jsx',
    codigo: `export default function Header() {
  const { hero } = useMessages();

  return (
    <header id="top" className="relative">
      <div className="parallax-bg" />
      <h1 className="sr-only">{hero.h1}</h1>
      <p>{hero.tagline}</p>
    </header>
  );
}`,
  },
  {
    arquivo: 'server.js',
    lang: 'js',
    codigo: `import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

app.post('/api/contato', async (req, res) => {
  const dados = schema.parse(req.body);
  await fila.add('email', dados);
  res.status(202).json({ ok: true });
});

app.listen(3000);`,
  },
  {
    arquivo: 'index.css',
    lang: 'css',
    codigo: `@keyframes parallax-bg {
  from { translate: 0 0; }
  to { translate: 0 25vh; }
}

.rv-up {
  animation-timeline: view();
  animation-range: entry 0 entry 280px;
  color: var(--color-accent);
}`,
  },
  {
    arquivo: 'index.html',
    lang: 'html',
    codigo: `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Saullo Bueno</title>
    <link rel="preload" as="image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>`,
  },
  {
    arquivo: 'useScroll.ts',
    lang: 'js',
    codigo: `export function useScroll(limite = 120) {
  const [passou, setPassou] = useState(false);

  useEffect(() => {
    const onScroll = () => setPassou(scrollY > limite);
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [limite]);

  return passou;
}`,
  },
  {
    arquivo: 'schema.sql',
    lang: 'sql',
    codigo: `CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(80) NOT NULL,
  titulo TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT now()
);

SELECT titulo, COUNT(*) AS acessos
FROM projetos
JOIN visitas ON visitas.projeto_id = projetos.id
GROUP BY titulo ORDER BY acessos DESC LIMIT 10;`,
  },
  {
    arquivo: 'Dockerfile',
    lang: 'sh',
    codigo: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
EXPOSE 3000
CMD ["node", "server.js"]`,
  },
  {
    arquivo: 'package.json',
    lang: 'json',
    codigo: `{
  "name": "saullocom",
  "type": "module",
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "test": "playwright test"
  },
  "engines": { "node": ">=22.12.0" }
}`,
  },
  {
    arquivo: 'types.ts',
    lang: 'js',
    codigo: `export interface Projeto {
  slug: string;
  titulo: string;
  stack: string[];
  imagens: string[];
  destaque?: boolean;
}

type Locale = 'pt' | 'en';

export const idioma = (p: string): Locale =>
  p.startsWith('/en') ? 'en' : 'pt';`,
  },
  {
    arquivo: 'terminal',
    lang: 'sh',
    codigo: `$ git checkout -b feat/fundo-codigo
$ npm run dev
  VITE v8.3.4  ready in 412 ms
  Local: http://localhost:5173/
$ git add . && git commit -m "feat"
$ git push origin feat/fundo-codigo`,
  },
  {
    arquivo: 'Card.tsx',
    lang: 'jsx',
    codigo: `export function Card({ projeto, onOpen }: Props) {
  return (
    <article className="grid gap-6">
      <img src={projeto.capa} alt="" loading="lazy" />
      <h3>{projeto.titulo}</h3>
      <button onClick={() => onOpen(0)}>
        Ver projeto
      </button>
    </article>
  );
}`,
  },
  {
    arquivo: 'fila.js',
    lang: 'js',
    codigo: `import { Queue, Worker } from 'bullmq';

const conexao = { host: 'redis', port: 6379 };
export const fila = new Queue('email', { connection: conexao });

new Worker('email', async (job) => {
  await enviar(job.data);
  return { entregue: true };
}, { connection: conexao, concurrency: 5 });`,
  },
  {
    arquivo: 'tailwind.css',
    lang: 'css',
    codigo: `@theme {
  --color-bg: #1a1a1a;
  --color-accent: #2ba8d6;
  --breakpoint-md: 881px;
}

.nav-bar {
  background-color: rgb(26 26 26 / 0.92);
  backdrop-filter: blur(8px);
}`,
  },
  {
    arquivo: 'app.test.ts',
    lang: 'js',
    codigo: `test('o fundo acompanha a rolagem', async ({ page }) => {
  await page.goto('/');
  await page.mouse.wheel(0, 1200);
  const y = await page.evaluate(() => scrollY);
  expect(y).toBeGreaterThan(1000);
});`,
  },
];

// Painel de IDE (barra de titulo, abas, numeros de linha) ou codigo solto
function painel(trecho, x, y, largura, janela) {
  const linhas = trecho.codigo.split('\n');
  const topo = janela ? 40 : 0;
  const alturaPainel = topo + linhas.length * LINHA + 24;
  const calha = janela ? 44 : 0;
  let svg = '';

  if (janela) {
    svg += `<rect x="${x}" y="${y}" width="${largura}" height="${alturaPainel}" rx="10" fill="#202020" stroke="#2c2c2c"/>`;
    svg += `<path d="M${x} ${y + 40}V${y + 10}a10 10 0 0 1 10-10H${x + largura - 10}a10 10 0 0 1 10 10V${y + 40}Z" fill="#262626"/>`;
    ['#ff6b6b', '#e2a342', '#00b259'].forEach((c, i) => {
      svg += `<circle cx="${x + 20 + i * 18}" cy="${y + 20}" r="5" fill="${c}" opacity="0.8"/>`;
    });
    svg += `<text x="${x + 96}" y="${y + 25}" font-family="${FONTE}" font-size="13" fill="${COR.txt}">${esc(trecho.arquivo)}</text>`;
    svg += `<rect x="${x + 86}" y="${y + 37}" width="${trecho.arquivo.length * 7.8 + 20}" height="2" fill="${COR.fn}"/>`;
  }

  linhas.forEach((linha, i) => {
    const ly = y + topo + 18 + i * LINHA + TAM * 0.8;
    if (janela) {
      svg += `<text x="${x + 30}" y="${ly}" font-family="${FONTE}" font-size="${TAM - 2}" fill="${COR.com}" text-anchor="end">${i + 1}</text>`;
    }
    let cx = x + calha + 14;
    let spans = '';
    for (const { texto, cor } of tokenizar(linha, trecho.lang)) {
      spans += `<tspan fill="${cor}">${esc(texto)}</tspan>`;
      cx += texto.length * CHAR;
    }
    svg += `<text x="${x + calha + 14}" y="${ly}" font-family="${FONTE}" font-size="${TAM}" xml:space="preserve">${spans}</text>`;
  });

  return { svg, altura: alturaPainel };
}

// Tres colunas; cada novo trecho vai para a coluna mais curta
const COLUNAS = 3;
const MARGEM = 40;
const GAP = 36;
const largCol = (W - MARGEM * 2 - GAP * (COLUNAS - 1)) / COLUNAS;
const alturaCol = [0, 1, 2].map((i) => 20 + i * 140 + rnd() * 60);
let corpo = '';
let n = 0;

while (Math.min(...alturaCol) < H - 160) {
  const c = alturaCol.indexOf(Math.min(...alturaCol));
  const trecho = TRECHOS[(n * 5 + Math.floor(n / TRECHOS.length)) % TRECHOS.length];
  const janela = rnd() > 0.28;
  const x = MARGEM + c * (largCol + GAP) + (rnd() - 0.5) * 24;
  const { svg, altura } = painel(trecho, x, alturaCol[c], largCol, janela);
  corpo += svg;
  alturaCol[c] += altura + GAP + rnd() * 50;
  n++;
}

const svgFinal = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <g opacity="${OPACIDADE}">${corpo}</g>
</svg>`;

fs.mkdirSync('src/assets', { recursive: true });
if (process.argv.includes('--svg')) fs.writeFileSync('fundo-codigo.preview.svg', svgFinal);

const info = await sharp(Buffer.from(svgFinal), { density: 72 })
  .avif({ quality: 38, effort: 6 })
  .toFile('src/assets/fundo-codigo.avif');
console.log(
  `src/assets/fundo-codigo.avif gerada: ${W}x${H}, ${Math.round(info.size / 1024)} KB, ${n} trechos`,
);
