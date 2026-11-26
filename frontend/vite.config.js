import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Endereço do backend usado pelo proxy em desenvolvimento e no "npm start".
const apiTarget = process.env.VITE_DEV_API_TARGET || 'http://localhost:3001';

/*
 * Injeta no index.html as metatags que precisam do endereço público do site
 * (canonical, og:url, og:image). A URL vem de VITE_SITE_URL ou, na Vercel,
 * do domínio de produção do projeto. Sem uma URL pública válida (ex.: localhost
 * ou variável ausente) as tags são simplesmente omitidas e o build NÃO falha.
 */
function seoTags(mode) {
  return {
    name: 'aka-seo-tags',
    transformIndexHtml() {
      const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env };
      const vercelUrl = env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '';
      const base = (env.VITE_SITE_URL || vercelUrl || '').trim().replace(/\/+$/, '');

      if (!/^https?:\/\//.test(base) || /localhost|127\.0\.0\.1/.test(base)) return [];

      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${base}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${base}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: `${base}/logo-aka-completa.png` }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
      ];
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), seoTags(mode)],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
    },
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
    },
  },
}));
