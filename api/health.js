export default function handler(req, res) {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Kafolat Insurance Proxy'
  });
}