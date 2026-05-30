const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxRnCigtbWF2hbPXLfIP5l91l8o8sQJgT-UQrtzl6TrJnBo6r1_uUtVHSOvX_hmlFZE/exec';
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = params ? `${SHEET_URL}?${params}` : SHEET_URL;
    const response = await fetch(url, { redirect: 'follow' });
    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
