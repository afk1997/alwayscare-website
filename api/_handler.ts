/**
 * Shared API proxy handler — platform-agnostic
 *
 * This fetches live cases from the upstream API with auth.
 * Each hosting platform has a thin adapter that calls this handler:
 *
 *   Netlify:    netlify/functions/live-cases.ts
 *   Vercel:     api/live-cases.ts
 *   Cloudflare: functions/api/live-cases.ts
 *   Azure:      api/live-cases/index.ts
 *
 * Set the ALWAYSCARE_API_TOKEN environment variable on your platform.
 */

const UPSTREAM_URL = 'https://api-alwayscare.arham.org/api/external/cases/recent';

export interface ProxyResult {
  status: number;
  body: string;
  headers: Record<string, string>;
}

export async function handleLiveCases(): Promise<ProxyResult> {
  const apiToken = process.env.ALWAYSCARE_API_TOKEN;

  if (!apiToken) {
    return {
      status: 500,
      body: JSON.stringify({ error: 'API token not configured' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const response = await fetch(UPSTREAM_URL, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        status: response.status,
        body: JSON.stringify({ error: 'Failed to fetch cases' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    const data = await response.json();

    return {
      status: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch {
    return {
      status: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
}
