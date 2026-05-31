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
