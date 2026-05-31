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
