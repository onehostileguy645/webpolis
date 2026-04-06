const axios = require('axios');

const KAFOLAT_AUTH = {
  username: 'TBOT',
  password: 'dSDFGfgj@@$SDH2Fw'
};

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
    const insuranceData = req.body;

    console.log('=== Отправка заявки на страхование ===');
    console.log('Данные:', JSON.stringify(insuranceData, null, 2));
    console.log('Timestamp:', new Date().toISOString());

    const response = await axios.post(
      'https://online.kafolat.uz/online/ins/osago/create',
      insuranceData,
      {
        headers: {
          'param': '/api/',
          'MTD': 'POST',
          'Content-Type': 'application/json'
        },
        auth: KAFOLAT_AUTH,
        timeout: 30000
      }
    );

    console.log('=== Успешный ответ от Kafolat ===');
    console.log(JSON.stringify(response.data, null, 2));

    res.json({
      success: true,
      message: 'Заявка успешно отправлена',
      data: response.data
    });

  } catch (error) {
    console.error('=== Ошибка при отправке заявки ===');
    console.error('Message:', error.message);
    console.error('Status:', error.response?.status);
    console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Stack:', error.stack);

    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Ошибка при отправке заявки',
      message: error.message,
      details: error.response?.data || null
    });
  }
};