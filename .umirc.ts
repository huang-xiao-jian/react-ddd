import { defineConfig } from 'umi';

export default defineConfig({
  npmClient: 'pnpm',
  extraBabelPlugins: ['babel-plugin-transform-typescript-metadata'],
});
