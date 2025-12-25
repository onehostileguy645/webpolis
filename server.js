// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());











// Конфигурация авторизации Kafolat
const KAFOLAT_AUTH = {
  username: 'TBOT',
  password: 'dSDFGfgj@@$SDH2Fw'
};







// Базовый URL для прокси
const KAFOLAT_PROXY_BASE = 'https://online.kafolat.uz/online/ins/osago/proxy';














// Универсальный прокси endpoint
app.post('/api/kafolat', async (req, res) => {
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
});
















// Endpoint для отправки заявки на страхование
app.post('/api/insurance/submit', async (req, res) => {
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
          'param': '/api/',  // Только path, без base URL
          'MTD': 'POST',
          'Content-Type': 'application/json'
        },
        auth: KAFOLAT_AUTH,
        timeout: 30000  // 30 секунд для создания полиса
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

    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Ошибка при отправке заявки',
      message: error.message,
      details: error.response?.data || null
    });
  }
});












// Endpoint для расчета стоимости
app.post('/api/insurance/calculate', async (req, res) => {
  try {
    const calculationData = req.body;

    console.log('=== Расчет стоимости ===');
    console.log('Данные:', JSON.stringify(calculationData, null, 2));

    const response = await axios.post(
      KAFOLAT_PROXY_BASE,
      calculationData,
      {
        headers: {
          'param': '/calculate',  // Только path
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
});













// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(x).toISOString(),
    service: 'Kafolat Insurance Proxy'
  });
});









// Тестовый endpoint для проверки соединения
app.get('/api/test', async (req, res) => {
  try {
    const response = await axios.get('https://online.kafolat.uz', {
      timeout: 5000
    });
    res.json({
      status: 'Kafolat доступен',
      statusCode: response.status
    });
  } catch (error) {
    res.status(500).json({
      status: 'Kafolat недоступен',
      error: error.message
    });
  }
});












const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log(`🚀 Kafolat Insurance Proxy Server запущен`);
  console.log('='.repeat(60));
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📅 Время: ${new Date().toLocaleString('ru-RU')}`);
  console.log('\n📋 Доступные endpoints:');
  console.log(`   POST /api/kafolat - Универсальный прокси`);
  console.log(`   POST /api/insurance/submit - Отправка заявки`);
  console.log(`   POST /api/insurance/calculate - Расчет стоимости`);
  console.log(`   GET  /health - Проверка работоспособности`);
  console.log(`   GET  /api/test - Тест соединения с Kafolat`);
  console.log('='.repeat(60) + '\n');
});