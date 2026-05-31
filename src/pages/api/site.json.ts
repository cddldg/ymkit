import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const SITE_FILE = path.join(process.cwd(), 'src/data/site.json');

export const GET: APIRoute = async () => {
  try {
    const data = await fs.readFile(SITE_FILE, 'utf-8');
    const site = JSON.parse(data);
    return new Response(JSON.stringify(site), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read site config' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = await fs.readFile(SITE_FILE, 'utf-8');
    const site = JSON.parse(data);

    const updatedSite = { ...site, ...body };
    await fs.writeFile(SITE_FILE, JSON.stringify(updatedSite, null, 2));

    return new Response(JSON.stringify(updatedSite), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update site config' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
