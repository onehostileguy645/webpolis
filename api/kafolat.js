import axios from 'axios';
import cors from 'cors';

const KAFOLAT_AUTH = {
  username: 'TBOT',
  password: 'dSDFGfgj@@$SDH2Fw'
};

const KAFOLAT_PROXY_BASE = 'https://online.kafolat.uz/online/ins/osago/proxy';

// Enable CORS
const corsMiddleware = cors();

export default async function handler(req, res) {
  // Run CORS middleware
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });

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