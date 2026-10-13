import { useEffect } from 'react';

const HOSTS_LOCAIS = new Set(['localhost', '127.0.0.1', '[::1]']);

// Vercel Web Analytics (sem cookies). Carregado sob demanda e apenas fora de localhost:
// em desenvolvimento e nos testes o script /_vercel/insights nao existe.
// O script e os endpoints sao da mesma origem, entao a CSP ('self') nao precisa mudar.
export default function WebAnalytics() {
  useEffect(() => {
    if (HOSTS_LOCAIS.has(window.location.hostname)) return;

    let cancelado = false;
    import('@vercel/analytics').then(({ inject }) => {
      if (!cancelado) inject({ mode: 'production' });
    });
    return () => {
      cancelado = true;
    };
  }, []);

  return null;
}
