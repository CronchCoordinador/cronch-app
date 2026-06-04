import https from "https";

const SHEET = "https://script.google.com/macros/s/AKfycbyjHY-d6EUTyLcRetq5j6iB8QJMpbeojiXwYZCKyIm2J7UOROx9-KtlcWhbdK8H_yMw/exec";

// Lectura/guardado normal (GET), siguiendo redirecciones de Google
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        get(res.headers.location).then(resolve).catch(reject);
      } else {
        let b = "";
        res.on("data", d => b += d);
        res.on("end", () => resolve(b));
      }
    }).on("error", reject);
  });
}

// Envío de PDF (POST). Google responde con una redirección que seguimos con GET.
function post(url, body) {
  return new Promise((resolve, reject) => {
    const r = https.request(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8", "User-Agent": "Mozilla/5.0" }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        get(res.headers.location).then(resolve).catch(reject);
      } else {
        let b = "";
        res.on("data", d => b += d);
        res.on("end", () => resolve(b));
      }
    });
    r.on("error", reject);
    r.write(body);
    r.end();
  });
}

// Lee el cuerpo del mensaje (ya parseado o como flujo)
function readBody(req) {
  return new Promise(resolve => {
    if (req.body !== undefined && req.body !== null) {
      resolve(typeof req.body === "string" ? req.body : JSON.stringify(req.body));
      return;
    }
    let data = "";
    req.on("data", c => data += c);
    req.on("end", () => resolve(data));
    req.on("error", () => resolve(""));
  });
}

export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  try {
    let data;
    if (req.method === "POST") {
      const body = await readBody(req);
      data = await post(SHEET, body);
    } else {
      const params = new URLSearchParams(req.query).toString();
      const url = params ? SHEET + "?" + params : SHEET;
      data = await get(url);
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
