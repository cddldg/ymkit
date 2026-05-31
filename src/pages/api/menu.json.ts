import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const MENU_FILE = path.join(process.cwd(), 'src/data/menu.json');

export const GET: APIRoute = async () => {
  try {
    const data = await fs.readFile(MENU_FILE, 'utf-8');
    const menu = JSON.parse(data);
    return new Response(JSON.stringify(menu), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read menu' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = await fs.readFile(MENU_FILE, 'utf-8');
    const menu = JSON.parse(data);

    const updatedMenu = { ...menu, ...body };
    await fs.writeFile(MENU_FILE, JSON.stringify(updatedMenu, null, 2));

    return new Response(JSON.stringify(updatedMenu), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update menu' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
