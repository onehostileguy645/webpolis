import axios from 'axios';
import cors from 'cors';

const KAFOLAT_AUTH = {
  username: 'TBOT',
  password: 'dSDFGfgj@@$SDH2Fw'
};

const KAFOLAT_PROXY_BASE = 'https://online.kafolat.uz/online/ins/osago/proxy';

const corsMiddleware = cors();

export default async function handler(req, res) {
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
    console.error('Details:', error.response?.data);
    
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.message,
      details: error.response?.data || null
    });
  }
}