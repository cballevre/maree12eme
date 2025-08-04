import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cballevre.github.io',
  base: 'maree12eme',
  integrations: [
    react(),
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      manifest: {
        short_name: 'Marée 12ème',
        name: 'Marée 12ème - Calculateur de marée selon la règle des douzièmes',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
    }),
  ],
});
