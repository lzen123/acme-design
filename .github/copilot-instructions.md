# 仓库指南

## 语言

请使用中文回复。

## 构建、测试与代码检查

以下命令均在仓库根目录使用 pnpm 9 运行：

- `pnpm dev` 通过 Turbo 启动各工作区的开发脚本。
- `pnpm build` 按依赖顺序构建工作区包；使用 `pnpm exec turbo run build --filter=@acme/ui` 构建 UI 包及其工作区依赖。
- `pnpm lint` 通过 Turbo 运行各包的代码检查脚本。
- `pnpm test` 通过 Turbo 运行各包的 Vitest 测试套件。
- 按名称运行单个测试：`pnpm --filter @acme/ui exec vitest run src/components/button/button.test.tsx -t "test name"`；请将路径和测试名称替换为目标测试。
- `pnpm --filter web build` 对 Web 应用执行 TypeScript 检查并进行 Vite 生产构建。
- `pnpm storybook` 在 6006 端口启动 Storybook；`pnpm build-storybook` 构建 Storybook。

## 架构

本仓库使用 pnpm workspace 管理多个包，并由 Turborepo 编排任务。`packages/ui` 是 React 组件库；`packages/tokens`、`packages/utils` 和 `packages/hooks` 分别提供设计令牌、共享工具函数和 React Hooks。`apps/web` 是基于 Vite 的使用示例。UI 包依赖其他共享包；Turbo 中的 `^build` 依赖配置会确保先构建依赖包。

各包使用 tsup 输出 ESM、CommonJS 和 TypeScript 类型声明。UI 包还会打包 Sass 和 CSS Modules；React 和 React DOM 作为外部 peer 依赖保留。UI 包的公开入口定义在 `packages/ui/package.json`，构建入口定义在 `packages/ui/tsup.config.ts`。

Web 应用在 Vite 开发模式下将 `@acme/ui` 和 `@acme/tokens` 别名指向源码，以便快速反馈；生产构建则使用包导出配置和构建产物。修改 UI 包入口或样式时，需确保源码导出、tsup 构建入口、`package.json` 导出配置及 CSS 产物路径保持一致。

Storybook 会扫描 `packages/` 下的 `*.stories.tsx` 文件；预览配置会导入 UI 令牌样式表，并提供浅色和深色主题类。Web 应用是独立的使用方，通过 `@acme/ui/style.css` 导入 UI 样式表。

## 仓库约定

- 新增组件时，需在组件目录的 `index.ts` 和 UI 包入口中导出。若组件需要独立的包子路径，还需同时更新 tsup 构建入口和 `packages/ui/package.json` 的导出配置。
- 共享设计令牌分别位于 `packages/ui/src/styles/tokens.css`（CSS 自定义属性）和 `packages/tokens`（TypeScript 颜色值）；根据改动涉及的使用场景更新相应定义。
- `src/` 下的 TypeScript 源码遵循 `.github/instructions/file_rules.instructions.md`。ESLint 会检查仅类型导入和 Prettier 格式，导入顺序也受 lint 规则约束。
- 使用 Changesets 管理包版本：通过 `pnpm changeset` 记录变更，再使用 `pnpm version` 更新版本，最后使用 `pnpm publish` 发布。
