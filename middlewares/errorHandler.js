// Middleware penanganan error terpusat.
// Berkas ini menampung dua hal: 404 untuk rute yang tidak ada, dan error handler
// utama yang memastikan SEMUA kesalahan dibalas dalam bentuk JSON yang rapi.

// Dipanggil ketika tidak ada route yang cocok dengan alamat yang diminta.
function notFound(req, res) {
  return res.status(404).json({
    status: "error",
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
    data: null,
  });
}

// Error handler utama. Wajib memiliki 4 parameter agar Express mengenalinya.
function errorHandler(err, req, res, next) {
  // Bila response sudah terkirim sebagian, serahkan ke handler bawaan Express.
  if (res.headersSent) {
    return next(err);
  }

  // express.json() melempar SyntaxError bila body JSON rusak (misalnya koma berlebih).
  // Tanpa handler ini, Express akan membalas halaman HTML berisi jejak error.
  const isMalformedJson =
    err instanceof SyntaxError && err.status === 400 && "body" in err;

  const statusCode = isMalformedJson ? 400 : 500;
  const message = isMalformedJson
    ? "Format JSON request tidak valid"
    : "Terjadi kesalahan pada server";

  if (!isMalformedJson) {
    console.error("[errorHandler]", err);
  }

  return res.status(statusCode).json({
    status: "error",
    message,
    data: null,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
