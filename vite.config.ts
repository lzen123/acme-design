import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const devMode = process.env.NODE_ENV !== 'production';

export default defineConfig({
  // plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // 每个 .scss 文件自动注入这段，不用手动 @use
        // 路径相对于 vite.config.ts 所在目录
        // additionalData: `@use "./packages/ui/src/styles/mixin" as *;\n`,
      },
    },
    modules: {
      // ① 类名风格：camelCase，让 styles['btn-primary'] 能写成 styles.btnPrimary
      localsConvention: 'camelCase',

      // ② 自定义类名格式
      generateScopedName: devMode
        ? '[name]__[local]' // 开发：Button__btn，完全可读
        : 'ui-[name]-[local]___[hash:base64:5]', // 生产：ui-Button-btn___a1b2C
    },
  },
});
