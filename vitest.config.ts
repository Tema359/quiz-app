import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import vue from '@vitejs/plugin-vue';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [],
    test: {
      environment: 'jsdom',
      globals: true,
    },
  })
);
