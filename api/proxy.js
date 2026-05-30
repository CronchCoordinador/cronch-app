export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxRnCigtbWF2hbPXLfIP5l91l8o8sQJgT-UQrtzl6TrJnBo6r1_uUtVHSOvX_hmlFZE/exec';

  try {
    let url = SHEET_URL;
    let options = { method: 'GET' };

    if (req.method === 'POST') {
      options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      };
    } else if (req.query) {
      const params = new URLSearchParams(req.query).toString();
      if (params) url += '?' + params;
    }

    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
