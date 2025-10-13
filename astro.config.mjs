import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://freiredev.com', // Cambia esto a tu dominio
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
      // Shiki detecta automáticamente el lenguaje y aplica colores específicos
      // Soporta: typescript, javascript, python, rust, go, java, c++, bash, etc.
    }
  }
});
