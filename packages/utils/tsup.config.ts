import { defineConfig } from 'tsup';
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs', 'iife'],
  dts: {
    compilerOptions: {
      composite: false,
    },
  },
  globalName: 'AcmeUtils',
  shims: false,
  target: 'es2020',
  outDir: 'dist',
  clean: true,
  sourcemap: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  // 拆分配置
  splitting: false,
  bundle: true, //打包成单文件 SDK（适合工具 sdk）；
});
