import axios from 'axios';

const KAFOLAT_AUTH = {
  username: 'TBOT',
  password: 'dSDFGfgj@@$SDH2Fw'
};

const KAFOLAT_PROXY_BASE = 'https://online.kafolat.uz/online/ins/osago/proxy';

// Add CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

export default async function handler(req, res) {
  // Set CORS headers
  setCorsHeaders(res);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path, data } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'Поле "path" обязательно' });
    }

    const response = await axios.post(
      KAFOLAT_PROXY_BASE,
      data || {},
      {
        headers: {
          'param': path,
          'MTD': 'POST',
          'Content-Type': 'application/json'
        },
        auth: KAFOLAT_AUTH,
        timeout: 15000
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Kafolat error:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null
    });
  }
}