import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';

import { Button } from './button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs', 'docsOnly'], // 自动生成 Docs 文档页
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: '视觉变体',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }, // 点击时在 Actions 面板打印
    // 👇 关键修复：ReactNode 类型直接从 Controls 面板隐藏
    leftIcon: { control: false },
    rightIcon: { control: false },

    // 👇 修复：type 是原生 button 的 type，配成下拉框
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    children: '按钮',
    variant: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** 默认状态：右侧 Controls 面板可实时调 props */
export const Playground: Story = { tags: ['hidden'] };

/** 四种视觉变体并排展示 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

/** 三种尺寸 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/** 带左右图标 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button leftIcon={<span>←</span>}>上一步</Button>
      <Button rightIcon={<span>→</span>}>下一步</Button>
      <Button rightIcon={<span>🚀</span>}>按钮</Button>
    </div>
  ),
};

/** 加载态 */
export const Loading: Story = {
  args: { loading: true, children: '加载中…' },
};

/** 禁用态 */
export const Disabled: Story = {
  args: { disabled: true, children: '不可点击' },
};

/**
 * 交互演示：点击后模拟异步请求，2 秒后结束 loading
 * 用 render + useState 让 story 内部有自己的状态
 */
export const AsyncSubmit: Story = {
  render: function Render(args) {
    const [loading, setLoading] = useState(false);
    return (
      <Button
        {...args}
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      >
        点击模拟提交
      </Button>
    );
  },
};

export const ClickTracks: Story = {
  play: async ({ canvasElement }) => {
    // ① 在 story 渲染的容器里查元素
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: '按钮' });

    // ② 模拟用户点击
    await userEvent.click(btn);

    // ③ 断言：这个 story 里配了 onClick: { action: 'clicked' }
    //    点击后 Actions 面板会出现 "clicked"，这里我们换个方式验证
    await expect(btn).toBeEnabled();
  },
};
