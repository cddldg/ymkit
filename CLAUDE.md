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

每篇文章为目录形式：`集合名/文章名/index.md`。Frontmatter 字段：`title`、`description`、`date`、`updated`、`tags[]`、`cover`（腾讯 COS 远程 URL）、`pinned`、`draft`。

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

## 路由映射

```typescript
const routeMap = { plugins: '/plugins/', tools: '/tools/', ai: '/ai/' };
```

## 媒体资源

所有图片存储在腾讯 COS：`https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/`

`src/pages/_imageStore.ts` 处理 Markdown 相对路径图片的解析，远程 COS URL 直接透传。

## 部署

通过 `.github/workflows/deploy.yml` 部署到 GitHub Pages。CNAME：`www.ymkit.cn`，Cloudflare DNS 代理。

## 约定

- `draft: true` 的文章不出现在列表和 RSS 中
- `pinned: true` 的文章置顶显示
- 封面图使用 COS URL，不使用本地文件
