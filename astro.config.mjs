import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://maurmaket.netlify.app',
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ht'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
