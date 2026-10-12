import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    channel: 'chrome',
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
