const https = require('https');
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxRnCigtbWF2hbPXLfIP5l91l8o8sQJgT-UQrtzl6TrJnBo6r1_uUtVHSOvX_hmlFZE/exec';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = params ? SHEET_URL + '?' + params : SHEET_URL;
    const data = await new Promise((resolve, reject) => {
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          https.get(r.headers.location, (r2) => {
            let body = '';
            r2.on('data', d => body += d);
            r2.on('end', () => resolve(body));
          }).on('error', reject);
        } else {
          let body = '';
          r.on('data', d => body += d);
          r.on('end', () => resolve(body));
        }
      }).on('error', reject);
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
