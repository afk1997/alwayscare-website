import type { NextApiRequest, NextApiResponse } from 'next';

const UPSTREAM_URL = 'https://alwayscare-qc.vercel.app/api/approved-cases';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiToken = process.env.FEED_API_TOKEN;

  if (!apiToken) {
    return res.status(500).json({ error: 'API token not configured' });
  }

  try {
    const response = await fetch(UPSTREAM_URL, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch cases' });
    }

    const data = await response.json();
    console.log(data);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch(err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
