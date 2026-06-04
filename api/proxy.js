import https from "https";
const SHEET = "https://script.google.com/macros/s/AKfycbxRnCigtbWF2hbPXLfIP5I91I8o8sQJgT-UQrtzI6TrJnBo6r1_uUtVHSOvX_hmIFZE/exec";
function get(url) 
  return new Promise((resolve, reject) => {
    https.get(url, {headers:{"User-Agent":"Mozilla/5.0"}}, res => {
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
export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = params ? SHEET + "?" + params : SHEET;
    const data = await get(url);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch(e) {
    res.status(500).json({ok:false,error:e.message});
  }
};
