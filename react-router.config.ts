import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  // Sem servidor em runtime: o HTML de "/" e gerado no build (SSG) e hidratado no cliente.
  ssr: false,
  prerender: ['/'],
} satisfies Config;
