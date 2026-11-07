import type { StorybookConfig } from '@storybook/react-vite';
const isProduction = process.env.NODE_ENV === 'production';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // 开发时才加载调试类 addon，生产文档站不加载
    ...(isProduction ? [] : ['@storybook/addon-interactions']),
    // themes 如果你装了的话
    ...(isProduction ? [] : ['@storybook/addon-themes']),
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // ===== 静态站构建优化 =====
  typescript: {
    check: false, // 构建时不做 TS 类型检查，加快速度
  },
  docs: {
    autodocs: true, // 自动为每个组件生成 Docs 页
  },
};
export default config;
