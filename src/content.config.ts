import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().default(() => new Date()),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  author: z.string().default('一秒工具'),
  pinned: z.boolean().default(false),
  draft: z.boolean().default(false),
  canonical: z.string().url().optional(),
  category: z.string().optional(),
  readingTime: z.number().optional(),
});

const pluginCollection = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/plugins' }),
  schema: postSchema,
});

const toolCollection = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/tools' }),
  schema: postSchema,
});

const aiCollection = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/ai' }),
  schema: postSchema,
});

export const collections = {
  plugins: pluginCollection,
  tools: toolCollection,
  ai: aiCollection,
};
