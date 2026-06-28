// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  server: { port: 4200 },
  vite: {
    plugins: [tailwindcss()],
  },
});
