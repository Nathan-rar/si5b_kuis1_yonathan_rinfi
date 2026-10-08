// Middleware cekApiKey: melindungi rute POST, PUT, dan DELETE.
// Request hanya lanjut bila header x-api-key cocok dengan API_KEY pada .env.

function cekApiKey(req, res, next) {
  const apiKeyDikirim = req.header("x-api-key");
  const apiKeyBenar = process.env.API_KEY;

  if (!apiKeyDikirim) {
    return res.status(401).json({
      status: "error",
      message: "API key wajib dikirim pada header x-api-key",
      data: null,
    });
  }

  if (apiKeyDikirim !== apiKeyBenar) {
    return res.status(401).json({
      status: "error",
      message: "API key tidak valid",
      data: null,
    });
  }

  return next();
}

module.exports = cekApiKey;
