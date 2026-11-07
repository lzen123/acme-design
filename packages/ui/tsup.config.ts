import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

/**
 * packages/ui 的 tsup 构建配置
 *
 * 定位：React 组件库（不是普通 JS SDK），核心差异在于
 *   1. react / react-dom 必须 external，绝不打进产物
 *   2. 输出 ESM + CJS 双格式，不产出 iife 全量包
 *   3. 需要生成合并后的 .d.ts 类型声明
 *   4. 需要处理 CSS Modules / 组件样式
 *   5. 区分 development / production 两套产物
 */

const ENTRIES = {
  index: 'src/index.ts',
  button: 'src/components/button/index.ts',
};

/** 组件库必须排除的 peer 依赖 */
const EXTERNALS = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  // 子路径写法也要单独列出，否则 esbuild 仍可能把它们打进去
  'react/jsx-dev-runtime',
];

export default defineConfig(options => {
  const isDev = !!options.watch;
  const nodeEnv = isDev ? 'development' : 'production';

  return {
    // 入口
    entry: ENTRIES,
    // 组件库只用 esm + cjs，不要 iife
    format: ['esm', 'cjs'],
    // 类型声明：走 Rollup 方案，生成合并的 index.d.ts
    dts: {
      compilerOptions: {
        composite: false,
      },
    },
    sourcemap: true,
    clean: true,
    // 关键：React 相关全部外部化
    external: EXTERNALS,
    // 组件库目标环境
    target: 'es2020',
    // Sass 编译后由 esbuild 输出 CSS 文件；CSS Modules 同时生成类名映射。
    esbuildPlugins: [
      sassPlugin({ filter: /\.module\.scss$/, type: 'local-css' }),
      sassPlugin({ filter: /\.scss$/, type: 'css' }),
    ],
    minify: nodeEnv === 'production',
    // 环境变量注入，消费端可据此走 dev/prod 分支
    env: {
      NODE_ENV: nodeEnv,
    },
    // 注入 banner（可选，方便排查版本）
    // banner: { js: '/* packages/ui */' },
    treeshake: true,
    // 构建成功后的提示
    onSuccess: async () => {
      console.log(`[ui] build 完成，环境: ${nodeEnv}`);
    },
  };
});
