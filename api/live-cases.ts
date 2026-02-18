// Vercel API route adapter
import { handleLiveCases } from './_handler';

export default async function handler(req: Request): Promise<Response> {
  const result = await handleLiveCases();
  return new Response(result.body, {
    status: result.status,
    headers: result.headers,
  });
}
