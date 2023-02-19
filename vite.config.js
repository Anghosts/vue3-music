import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      })
    ],
    hmr: true,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: true,
    }
  }
});