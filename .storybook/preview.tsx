import { withThemeByClassName } from '@storybook/addon-themes';

import type { Preview } from '@storybook/react';
import '../packages/ui/src/styles/tokens.css';

const isProduction = process.env.NODE_ENV === 'production';
const preview: Preview = {
  parameters: {
    controls: isProduction
      ? { disable: isProduction }
      : {
          matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
          },
        },
    // ===== 全局：隐藏右侧整个调试面板 =====
    options: {
      showPanel: !isProduction, // 生产构建不显示右侧面板
      bottomPanelHeight: 0,
    },

    // ===== 逐个禁用调试类 addon =====
    actions: { disable: isProduction }, // 隐藏 Actions 面板
    viewport: { disable: isProduction }, // 隐藏 viewport 工具栏
    backgrounds: { disable: isProduction }, // 隐藏背景色切换
    measure: { disable: isProduction }, // 隐藏测量工具
    outline: { disable: isProduction }, // 隐藏轮廓工具

    // ===== 文档页配置 =====
    docs: {
      toc: true, // 右侧显示目录（长文档有用）
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '', // 浅色 = 不加 class（用 :root 默认值）
        dark: 'dark', // 深色 = 给 <html> 加 class="dark"
      },
      defaultTheme: 'light',
    }),
  ],
};
export default preview;
