// Vercel Serverless Function adapter (Node.js runtime)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleLiveCases } from './_handler';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const result = await handleLiveCases();
  Object.entries(result.headers).forEach(([key, value]) => res.setHeader(key, value));
  res.status(result.status).send(result.body);
}
