import babel from '@rolldown/plugin-babel';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    // React Compiler: memoizacao automatica em build (dispensa useMemo/useCallback/memo manuais)
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    // usa os "paths" do tsconfig (alias "@/")
    tsconfigPaths: true,
  },
});
