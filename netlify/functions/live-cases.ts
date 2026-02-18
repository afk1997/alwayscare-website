// Netlify Functions adapter
import type { Handler } from '@netlify/functions';
import { handleLiveCases } from '../../api/_handler';

const handler: Handler = async () => {
  const result = await handleLiveCases();
  return {
    statusCode: result.status,
    headers: result.headers,
    body: result.body,
  };
};

export { handler };
