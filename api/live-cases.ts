// Vercel Serverless Function — Web Standard pattern (ESM compatible)
import { handleLiveCases } from './_handler';

export async function GET() {
  const result = await handleLiveCases();
  return new Response(result.body, {
    status: result.status,
    headers: result.headers,
  });
}
