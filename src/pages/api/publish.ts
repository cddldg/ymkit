import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const POST: APIRoute = async () => {
  try {
    // Git add all changes
    await execAsync('git add .');

    // Git commit
    await execAsync('git commit -m "site: production build"');

    // Git push
    await execAsync('git push');

    return new Response(JSON.stringify({ success: true, message: '发布成功' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
