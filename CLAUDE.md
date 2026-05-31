# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server at http://localhost:4321 |
| `bun run build` | Build static site to `dist/` |
| `bun preview` | Preview production build |

## Architecture

**ymkit.cn** — a tool/resource navigation site built on Astro 6 + Tailwind CSS v4, based on the [astro-theme-sify](https://github.com/santisify/astro-theme-sify) template.

### Content Collections

Three independent collections, all sharing the same `postSchema` (defined in `src/content.config.ts`):

- `src/content/plugins/` — browser plugins, VS Code extensions
- `src/content/tools/` — online tools, desktop apps
- `src/content/ai/` — AI tools, models, prompts

Each entry is a folder with `index.md` (or `index.mdx`). Frontmatter fields: `title`, `description`, `date`, `updated`, `tags[]`, `cover` (remote URL from Tencent COS), `pinned`, `draft`.

### Layouts

- `BaseLayout.astro` — HTML shell, header, footer, SEO meta
- `BlogLayout.astro` — extends BaseLayout, adds left sidebar + mobile drawer
- `PostLayout.astro` — extends BaseLayout, left sidebar + right TOC + article card background

### Pages

- `/` — Hero + category cards + latest posts from all collections
- `/plugins`, `/tools`, `/ai` — collection listing pages
- `/plugins/[slug]`, `/tools/[slug]`, `/ai/[slug]` — detail pages
- `/archives` — all posts aggregated, sorted by date
- `/tags`, `/tags/[tag]` — tag index and filtered posts
- `/rss.xml` — RSS feed aggregating all collections
- `/search-index.json` — search index for Ctrl+K search

### Key Components

- `Sidebar.astro` — author info, tag cloud, random recommendations; aggregates all 3 collections
- `Hero.astro` — homepage hero with stats; accepts `collections` prop
- `PostCard.astro` — card with cover, title, tags; supports `collection` + `routePrefixMap` for multi-collection routing
- `PostList.astro` — grid of PostCards with pinned section
- `CategoryCards.astro` — 3-card grid for plugin/tool/AI navigation
- `DonationModal.astro` — donation popup (WeChat/Alipay QR codes), rendered once in Footer

### Routing

PostCard links are resolved via `routePrefixMap`:
```typescript
const routeMap = { plugins: '/plugins/', tools: '/tools/', ai: '/ai/' };
```

### Image Storage

All media assets are stored on Tencent COS: `https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/`

`src/pages/_imageStore.ts` handles local image resolution for markdown-relative covers (via `import.meta.glob`), but remote COS URLs pass through directly.

### Deployment

GitHub Pages via `.github/workflows/deploy.yml`. CNAME: `www.ymkit.cn`. Cloudflare DNS proxy in front.

## Conventions

- Content is written in Chinese
- Cover images use COS URLs, not local files
- `draft: true` in frontmatter excludes from RSS and listing pages
- `pinned: true` shows posts at the top of listing pages
