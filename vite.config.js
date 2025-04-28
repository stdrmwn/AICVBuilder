import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    assetsInclude: ['**/*.xlsx', '**/*.JPG', '**/*.jpg'],
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/chat': {
          target: env.VITE_CHAT_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/chat/, ''),
        },
        '/find': {
          target: env.VITE_FIND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/find/, ''),
        },
        '/jobRec': {
          target: env.VITE_JOBREC_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/jobRec/, ''),
        },
        '/jobList': {
          target: env.VITE_JOBLIST_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/jobList/, ''),
        },
        '/culture': {
          target: env.VITE_CULTURE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/culture/, ''),
        },
      },
    },
  }
})
