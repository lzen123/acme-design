# acme-design

基于 React 和 TypeScript 的组件库 monorepo，使用 pnpm workspaces 管理包，并通过 Turborepo 执行开发、构建和检查任务。仓库包含可复用的 UI、设计令牌、Hooks 和工具包，以及用于预览组件的 Storybook 和示例应用。

## 项目结构

```text
.
├── apps/
│   └── web/          # Vite + React 示例与组件测试应用
├── packages/
│   ├── hooks/        # React Hooks
│   ├── tokens/       # 设计令牌
│   ├── ui/           # UI 组件（当前包含 Button）
│   └── utils/        # 通用工具
└── .storybook/       # Storybook 配置
```

各 package 位于 `packages/*`，应用位于 `apps/*`，由根目录的 `pnpm-workspace.yaml` 纳入 workspace。

## 环境要求

- Node.js（建议使用当前 LTS 版本）
- pnpm 9（仓库使用 pnpm 9.15.0）

## 安装

在仓库根目录执行：

```bash
pnpm install
```

## 开发

启动示例应用：

```bash
pnpm --filter web dev
```

Vite 默认在 [http://localhost:5173](http://localhost:5173) 启动。

启动所有 workspace 中声明的开发任务：

```bash
pnpm dev
```

启动 Storybook：

```bash
pnpm storybook
```

Storybook 默认运行在 [http://localhost:6006](http://localhost:6006)。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm build` | 使用 Turborepo 构建 workspace 包和应用 |
| `pnpm lint` | 运行 workspace 的 ESLint 检查 |
| `pnpm test` | 运行 workspace 中配置的测试 |
| `pnpm storybook` | 启动 Storybook 开发服务器 |
| `pnpm build-storybook` | 构建静态 Storybook |
| `pnpm clean` | 执行 workspace 的清理任务 |

针对单个 package 执行任务时，可使用过滤器，例如：

```bash
pnpm --filter @acme/ui build
pnpm --filter @acme/ui test
```

## 使用 UI 组件

仓库内的应用可通过 workspace 依赖使用组件包。例如，在 `apps/web` 中：

```tsx
import { Button } from '@acme/ui';
import '@acme/ui/style.css';

export function Example() {
  return <Button variant="primary">确认</Button>;
}
```

`Button` 当前支持 `primary`、`secondary`、`danger` 和 `ghost` 变体，以及 `sm`、`md` 和 `lg` 尺寸。

## 发布

仓库配置了 Changesets，可使用以下命令管理版本变更和发布：

```bash
pnpm changeset
pnpm version
pnpm publish
```
