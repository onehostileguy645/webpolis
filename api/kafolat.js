const axios = require('axios');

const KAFOLAT_AUTH = {
  username: 'TBOT',
  password: 'dSDFGfgj@@$SDH2Fw'
};

const KAFOLAT_PROXY_BASE = 'https://online.kafolat.uz/online/ins/osago/proxy';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== Received request ===');
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const { path, data } = req.body;

    if (!path) {
      console.error('Missing path field');
      return res.status(400).json({ error: 'Поле "path" обязательно' });
    }

    console.log('Sending to Kafolat:', {
      url: KAFOLAT_PROXY_BASE,
      path: path,
      data: data
    });

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

    console.log('Kafolat response:', response.data);
    res.json(response.data);
    
  } catch (error) {
    console.error('=== ERROR ===');
    console.error('Message:', error.message);
    console.error('Status:', error.response?.status);
    console.error('Response:', JSON.stringify(error.response?.data, null, 2));

    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
      statusCode: error.response?.status
    });
  }
};