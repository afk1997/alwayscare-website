// Azure Static Web Apps Functions adapter
import { handleLiveCases } from '../../../api/_handler';

export default async function (context: any, req: any): Promise<void> {
  const result = await handleLiveCases();
  context.res = {
    status: result.status,
    headers: result.headers,
    body: result.body,
  };
}
