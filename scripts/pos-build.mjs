// Pos-build:
//  1) CSP por hash: os scripts inline (o do palco e os que o React Router gera para a hidratacao)
//     mudam a cada build, entao o hash de cada um vai numa <meta> CSP no proprio HTML. O navegador
//     aplica essa politica junto com a do cabecalho (vercel.json): inline sem hash nao roda, mesmo
//     com o 'unsafe-inline' que o cabecalho ainda tem como base.
//  2) A Vercel serve /404.html com status 404 para qualquer caminho sem arquivo. Reaproveitamos o
//     fallback de SPA gerado pelo React Router: ele hidrata e a rota coringa renderiza a pagina 404
//     (o status HTTP correto evita "soft 404" para os buscadores).
import { createHash } from 'node:crypto';
import { copyFileSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const PASTA = 'build/client';

const htmls = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'assets' ? [] : htmls(p);
    return e.name.endsWith('.html') ? [p] : [];
  });

const sha256 = (texto) => `'sha256-${createHash('sha256').update(texto).digest('base64')}'`;

for (const arquivo of htmls(PASTA)) {
  const html = readFileSync(arquivo, 'utf8');
  if (html.includes('http-equiv="Content-Security-Policy"')) continue;
  // scripts inline executaveis (sem src; JSON-LD e dado, nao roda)
  const hashes = [...html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .filter(([, attrs = '']) => !/\ssrc=/.test(attrs) && !/application\/ld\+json/.test(attrs))
    .map(([, , corpo]) => sha256(corpo));
  const meta = `<meta http-equiv="Content-Security-Policy" content="script-src 'self' ${[...new Set(hashes)].join(' ')}"/>`;
  writeFileSync(arquivo, html.replace('<head>', `<head>${meta}`));
  console.log(`${arquivo}: CSP com ${hashes.length} hash(es)`);
}

copyFileSync(`${PASTA}/__spa-fallback.html`, `${PASTA}/404.html`);
console.log(`${PASTA}/404.html criado`);
