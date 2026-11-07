import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react()],
    root: '.',
    resolve: isDev
      ? {
          alias: {
            '@acme/ui/style.css': path.resolve(__dirname, '../../packages/ui/src/styles/empty.css'),
            // 开发时直接指向 ui 包源码，改了热更新
            '@acme/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
            '@acme/tokens': path.resolve(__dirname, '../../packages/tokens/src/index.ts'),
          },
        }
      : undefined,

    server: {
      port: 5173,
      open: true,
    },
  };
});
