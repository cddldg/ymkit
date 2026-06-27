# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

| 命令 | 说明 |
|------|------|
| `bun dev` | 启动开发服务器 http://localhost:4321 |
| `bun run build` | 构建静态站点到 `dist/` |
| `bun preview` | 预览生产构建 |

## 项目概述

**ymkit.cn** — 工具/资源导航网站，基于 Astro 6 + Tailwind CSS v4，模板源自 [astro-theme-sify](https://github.com/santisify/astro-theme-sify)。

## 编码规范

- **遵循 Astro 编程规范**：使用 Astro 组件模式（`.astro` 文件），合理使用 Islands Architecture，避免不必要的客户端 JavaScript
- **插件化设计**：所有功能以组件/插件方式编写，确保可扩展、可复用。新增功能优先创建独立组件，而非修改现有组件
- **单一职责**：每个组件只做一件事，通过 Props 接口组合使用
- **内容使用中文**：页面文案、注释、提交信息均使用中文

## 内容集合

三个独立集合，共享 `postSchema`（定义在 `src/content.config.ts`）：

- `src/content/plugins/` — 浏览器插件、VS Code 扩展
- `src/content/tools/` — 在线工具、桌面应用
- `src/content/ai/` — AI 工具、模型、提示词

每篇文章为目录形式：`集合名/文章名/index.md`。Frontmatter 字段：`title`、`description`、`date`、`updated`、`tags[]`、`cover`（CDN 远程 URL）、`pinned`、`draft`。

## 布局结构

- `BaseLayout.astro` — HTML 外壳、Header、Footer、SEO
- `BlogLayout.astro` — 继承 BaseLayout，左侧边栏 + 移动端抽屉
- `PostLayout.astro` — 继承 BaseLayout，左侧边栏 + 右侧目录 + 文章卡片背景

## 页面路由

- `/` — Hero + 分类卡片 + 最新内容
- `/plugins`、`/tools`、`/ai` — 集合列表页
- `/plugins/[slug]`、`/tools/[slug]`、`/ai/[slug]` — 详情页
- `/archives` — 全部文章归档
- `/tags`、`/tags/[tag]` — 标签页
- `/rss.xml` — RSS 订阅
- `/search-index.json` — 搜索索引

## 关键组件

- `Sidebar.astro` — 作者信息、标签云、随机推荐；聚合三个集合
- `Hero.astro` — 首页 Hero 区域，接受 `collections` prop
- `PostCard.astro` — 内容卡片，通过 `collection` + `routePrefixMap` 支持多集合路由
- `PostList.astro` — 卡片网格，支持置顶
- `CategoryCards.astro` — 三分类导航卡片
- `DonationModal.astro` — 打赏弹窗（微信/支付宝），仅在 Footer 渲染一次

## 在线工具

`/online` 板块承载可直接使用的交互式 Web 工具（非文章推荐）。架构：

- `src/data/online.ts` — 工具注册表，每个工具一条记录（slug、title、description）
- `src/data/online/{slug}.html` — 工具 HTML 源文件（去壳的纯内容，不含 `<html>`/`<head>`/`<body>` 标签）
- `src/pages/online/[slug].astro` — 动态路由，用 Vite `?raw` + `set:html` 渲染工具 HTML
- `src/pages/online/index.astro` — 工具列表页，复用 `BlogLayout` + 侧边栏

### 添加新在线工具

1. **准备 HTML 文件**：自包含的工具页面，CDN 引用保留（Tailwind、marked 等）

2. **去壳**：删除外层 `<html>`、`<head>`、`<body>` 标签，只保留内部内容（`<style>`、`<script>`、DOM）

3. **去除 Firebase/云端依赖**：删除 Firebase CDN 脚本和业务代码（`initFirebase`、`queueSave`、`loadSavedConfig` 等），改为纯本地功能

4. **注册**：在 `src/data/online.ts` 的 `onlineTools` 数组中加一条记录

5. **HTML 放入**：`src/data/online/{slug}.html`

6. **wrapper 布局适配**：`[slug].astro` 中 `wrapperClass` 按 slug 区分：
   - 默认 `h-screen overflow-hidden`（全屏工具）
   - gzh 特殊 `min-h-screen flex lg:flex-row`（两栏布局）
   - 新工具如需特殊布局，在 `wrapperClass` 三元表达式中加条件

7. **构建验证**：`bun run build`，确认 `dist/online/{slug}.html` 生成

### 打赏集成

所有在线工具页面自动包含 `DonationModal` + 打赏 CSS（通过 `[slug].astro`）。各工具自行决定按钮位置和打开方式：

- **按钮**：在工具 HTML 内添加调用 `window.openDonation()` 的按钮
- **防锁滚动**：工具初始化时包装 `openDonation`，重置 `body.style.overflow = ''`
- **默认打开**：若需页面加载后自动显示打赏面板，`setTimeout(() => openDonation(), 800)`

```js
// 标准打赏包装模板
var _timer = setInterval(function() {
    if (typeof window.openDonation === 'function') {
        clearInterval(_timer);
        var _orig = window.openDonation;
        window.openDonation = function() {
            _orig();
            document.body.style.overflow = '';
        };
        // 如需默认打开，取消注释：
        // setTimeout(function() { openDonation(); }, 800);
    }
}, 200);
```

## 路由映射

```typescript
const routeMap = { plugins: '/plugins/', tools: '/tools/', ai: '/ai/' };
```

## 媒体资源

所有图片使用 CDN：`https://cdn.jsdmirror.cn/`，Logo 头像见 `src/consts.ts` 中的 `SITE_AVATAR`、`SITE_COVER`。

`src/pages/_imageStore.ts` 处理 Markdown 相对路径图片的解析，远程 CDN URL 直接透传。

## 部署

通过 `.github/workflows/deploy.yml` 部署到 GitHub Pages。CNAME：`www.ymkit.cn`，Cloudflare DNS 代理。

## 约定

- `draft: true` 的文章不出现在列表和 RSS 中
- `pinned: true` 的文章置顶显示
- 封面图使用 CDN URL，不使用本地文件
