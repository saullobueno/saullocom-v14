import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  // axe e o scroll completo da pagina sao pesados quando varios navegadores rodam em paralelo
  timeout: 60_000,
  workers: 2,
  // uma nova tentativa so no CI: o Firefox sem GPU as vezes falha ao desenhar (RenderCompositorSWGL)
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://localhost:4173',
    reducedMotion: 'reduce',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        // dominio ficticio para simular um host que nao e localhost (ver tests/analytics.spec.ts)
        launchOptions: { args: ['--host-resolver-rules=MAP producao.test localhost'] },
      },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
      // roda depois do Chrome, e nao junto: os dois navegadores competindo pelo processador deixavam
      // os testes de tempo (gestos da roda) e o Firefox sem GPU instaveis. Sozinho: --no-deps.
      dependencies: ['chrome'],
      // a regra de DNS acima e do Chromium; o resto da suite roda igual nos dois
      testIgnore: /analytics\.spec\.ts/,
    },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
