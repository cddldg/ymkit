# 一秒工具 (ymkit.cn) 网站设计文档

## 概述

基于 astro-theme-sify 模板构建的工具/资源导航网站，展示插件、工具、AI 三类内容，所有内容以 Markdown 文档形式管理。

## 技术栈

| 项目 | 选择 |
|------|------|
| 框架 | Astro 6 + Tailwind CSS v4 |
| 模板 | [astro-theme-sify](https://github.com/santisify/astro-theme-sify) |
| 部署 | GitHub Pages + Cloudflare CDN/DNS 代理 |
| 媒体存储 | 腾讯 COS (ap-chengdu) |
| 评论系统 | Waline |
| 域名 | www.ymkit.cn |

## 站点信息

```typescript
// src/consts.ts
export const SITE_TITLE = '一秒工具';
export const SITE_DESCRIPTION = '分享实用插件、工具和 AI 资源';
export const SITE_URL = 'https://www.ymkit.cn';
export const SITE_AVATAR = 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.png';
export const SITE_COVER = 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.png';

export const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '插件', href: '/plugins' },
  { label: '工具', href: '/tools' },
  { label: 'AI', href: '/ai' },
  { label: '归档', href: '/archives' },
];
```

Favicon 使用 `https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.ico`，放到 `public/` 目录。

## 页面结构

### 首页 `/`

- Hero 区域：展示站点名称、简介、Logo
- 分类快捷入口：插件、工具、AI 三个卡片，点击跳转对应分类页
- 最新内容列表：展示最近发布的文章卡片（混合所有分类）
- 侧边栏：标签云、分类导航

### 分类列表页

- `/plugins` — 插件列表
- `/tools` — 工具列表
- `/ai` — AI 资源列表

每个列表页：
- 信息卡片网格布局（封面图 + 标题 + 简介 + 标签）
- 每行 2-3 个卡片
- 右侧侧边栏（标签筛选、搜索）

### 详情页

- `/plugins/[slug]`
- `/tools/[slug]`
- `/ai/[slug]`

详情页布局：
- 左侧主内容区（Markdown 渲染）
- 右侧侧边栏（文章目录、标签）
- 底部 Waline 评论区

### 归档页 `/archives`

- 聚合 plugins、tools、ai 三个集合的全部内容
- 按发布时间倒序排列
- 复用模板原有归档样式和 PostList 组件

## 内容集合

三个独立的 Astro 内容集合：

```
src/content/
├── plugins/     # 插件文档
│   ├── example-plugin/
│   │   └── index.md
│   └── another-plugin.md
├── tools/       # 工具文档
│   └── ...
└── ai/          # AI 文档
    └── ...
```

### Frontmatter Schema

三个集合共享相同的 schema 定义：

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pluginCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/plugins' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().default(() => new Date()),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const toolCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().default(() => new Date()),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const aiCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ai' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().default(() => new Date()),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  plugins: pluginCollection,
  tools: toolCollection,
  ai: aiCollection,
};
```

### Frontmatter 示例

```yaml
---
title: VS Code 插件推荐
description: 提升开发效率的 VS Code 必装插件
date: 2026-05-31
tags: [VS Code, 效率, 开发工具]
cover: https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/vscode-plugins.webp
pinned: false
draft: false
---
```

## 保留/移除功能

### 保留

- 归档页（聚合三个集合内容）
- Waline 评论
- 全站搜索 (Ctrl+K)
- RSS 订阅
- 暗色/亮色模式切换
- SEO 优化（Open Graph、Twitter Card、Canonical URL）
- 侧边栏（标签云、分类导航）

### 移除

- 原 blog 集合 (`src/content/blog/`) — 替换为三个独立集合
- 周刊功能 (`src/content/weekly/`、`/weekly` 路由)
- 友链页面 (`/friends`、`public/links.json`)
- categories 路由（用独立集合替代）

### 搜索与 RSS

- 全站搜索 (Ctrl+K) 需聚合三个集合的内容建立索引
- RSS 订阅同样聚合三个集合

## 主题风格

保持模板默认配置：
- 主色调：粉色 (#e9536a)
- 亮色/暗色双模式
- 响应式设计（桌面双栏 + 移动端抽屉侧边栏）

## 部署方案

### GitHub Pages

1. 代码推送到 GitHub 仓库
2. GitHub Actions 自动构建：`bun run build`
3. 构建产物部署到 GitHub Pages
4. CNAME 文件指向 `www.ymkit.cn`

### Cloudflare 配置

1. DNS 记录：`www` CNAME 指向 GitHub Pages 地址
2. 开启 Cloudflare 代理（橙色云朵）
3. SSL/TLS 模式：Full (strict)
4. 开启 Always Use HTTPS

### 媒体资源

图片等媒体资源存储在腾讯 COS：
- Bucket: ymkit-1307887579
- Region: ap-chengdu
- 访问域名：`https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com`

文章中的图片直接使用 COS 完整 URL。

## 目录结构

```
ymkit/
├── public/
│   ├── favicon.ico          # 来自 COS
│   └── ...
├── src/
│   ├── components/          # Astro 组件
│   │   ├── Hero.astro       # 修改为站点 Hero
│   │   ├── PostCard.astro   # 信息卡片（复用）
│   │   └── ...
│   ├── content/
│   │   ├── plugins/         # 插件集合
│   │   ├── tools/           # 工具集合
│   │   └── ai/              # AI 集合
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro      # 首页
│   │   ├── plugins/
│   │   │   ├── index.astro  # 插件列表
│   │   │   └── [slug].astro # 插件详情
│   │   ├── tools/
│   │   │   ├── index.astro  # 工具列表
│   │   │   └── [slug].astro # 工具详情
│   │   ├── ai/
│   │   │   ├── index.astro  # AI 列表
│   │   │   └── [slug].astro # AI 详情
│   │   ├── archives/
│   │   └── ...
│   ├── styles/
│   └── consts.ts
├── astro.config.ts
├── CNAME
└── package.json
```
