// Pos-build: a Vercel serve /404.html com status 404 para qualquer caminho sem arquivo.
// Reaproveitamos o fallback de SPA gerado pelo React Router: ele hidrata e a rota coringa
// renderiza a pagina 404 (o status HTTP correto evita "soft 404" para os buscadores).
import { copyFileSync } from 'node:fs';

copyFileSync('build/client/__spa-fallback.html', 'build/client/404.html');
console.log('build/client/404.html criado');
