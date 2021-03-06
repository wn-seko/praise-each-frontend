import { resolve } from 'path';

import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import reactJsx from 'vite-react-jsx';

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
    outDir: resolve(__dirname, 'build'),
    rollupOptions: {
      plugins: [
        getEnv(mode).ANALYZE === 1 &&
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
