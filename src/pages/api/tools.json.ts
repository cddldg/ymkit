import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const TOOLS_FILE = path.join(process.cwd(), 'src/data/tools.json');

export const GET: APIRoute = async () => {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf-8');
    const tools = JSON.parse(data);
    return new Response(JSON.stringify(tools), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read tools' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = await fs.readFile(TOOLS_FILE, 'utf-8');
    const tools = JSON.parse(data);

    // Add new tool
    const newTool = {
      id: body.name.toLowerCase().replace(/\s+/g, '-'),
      ...body,
      rating: 0
    };

    tools.push(newTool);
    await fs.writeFile(TOOLS_FILE, JSON.stringify(tools, null, 2));

    return new Response(JSON.stringify(newTool), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add tool' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = await fs.readFile(TOOLS_FILE, 'utf-8');
    let tools = JSON.parse(data);

    // Update tool
    const index = tools.findIndex((t: any) => t.id === body.id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Tool not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    tools[index] = { ...tools[index], ...body };
    await fs.writeFile(TOOLS_FILE, JSON.stringify(tools, null, 2));

    return new Response(JSON.stringify(tools[index]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update tool' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    const data = await fs.readFile(TOOLS_FILE, 'utf-8');
    let tools = JSON.parse(data);

    tools = tools.filter((t: any) => t.id !== id);
    await fs.writeFile(TOOLS_FILE, JSON.stringify(tools, null, 2));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete tool' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
