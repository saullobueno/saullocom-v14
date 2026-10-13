import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  // axe e o scroll completo da pagina sao pesados quando varios Chrome rodam em paralelo
  timeout: 60_000,
  workers: 2,
  use: {
    baseURL: 'http://localhost:4173',
    channel: 'chrome',
    reducedMotion: 'reduce',
    // dominio ficticio para simular um host que nao e localhost (ver tests/analytics.spec.ts)
    launchOptions: { args: ['--host-resolver-rules=MAP producao.test localhost'] },
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
