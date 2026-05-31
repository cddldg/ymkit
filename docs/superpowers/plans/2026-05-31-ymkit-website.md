# 一秒工具网站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于 astro-theme-sify 模板构建 ymkit.cn 工具导航网站，包含插件、工具、AI 三个内容集合。

**Architecture:** 克隆 astro-theme-sify 模板，替换 blog/weekly 集合为 plugins/tools/ai 三个独立集合，改造首页为分类导航+最新内容布局，更新所有聚合页面（归档、搜索、RSS、标签）以支持多集合。

**Tech Stack:** Astro 6, Tailwind CSS v4, TypeScript, Bun, GitHub Pages, Cloudflare

---

## 文件结构

```
ymkit/
├── .github/workflows/deploy.yml        # 新建 - GitHub Pages 部署
├── public/
│   └── favicon.ico                      # 新建 - 从 COS 下载
├── src/
│   ├── components/
│   │   ├── CategoryCards.astro          # 新建 - 首页分类入口卡片
│   │   ├── Header.astro                 # 修改 - 更新导航
│   │   ├── Hero.astro                   # 修改 - 支持多集合统计
│   │   ├── PostCard.astro               # 修改 - routePrefix 适配
│   │   ├── PostList.astro               # 不变
│   │   ├── Search.astro                 # 修改 - 搜索链接适配
│   │   ├── Sidebar.astro                # 修改 - 聚合多集合
│   │   └── waline/                      # 不变
│   ├── content/
│   │   ├── plugins/                     # 新建 - 插件集合
│   │   │   └── hello-plugin/index.md    # 新建 - 示例内容
│   │   ├── tools/                       # 新建 - 工具集合
│   │   │   └── hello-tool/index.md      # 新建 - 示例内容
│   │   └── ai/                          # 新建 - AI 集合
│   │       └── hello-ai/index.md        # 新建 - 示例内容
│   ├── content.config.ts                # 修改 - 三个新集合 schema
│   ├── layouts/                         # 不变
│   ├── pages/
│   │   ├── _imageStore.ts               # 修改 - 支持新集合
│   │   ├── index.astro                  # 修改 - 新首页布局
│   │   ├── plugins/
│   │   │   ├── index.astro              # 新建 - 插件列表
│   │   │   └── [slug].astro             # 新建 - 插件详情
│   │   ├── tools/
│   │   │   ├── index.astro              # 新建 - 工具列表
│   │   │   └── [slug].astro             # 新建 - 工具详情
│   │   ├── ai/
│   │   │   ├── index.astro              # 新建 - AI 列表
│   │   │   └── [slug].astro             # 新建 - AI 详情
│   │   ├── archives/index.astro         # 修改 - 聚合多集合
│   │   ├── rss.xml.ts                   # 修改 - 聚合多集合
│   │   ├── search-index.json.ts         # 修改 - 聚合多集合
│   │   ├── tags/[tag].astro             # 修改 - 聚合多集合
│   │   ├── tags/index.astro             # 修改 - 聚合多集合
│   │   └── page/[page].astro            # 修改或删除
│   ├── consts.ts                        # 修改 - 站点信息
│   └── styles/global.css                # 不变
├── astro.config.ts                      # 不变
├── CNAME                                # 已有
└── package.json                         # 不变
```

---

## Task 1: 克隆模板并初始化项目

**Files:**
- Modify: `package.json`, `astro.config.ts`, `CNAME`

- [ ] **Step 1: 备份现有文件**

```bash
cd d:/work/projects/cc/ymkit
cp CNAME CNAME.bak
cp .gitignore .gitignore.bak
```

- [ ] **Step 2: 克隆模板到临时目录并复制文件**

```bash
cd /tmp
git clone --depth 1 https://github.com/santisify/astro-theme-sify.git ymkit-template
cd ymkit-template
# 复制所有文件到项目目录（保留 .git、CNAME、.gitignore）
rsync -av --exclude='.git' --exclude='CNAME' --exclude='.gitignore' /tmp/ymkit-template/ d:/work/projects/cc/ymkit/
```

- [ ] **Step 3: 恢复 CNAME 和 .gitignore**

```bash
cd d:/work/projects/cc/ymkit
cp CNAME.bak CNAME
cp .gitignore.bak .gitignore
rm CNAME.bak .gitignore.bak
```

- [ ] **Step 4: 安装依赖并验证模板可运行**

```bash
cd d:/work/projects/cc/ymkit
bun install
bun dev
# 打开 http://localhost:4321 确认模板正常运行，然后 Ctrl+C 停止
```

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "chore: 基于 astro-theme-sify 初始化项目"
```

---

## Task 2: 更新站点配置

**Files:**
- Modify: `src/consts.ts`
- Create: `public/favicon.ico`

- [ ] **Step 1: 下载 favicon 到 public 目录**

```bash
cd d:/work/projects/cc/ymkit
curl -o public/favicon.ico "https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.ico"
```

- [ ] **Step 2: 更新 src/consts.ts**

替换整个文件内容：

```typescript
export const SITE_TITLE = '一秒工具';
export const SITE_DESCRIPTION = '分享实用插件、工具和 AI 资源';
export const SITE_AUTHOR = '一秒工具';
export const SITE_URL = 'https://www.ymkit.cn';
export const SITE_AVATAR = 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.png';
export const SITE_COVER = 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.png';

export const PAGE_SIZE = 12;

export const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '插件', href: '/plugins' },
  { label: '工具', href: '/tools' },
  { label: 'AI', href: '/ai' },
  { label: '归档', href: '/archives' },
];

export const SOCIAL_LINKS = [
  { name: 'RSS', href: '/rss.xml', icon: 'rss' },
];

export const CATEGORY_CARDS = [
  {
    label: '插件',
    href: '/plugins',
    description: '浏览器插件、VS Code 扩展等实用插件',
    icon: 'plugin',
  },
  {
    label: '工具',
    href: '/tools',
    description: '在线工具、桌面应用、效率软件',
    icon: 'tool',
  },
  {
    label: 'AI',
    href: '/ai',
    description: 'AI 工具、模型、提示词资源',
    icon: 'ai',
  },
];

export const npmCDN = '';
export const walineServer = '';
```

- [ ] **Step 3: 验证**

```bash
bun dev
# 确认标题、Logo、favicon 正确显示
```

- [ ] **Step 4: 提交**

```bash
git add src/consts.ts public/favicon.ico
git commit -m "feat: 更新站点配置为一秒工具"
```

---

## Task 3: 创建内容集合

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/plugins/hello-plugin/index.md`
- Create: `src/content/tools/hello-tool/index.md`
- Create: `src/content/ai/hello-ai/index.md`

- [ ] **Step 1: 删除原有内容目录**

```bash
cd d:/work/projects/cc/ymkit
rm -rf src/content/blog src/content/weekly
```

- [ ] **Step 2: 创建新的内容目录**

```bash
mkdir -p src/content/plugins src/content/tools src/content/ai
```

- [ ] **Step 3: 替换 src/content.config.ts**

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().default(() => new Date()),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  pinned: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const pluginCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/plugins' }),
  schema: postSchema,
});

const toolCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
  schema: postSchema,
});

const aiCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ai' }),
  schema: postSchema,
});

export const collections = {
  plugins: pluginCollection,
  tools: toolCollection,
  ai: aiCollection,
};
```

- [ ] **Step 4: 创建示例内容 - 插件**

创建 `src/content/plugins/hello-plugin/index.md`：

```markdown
---
title: Hello Plugin
description: 这是一个示例插件文档，展示插件页面的内容格式。
date: 2026-05-31
tags: [示例, 浏览器插件]
cover: https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.png
pinned: false
draft: false
---

## 简介

这是一个示例插件文档。你可以在这里介绍插件的功能、安装方式和使用方法。

## 功能特性

- 特性一
- 特性二
- 特性三

## 安装方式

前往 [插件商店](https://example.com) 安装。

## 使用方法

安装完成后，点击浏览器工具栏的图标即可使用。
```

- [ ] **Step 5: 创建示例内容 - 工具**

创建 `src/content/tools/hello-tool/index.md`：

```markdown
---
title: Hello Tool
description: 这是一个示例工具文档，展示工具页面的内容格式。
date: 2026-05-31
tags: [示例, 在线工具]
cover: https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.png
pinned: false
draft: false
---

## 简介

这是一个示例工具文档。你可以在这里介绍工具的功能和使用场景。

## 功能特性

- 功能一
- 功能二
- 功能三

## 使用方法

访问 [工具网站](https://example.com) 即可在线使用。
```

- [ ] **Step 6: 创建示例内容 - AI**

创建 `src/content/ai/hello-ai/index.md`：

```markdown
---
title: Hello AI
description: 这是一个示例 AI 资源文档，展示 AI 页面的内容格式。
date: 2026-05-31
tags: [示例, AI 工具]
cover: https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.png
pinned: false
draft: false
---

## 简介

这是一个示例 AI 资源文档。你可以在这里介绍 AI 工具、模型或提示词资源。

## 功能特性

- 特性一
- 特性二
- 特性三

## 使用方法

前往 [AI 平台](https://example.com) 体验。
```

- [ ] **Step 7: 提交**

```bash
git add src/content.config.ts src/content/
git commit -m "feat: 创建 plugins/tools/ai 三个内容集合"
```

---

## Task 4: 更新 _imageStore.ts

**Files:**
- Modify: `src/pages/_imageStore.ts`

- [ ] **Step 1: 替换 src/pages/_imageStore.ts**

```typescript
import path from 'node:path';

const pluginsRaw = import.meta.glob<{ default: any }>('../content/plugins/**/*.{png,jpg,jpeg,gif,webp,svg}', {
  eager: true,
  query: '?url',
});

const toolsRaw = import.meta.glob<{ default: any }>('../content/tools/**/*.{png,jpg,jpeg,gif,webp,svg}', {
  eager: true,
  query: '?url',
});

const aiRaw = import.meta.glob<{ default: any }>('../content/ai/**/*.{png,jpg,jpeg,gif,webp,svg}', {
  eager: true,
  query: '?url',
});

const imageMap: Record<string, string> = {};

function buildMap(glob: typeof pluginsRaw) {
  for (const [key, mod] of Object.entries(glob)) {
    const val: any = mod;
    const inner = val?.default || val;
    const url = typeof inner === 'string' ? inner : (inner?.src || '');
    if (url) {
      const cleanKey = key.replace(/^\.\.\/content\//, '');
      imageMap[cleanKey] = url;
    }
  }
}

buildMap(pluginsRaw);
buildMap(toolsRaw);
buildMap(aiRaw);

export function resolveCover(collection: string, entryId: string, cover?: string): string | undefined {
  if (!cover) return undefined;
  if (!cover.startsWith('./') && !cover.startsWith('../')) return cover;

  const idParts = entryId.split('/');
  idParts.pop();
  const contentDir = idParts.length > 0 ? `${collection}/${idParts.join('/')}/` : `${collection}/`;
  const lookupKey = path.normalize(`${contentDir}${cover}`);

  return imageMap[lookupKey] || cover;
}
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/_imageStore.ts
git commit -m "feat: 更新 imageStore 支持新的内容集合"
```

---

## Task 5: 更新 Header 导航

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: 替换 src/components/Header.astro**

```astro
---
import { SITE_TITLE, NAV_ITEMS } from '../consts';
import Search from './Search.astro';
---

<header class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[var(--color-bg-dark)]/80 border-b border-gray-200/50 dark:border-gray-700/50">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="flex items-center gap-2 shrink-0">
        <span class="text-xl font-bold text-primary hover:opacity-80 transition-opacity">
          {SITE_TITLE}
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-1" aria-label="主导航">
        {NAV_ITEMS.map((item) => (
          <a
            href={item.href}
            class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div class="flex items-center gap-2">
        <button
          id="search-trigger"
          class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="搜索"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <button
          id="theme-toggle"
          class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="切换主题"
        >
          <svg class="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg class="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <button
          id="mobile-menu-btn"
          class="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="菜单"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="hidden md:hidden pb-4">
      <nav class="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <a
            href={item.href}
            class="block px-3 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  </div>
</header>

<Search />

<script is:inline>
  function handleThemeToggle() {
    var root = document.documentElement;
    var isDark = root.classList.contains('dark');
    if (isDark) {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    }
  }

  function handleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  function bindHandlers() {
    var themeBtn = document.getElementById('theme-toggle');
    var mobileBtn = document.getElementById('mobile-menu-btn');

    if (themeBtn) {
      themeBtn.removeEventListener('click', handleThemeToggle);
      themeBtn.addEventListener('click', handleThemeToggle);
    }

    if (mobileBtn) {
      mobileBtn.removeEventListener('click', handleMobileMenu);
      mobileBtn.addEventListener('click', handleMobileMenu);
    }
  }

  bindHandlers();

  document.addEventListener('astro:after-swap', function() {
    bindHandlers();
  });
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Header.astro
git commit -m "feat: 简化导航栏，移除文章下拉菜单"
```

---

## Task 6: 创建分类入口卡片组件

**Files:**
- Create: `src/components/CategoryCards.astro`

- [ ] **Step 1: 创建 src/components/CategoryCards.astro**

```astro
---
import { CATEGORY_CARDS } from '../consts';
---

<section class="mb-10">
  <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full inline-block"></span>
    分类导航
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {CATEGORY_CARDS.map((card) => (
      <a
        href={card.href}
        class="group bg-white dark:bg-[var(--color-card-dark)] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      >
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          {card.icon === 'plugin' && (
            <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
          {card.icon === 'tool' && (
            <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.384 5.384a2.025 2.025 0 01-2.864-2.864l5.384-5.384m2.864 2.864L15 12m0 0l3.72-3.72M15 12l-3.72 3.72M15 12H9m6 6v-6m0 0V9m0 6h-6" />
            </svg>
          )}
          {card.icon === 'ai' && (
            <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          )}
        </div>
        <h3 class="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {card.label}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {card.description}
        </p>
      </a>
    ))}
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/CategoryCards.astro
git commit -m "feat: 添加分类入口卡片组件"
```

---

## Task 7: 更新首页

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 替换 src/pages/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../layouts/BlogLayout.astro';
import Hero from '../components/Hero.astro';
import CategoryCards from '../components/CategoryCards.astro';
import PostList from '../components/PostList.astro';
import { PAGE_SIZE } from '../consts';
import { resolveCover } from './_imageStore';

const allPlugins = await getCollection('plugins');
const allTools = await getCollection('tools');
const allAi = await getCollection('ai');

const allPosts = [
  ...allPlugins.map((p) => ({ ...p, collection: 'plugins' as const })),
  ...allTools.map((p) => ({ ...p, collection: 'tools' as const })),
  ...allAi.map((p) => ({ ...p, collection: 'ai' as const })),
];

const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postData = sorted.slice(0, PAGE_SIZE).map((p) => ({
  ...p,
  slug: p.id,
  data: {
    ...p.data,
    cover: resolveCover(p.collection, p.id, p.data.cover),
  },
}));

const routeMap: Record<string, string> = {
  plugins: '/plugins/',
  tools: '/tools/',
  ai: '/ai/',
};
---

<BlogLayout>
  <Hero collections={[allPlugins, allTools, allAi]} />
  <CategoryCards />
  <PostList posts={postData} showPinned routePrefixMap={routeMap} />
</BlogLayout>
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/index.astro
git commit -m "feat: 改造首页为分类导航+最新内容布局"
```

---

## Task 8: 更新 Hero 组件支持多集合

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: 替换 src/components/Hero.astro**

```astro
---
import { SITE_TITLE, SITE_DESCRIPTION, SITE_AVATAR, SITE_COVER, SOCIAL_LINKS } from '../consts';

interface Props {
  collections?: any[];
}

const { collections = [] } = Astro.props;

const totalCount = collections.reduce((sum: number, col: any[]) => sum + col.length, 0);
---

<section class="relative overflow-hidden rounded-2xl mb-10">
  <div class="absolute inset-0">
    <img
      src={SITE_COVER}
      alt=""
      class="w-full h-full object-cover"
      aria-hidden="true"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
  </div>

  <div class="relative px-6 py-12 sm:px-10 sm:py-16 lg:py-20 text-center text-white">
    <div class="mb-8">
      <img
        src={SITE_AVATAR}
        alt={SITE_TITLE}
        class="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover ring-4 ring-white/30 shadow-2xl"
        width="112"
        height="112"
      />
    </div>

    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
      {SITE_TITLE}
    </h1>
    <p class="text-lg sm:text-xl text-white/80 font-light mb-6">
      {SITE_DESCRIPTION}
    </p>

    <div class="flex items-center justify-center gap-4 mb-8">
      {SOCIAL_LINKS.map((link) => (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          title={link.name}
        >
          {link.icon === 'rss' && (
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
          )}
        </a>
      ))}
    </div>

    <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
      <a href="/archives" class="group text-center">
        <div class="text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform">
          {totalCount}
        </div>
        <div class="text-sm text-white/70 mt-1">文章</div>
      </a>
      <div class="w-px h-10 bg-white/20 hidden sm:block"></div>
      <a href="/tags" class="group text-center">
        <div class="text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform">
          3
        </div>
        <div class="text-sm text-white/70 mt-1">分类</div>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Hero.astro
git commit -m "feat: 更新 Hero 组件支持多集合统计"
```

---

## Task 9: 更新 PostCard 和 PostList 支持自定义路由前缀

**Files:**
- Modify: `src/components/PostCard.astro`
- Modify: `src/components/PostList.astro`

- [ ] **Step 1: 更新 PostCard.astro**

在 `interface Props` 中添加 `routePrefixMap`：

在 `Astro.props` 解构后，修改链接生成逻辑。替换 `routePrefix` 相关代码：

```astro
interface Props {
  title: string;
  description?: string;
  date: Date;
  slug: string;
  tags?: string[];
  category?: string;
  cover?: string;
  body?: string;
  pinned?: boolean;
  draft?: boolean;
  routePrefix?: string;
  collection?: string;
  routePrefixMap?: Record<string, string>;
}

const {
  title,
  description,
  date,
  slug,
  tags = [],
  category,
  cover,
  body,
  pinned = false,
  draft = false,
  routePrefix = '/post/',
  collection,
  routePrefixMap,
} = Astro.props;

const linkPrefix = collection && routePrefixMap?.[collection] ? routePrefixMap[collection] : routePrefix;
```

将模板中 `<a href={`${routePrefix}${slug}`}>` 改为 `<a href={`${linkPrefix}${slug}`}>`。

- [ ] **Step 2: 更新 PostList.astro**

在 `interface Props` 中添加 `routePrefixMap`，并传递给 PostCard：

```astro
interface Props {
  posts: Post[];
  showPinned?: boolean;
  routePrefix?: string;
  routePrefixMap?: Record<string, string>;
}

const { posts, showPinned = false, routePrefix = '/post/', routePrefixMap } = Astro.props;
```

在每个 `<PostCard>` 调用中添加 `collection={post.collection}` 和 `routePrefixMap={routePrefixMap}`。

- [ ] **Step 3: 提交**

```bash
git add src/components/PostCard.astro src/components/PostList.astro
git commit -m "feat: PostCard 支持自定义路由前缀"
```

---

## Task 10: 创建分类列表页

**Files:**
- Create: `src/pages/plugins/index.astro`
- Create: `src/pages/tools/index.astro`
- Create: `src/pages/ai/index.astro`

- [ ] **Step 1: 创建 src/pages/plugins/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import PostList from '../../components/PostList.astro';
import { resolveCover } from '../_imageStore';

const allPosts = await getCollection('plugins');
const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postData = sorted.map((p) => ({
  ...p,
  slug: p.id,
  collection: 'plugins' as const,
  data: {
    ...p.data,
    cover: resolveCover('plugins', p.id, p.data.cover),
  },
}));
---

<BlogLayout title="插件">
  <h1 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full inline-block"></span>
    插件
  </h1>
  <PostList posts={postData} routePrefix="/plugins/" />
</BlogLayout>
```

- [ ] **Step 2: 创建 src/pages/tools/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import PostList from '../../components/PostList.astro';
import { resolveCover } from '../_imageStore';

const allPosts = await getCollection('tools');
const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postData = sorted.map((p) => ({
  ...p,
  slug: p.id,
  collection: 'tools' as const,
  data: {
    ...p.data,
    cover: resolveCover('tools', p.id, p.data.cover),
  },
}));
---

<BlogLayout title="工具">
  <h1 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full inline-block"></span>
    工具
  </h1>
  <PostList posts={postData} routePrefix="/tools/" />
</BlogLayout>
```

- [ ] **Step 3: 创建 src/pages/ai/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import PostList from '../../components/PostList.astro';
import { resolveCover } from '../_imageStore';

const allPosts = await getCollection('ai');
const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postData = sorted.map((p) => ({
  ...p,
  slug: p.id,
  collection: 'ai' as const,
  data: {
    ...p.data,
    cover: resolveCover('ai', p.id, p.data.cover),
  },
}));
---

<BlogLayout title="AI">
  <h1 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full inline-block"></span>
    AI
  </h1>
  <PostList posts={postData} routePrefix="/ai/" />
</BlogLayout>
```

- [ ] **Step 4: 提交**

```bash
git add src/pages/plugins/ src/pages/tools/ src/pages/ai/
git commit -m "feat: 创建插件、工具、AI 列表页"
```

---

## Task 11: 创建分类详情页

**Files:**
- Create: `src/pages/plugins/[slug].astro`
- Create: `src/pages/tools/[slug].astro`
- Create: `src/pages/ai/[slug].astro`

- [ ] **Step 1: 创建 src/pages/plugins/[slug].astro**

```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';
import { getReadingTime, getWordCount } from '../../utils/readingTime';
import { resolveCover } from '../_imageStore';

export async function getStaticPaths() {
  const posts = await getCollection('plugins');
  return posts.map((post) => ({
    params: { slug: post.id },
  }));
}

const { slug } = Astro.params;
const post = await getEntry('plugins', slug!);

if (!post) {
  return Astro.redirect('/404');
}

const coverSrc = resolveCover('plugins', post.id, post.data.cover);

const { Content, headings } = await render(post);

const body = post.body || '';
const wordCount = getWordCount(body);
const readingTime = getReadingTime(body);

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}
---
<PostLayout title={post.data.title} description={post.data.description} headings={headings} cover={coverSrc}>
  <header class="mb-8">
    <a
      href="/plugins"
      class="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4"
    >
      插件
    </a>
    <h1 class="text-3xl font-bold mb-4">{post.data.title}</h1>
    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
      <time datetime={formatDate(post.data.date)}>
        {formatDate(post.data.date)}
      </time>
      <span>{wordCount} 字</span>
      <span>{readingTime} min read</span>
    </div>
    {post.data.tags && post.data.tags.length > 0 && (
      <div class="flex flex-wrap gap-2 mt-4">
        {post.data.tags.map((tag: string) => (
          <a
            href={`/tags/${tag}`}
            class="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            #{tag}
          </a>
        ))}
      </div>
    )}
  </header>
  <Content />
</PostLayout>
```

- [ ] **Step 2: 创建 src/pages/tools/[slug].astro**

同上，将所有 `plugins` 替换为 `tools`，将分类标签改为 `工具`。

- [ ] **Step 3: 创建 src/pages/ai/[slug].astro**

同上，将所有 `plugins` 替换为 `ai`，将分类标签改为 `AI`。

- [ ] **Step 4: 提交**

```bash
git add src/pages/plugins/\[slug\].astro src/pages/tools/\[slug\].astro src/pages/ai/\[slug\].astro
git commit -m "feat: 创建插件、工具、AI 详情页"
```

---

## Task 12: 更新 Sidebar 聚合多集合

**Files:**
- Modify: `src/components/Sidebar.astro`

- [ ] **Step 1: 替换 src/components/Sidebar.astro**

```astro
---
import { getCollection } from 'astro:content';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_AVATAR, SOCIAL_LINKS } from '../consts';
import { getWordCount } from '../utils/readingTime';

const allPlugins = await getCollection('plugins');
const allTools = await getCollection('tools');
const allAi = await getCollection('ai');

const allPosts = [
  ...allPlugins.map((p) => ({ ...p, collection: 'plugins' as const })),
  ...allTools.map((p) => ({ ...p, collection: 'tools' as const })),
  ...allAi.map((p) => ({ ...p, collection: 'ai' as const })),
];

const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const totalPosts = sorted.length;
let totalWords = 0;
const tagMap = new Map<string, number>();

for (const post of sorted) {
  totalWords += getWordCount(post.body || '');
  for (const tag of post.data.tags || []) {
    tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
  }
}

const allTags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);

const TAG_LIMIT = 15;

const routeMap: Record<string, string> = {
  plugins: '/plugins/',
  tools: '/tools/',
  ai: '/ai/',
};

const randomPosts = [...sorted].sort(() => Math.random() - 0.5).slice(0, 5);
---

<aside class="space-y-6">
  <div class="bg-white dark:bg-[var(--color-card-dark)] rounded-2xl shadow-sm p-6 text-center">
    <img
      src={SITE_AVATAR}
      alt={SITE_AUTHOR}
      class="w-20 h-20 rounded-full mx-auto mb-3 object-cover ring-2 ring-primary/20"
      width="80"
      height="80"
    />
    <h2 class="font-semibold text-lg">{SITE_AUTHOR}</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{SITE_DESCRIPTION}</p>
    <div class="flex items-center justify-center gap-3 mt-4">
      {SOCIAL_LINKS.map((link) => (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-primary transition-colors"
          title={link.name}
        >
          {link.icon === 'rss' && (
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
          )}
        </a>
      ))}
    </div>

    <div class="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
      <div class="text-center">
        <div class="font-semibold text-sm">{totalPosts}</div>
        <div class="text-xs text-gray-400">文章</div>
      </div>
      <div class="text-center">
        <div class="font-semibold text-sm">{Math.round(totalWords / 1000)}k</div>
        <div class="text-xs text-gray-400">字数</div>
      </div>
    </div>
  </div>

  {
    allTags.length > 0 && (
      <div class="bg-white dark:bg-[var(--color-card-dark)] rounded-2xl shadow-sm p-5"
        data-sidebar-section="tags"
      >
        <h2 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
          标签
        </h2>
        <div class="sidebar-expand-list flex flex-wrap gap-2">
          {allTags.map(([tag, count], i) => (
            <a
              href={`/tags/${tag}`}
              class={`text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors ${
                i >= TAG_LIMIT ? 'hidden sidebar-extra' : ''
              }`}
            >
              {tag}
              <span class="ml-1 opacity-60">({count})</span>
            </a>
          ))}
        </div>
        {
          allTags.length > TAG_LIMIT && (
            <button
              type="button"
              class="sidebar-toggle-btn mt-3 text-xs text-primary hover:underline"
              data-expanded="false"
            >
              显示全部 ({allTags.length})
            </button>
          )
        }
      </div>
    )
  }

  {
    randomPosts.length > 0 && (
      <div class="bg-white dark:bg-[var(--color-card-dark)] rounded-2xl shadow-sm p-5">
        <h2 class="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
          随机推荐
        </h2>
        <div class="space-y-2">
          {randomPosts.map((post) => (
            <a
              href={`${routeMap[post.collection]}${post.id}`}
              class="block text-xs text-gray-500 dark:text-gray-400 truncate hover:text-primary transition-colors"
            >
              {post.data.title}
            </a>
          ))}
        </div>
      </div>
    )
  }
</aside>

<script is:inline>
  function initSidebarToggles() {
    document.querySelectorAll('.sidebar-toggle-btn').forEach((btn) => {
      if (btn.dataset.initialized) return;
      btn.dataset.initialized = 'true';

      const section = btn.closest('[data-sidebar-section]');
      if (!section) return;
      const list = section.querySelector('.sidebar-expand-list');
      if (!list) return;
      const extraItems = list.querySelectorAll('.sidebar-extra');
      const label = btn.textContent || '';

      btn.addEventListener('click', () => {
        const expanded = btn.dataset.expanded === 'true';
        extraItems.forEach((el) => el.classList.toggle('hidden', expanded));
        btn.dataset.expanded = String(!expanded);
        btn.textContent = expanded ? label : '收起';
      });
    });
  }

  document.addEventListener('astro:page-load', initSidebarToggles);
  initSidebarToggles();
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Sidebar.astro
git commit -m "feat: 更新 Sidebar 聚合多集合数据"
```

---

## Task 13: 更新归档页

**Files:**
- Modify: `src/pages/archives/index.astro`

- [ ] **Step 1: 替换 src/pages/archives/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import PostList from '../../components/PostList.astro';
import { resolveCover } from '../_imageStore';

const allPlugins = await getCollection('plugins');
const allTools = await getCollection('tools');
const allAi = await getCollection('ai');

const allPosts = [
  ...allPlugins.map((p) => ({ ...p, collection: 'plugins' as const })),
  ...allTools.map((p) => ({ ...p, collection: 'tools' as const })),
  ...allAi.map((p) => ({ ...p, collection: 'ai' as const })),
];

const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postData = sorted.map((p) => ({
  ...p,
  slug: p.id,
  data: {
    ...p.data,
    cover: resolveCover(p.collection, p.id, p.data.cover),
  },
}));

const routeMap: Record<string, string> = {
  plugins: '/plugins/',
  tools: '/tools/',
  ai: '/ai/',
};
---

<BlogLayout title="归档">
  <h1 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full inline-block"></span>
    归档
  </h1>
  <PostList posts={postData} routePrefixMap={routeMap} />
</BlogLayout>
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/archives/index.astro
git commit -m "feat: 归档页聚合三个集合"
```

---

## Task 14: 更新标签页

**Files:**
- Modify: `src/pages/tags/[tag].astro`
- Modify: `src/pages/tags/index.astro`

- [ ] **Step 1: 替换 src/pages/tags/[tag].astro**

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import PostList from '../../components/PostList.astro';
import { resolveCover } from '../_imageStore';

export async function getStaticPaths() {
  const allPlugins = await getCollection('plugins');
  const allTools = await getCollection('tools');
  const allAi = await getCollection('ai');

  const allPosts = [
    ...allPlugins.map((p) => ({ ...p, collection: 'plugins' as const })),
    ...allTools.map((p) => ({ ...p, collection: 'tools' as const })),
    ...allAi.map((p) => ({ ...p, collection: 'ai' as const })),
  ];

  const tagSet = new Set<string>();
  for (const post of allPosts) {
    for (const tag of post.data.tags || []) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet).map((tag) => ({
    params: { tag },
    props: {
      tag,
      posts: allPosts
        .filter((p) => (p.data.tags || []).includes(tag))
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
    },
  }));
}

const { tag } = Astro.params;
const { posts } = Astro.props;

const postData = posts.map((p: any) => ({
  ...p,
  slug: p.id,
  data: {
    ...p.data,
    cover: resolveCover(p.collection, p.id, p.data.cover),
  },
}));

const routeMap: Record<string, string> = {
  plugins: '/plugins/',
  tools: '/tools/',
  ai: '/ai/',
};
---

<BlogLayout title={`标签: ${tag}`}>
  <h1 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full inline-block"></span>
    标签: {tag}
  </h1>
  <PostList posts={postData} routePrefixMap={routeMap} />
</BlogLayout>
```

- [ ] **Step 2: 替换 src/pages/tags/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

const allPlugins = await getCollection('plugins');
const allTools = await getCollection('tools');
const allAi = await getCollection('ai');

const allPosts = [
  ...allPlugins,
  ...allTools,
  ...allAi,
];

const tagMap = new Map<string, number>();
for (const post of allPosts) {
  for (const tag of post.data.tags || []) {
    tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
  }
}

const allTags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);
---

<BlogLayout title="标签">
  <h1 class="text-2xl font-bold mb-8 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full inline-block"></span>
    标签
  </h1>
  <div class="flex flex-wrap gap-3">
    {allTags.map(([tag, count]) => (
      <a
        href={`/tags/${tag}`}
        class="text-sm px-4 py-2 rounded-full bg-white dark:bg-[var(--color-card-dark)] shadow-sm text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
      >
        {tag}
        <span class="ml-1 opacity-60">({count})</span>
      </a>
    ))}
  </div>
</BlogLayout>
```

- [ ] **Step 3: 提交**

```bash
git add src/pages/tags/
git commit -m "feat: 标签页聚合三个集合"
```

---

## Task 15: 更新搜索索引和 RSS

**Files:**
- Modify: `src/pages/search-index.json.ts`
- Modify: `src/pages/rss.xml.ts`

- [ ] **Step 1: 替换 src/pages/search-index.json.ts**

```typescript
import { getCollection } from 'astro:content';

function stripMarkdown(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\s+/g, ' ');
}

export async function GET() {
  const plugins = await getCollection('plugins');
  const tools = await getCollection('tools');
  const ai = await getCollection('ai');

  const collectionLabels: Record<string, string> = {
    plugins: '插件',
    tools: '工具',
    ai: 'AI',
  };

  const entries = [
    ...plugins.map((p) => ({
      title: p.data.title,
      description: p.data.description || '',
      category: collectionLabels.plugins,
      tags: p.data.tags || [],
      slug: p.id,
      type: 'plugins',
      date: p.data.date.toISOString(),
      body: stripMarkdown(p.body || '').slice(0, 400),
    })),
    ...tools.map((p) => ({
      title: p.data.title,
      description: p.data.description || '',
      category: collectionLabels.tools,
      tags: p.data.tags || [],
      slug: p.id,
      type: 'tools',
      date: p.data.date.toISOString(),
      body: stripMarkdown(p.body || '').slice(0, 400),
    })),
    ...ai.map((p) => ({
      title: p.data.title,
      description: p.data.description || '',
      category: collectionLabels.ai,
      tags: p.data.tags || [],
      slug: p.id,
      type: 'ai',
      date: p.data.date.toISOString(),
      body: stripMarkdown(p.body || '').slice(0, 400),
    })),
  ];

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

- [ ] **Step 2: 更新 Search.astro 中的搜索结果链接**

在 `src/components/Search.astro` 中，将搜索结果的链接生成逻辑更新。找到 `results.innerHTML = filtered.map(...)` 部分，将链接改为：

```javascript
const linkMap: Record<string, string> = {
  plugins: '/plugins/',
  tools: '/tools/',
  ai: '/ai/',
};
// 在模板字符串中使用：
const link = linkMap[item.type] || '/post/';
// ...
`<a href="${link}${item.slug}" ...>`
```

- [ ] **Step 3: 替换 src/pages/rss.xml.ts**

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context: { site: URL }) {
  const plugins = await getCollection('plugins', ({ data }) => !data.draft);
  const tools = await getCollection('tools', ({ data }) => !data.draft);
  const ai = await getCollection('ai', ({ data }) => !data.draft);

  const routeMap: Record<string, string> = {
    plugins: '/plugins/',
    tools: '/tools/',
    ai: '/ai/',
  };

  const allPosts = [
    ...plugins.map((p) => ({ ...p, collection: 'plugins' as const })),
    ...tools.map((p) => ({ ...p, collection: 'tools' as const })),
    ...ai.map((p) => ({ ...p, collection: 'ai' as const })),
  ];

  const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    stylesheet: '/rss-styles.xsl',
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.date,
      link: `${routeMap[post.collection]}${post.id}`,
    })),
  });
}
```

- [ ] **Step 4: 提交**

```bash
git add src/pages/search-index.json.ts src/pages/rss.xml.ts src/components/Search.astro
git commit -m "feat: 搜索索引和 RSS 聚合三个集合"
```

---

## Task 16: 清理不需要的页面和文件

**Files:**
- Delete: `src/pages/friends.astro`
- Delete: `src/pages/about.astro`
- Delete: `src/pages/post/[...slug].astro`
- Delete: `src/pages/weekly/`
- Delete: `src/pages/categories/`
- Delete: `src/pages/page/[page].astro`
- Delete: `public/links.json`

- [ ] **Step 1: 删除不需要的文件**

```bash
cd d:/work/projects/cc/ymkit
rm -f src/pages/friends.astro
rm -f src/pages/about.astro
rm -f src/pages/post/\[...slug\].astro
rm -rf src/pages/weekly
rm -rf src/pages/categories
rm -f src/pages/page/\[page\].astro
rm -f public/links.json
```

- [ ] **Step 2: 提交**

```bash
git add -A
git commit -m "chore: 移除不需要的页面和文件"
```

---

## Task 17: 添加 GitHub Actions 部署

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 创建部署工作流**

```bash
mkdir -p .github/workflows
```

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 提交**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: 添加 GitHub Pages 部署工作流"
```

---

## Task 18: 构建验证

**Files:** 无（验证步骤）

- [ ] **Step 1: 运行构建**

```bash
cd d:/work/projects/cc/ymkit
bun run build
```

Expected: 构建成功，`dist/` 目录包含 `index.html`、`rss.xml`、`search-index.json`。

- [ ] **Step 2: 预览构建结果**

```bash
bun preview
# 打开 http://localhost:4321 验证所有页面
```

验证清单：
- [ ] 首页显示 Hero + 分类卡片 + 最新内容
- [ ] `/plugins` 显示插件列表
- [ ] `/tools` 显示工具列表
- [ ] `/ai` 显示 AI 列表
- [ ] 详情页正常渲染
- [ ] 侧边栏显示标签和随机推荐
- [ ] 搜索功能正常
- [ ] RSS 可访问
- [ ] 暗色/亮色模式切换正常

- [ ] **Step 3: 最终提交**

```bash
git add -A
git commit -m "chore: 构建验证通过"
```
