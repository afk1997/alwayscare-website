// Cloudflare Pages Functions adapter
import { handleLiveCases } from '../../api/_handler';

export const onRequest: PagesFunction = async () => {
  const result = await handleLiveCases();
  return new Response(result.body, {
    status: result.status,
    headers: result.headers,
  });
};
