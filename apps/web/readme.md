# 最简业务测试项目 apps/web（复制即用）

---

## 三、前置检查（必做，否则跑不起来）

### 检查 1：`pnpm-workspace.yaml` 包含 apps

确认根目录 `pnpm-workspace.yaml` 长这样：

```
packages:
  - 'packages/*'
  - 'apps/*'      # ← 必须有这行，没有就加上
```

### 检查 2：`@acme/ui/package.json` 的 exports 字段

确认 `packages/ui/package.json` 里有 exports，且 CSS 路径暴露出来：

```
{
  "name": "@acme/ui",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./dist/style.css": "./dist/index.css",
    "./style.css": "./dist/index.css"
  },
  "files": ["dist"]
}
```

> 如果没有 `exports` 里的 CSS 那行，`import '@acme/ui/dist/style.css'` 会报错。

### 检查 3：先 build 一次 @acme/ui

业务项目引用的是 `dist/` 产物，所以必须先打包：

```
pnpm exec turbo run build --filter=@acme/ui
```

---

## 四、安装 & 启动

在 **Monorepo 根目录** 执行：

```
# 1. 安装 web 项目的依赖（会自动 link @acme/ui 和 @acme/tokens）
pnpm install

# 2. 启动 web 开发服务器
pnpm --filter web dev
```

浏览器自动打开 [http://localhost:5173](http://localhost:5173) ，你会看到：

```
@acme/ui 组件测试台
├── 按钮变体：4 个颜色的按钮
├── 尺寸：小/中/大
├── 状态：禁用 + loading
└── 交互测试：点按钮 +1，loading 1 秒
```

---

## 五、日常开发循环

```
改 packages/ui/src/components/button/button.tsx 或 .scss
        ↓
在 packages/ui 目录重新 build（或根目录）
  pnpm exec turbo run build --filter=@acme/ui
        ↓
apps/web 页面自动热更新（Vite 检测到 dist 变化）
        ↓
浏览器看效果
```

> 嫌每次手动 build 麻烦？可以在 `packages/ui` 加个 watch 脚本：
>
> ```
> "scripts": {
>   "build:watch": "tsup --watch"
> }
> ```
>
> 然后开两个终端：一个跑 `pnpm --filter ui build:watch`，一个跑 `pnpm --filter web dev`。

---

## 六、验证清单

| 验证项     | 预期结果                                                        |
| ---------- | --------------------------------------------------------------- |
| 页面能打开 | [http://localhost:5173](http://localhost:5173) 显示标题和按钮   |
| 按钮有样式 | Primary 是蓝色背景，不是默认灰色                                |
| 类名隔离   | DevTools 看 button class 是 `button_button__xxx` 哈希           |
| 交互正常   | 点"点我 +1"按钮变 loading，1 秒后次数 +1                        |
| 类型提示   | 在 App.tsx 里写 `<Button variant="` 时，IDE 能自动补全 4 个选项 |

---

需要我接着加哪个？

- **Turbo 集成**：让 `turbo run dev` 一键同时起 Storybook + web
- **watch 模式**：组件改完自动 rebuild，web 自动热更（不用手动 build）
- **加第二个组件（Input / Card）到测试台**
