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
