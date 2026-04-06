import axios from 'axios';

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

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const calculationData = req.body;

    console.log('=== Расчет стоимости ===');
    console.log('Данные:', JSON.stringify(calculationData, null, 2));

    const response = await axios.post(
      KAFOLAT_PROXY_BASE,
      calculationData,
      {
        headers: {
          'param': '/calculate',
          'MTD': 'POST',
          'Content-Type': 'application/json'
        },
        auth: KAFOLAT_AUTH,
        timeout: 15000
      }
    );

    console.log('Результат расчета:', response.data);

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Calculation error:', error.message);
    
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.message,
      details: error.response?.data || null
    });
  }
}