import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactJsx from 'vite-react-jsx';
import { visualizer } from 'rollup-plugin-visualizer';

import { getEnv } from './env';

export default defineConfig(({ mode }) => ({
  plugins: [reactJsx()],
  root: resolve(__dirname, 'src'),
  envDir: __dirname,
  resolve: {
    alias: [
      {
        find: /^~\/(.*)/,
        replacement: resolve(__dirname, 'src/$1'),
      },
    ],
  },
  define: {
    API_HOST: `"${getEnv(mode).API_HOST}"`,
  },
  build: {
    outDir: __dirname,
    assetsDir: 'dist',
    rollupOptions: {
      plugins: [
        mode === 'analyze' &&
          visualizer({
            open: true,
            filename: 'articles/stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
      ],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
}));
