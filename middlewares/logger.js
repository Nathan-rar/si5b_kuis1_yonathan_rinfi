// Middleware logger: mencatat setiap request yang masuk beserta waktu dan durasinya.

function logger(req, res, next) {
  const waktuMulai = Date.now();
  const waktuMasuk = new Date().toISOString();

  console.log(`[${waktuMasuk}] ${req.method} ${req.originalUrl}`);

  // Dicatat lagi setelah response selesai dikirim, supaya durasinya akurat.
  res.on("finish", () => {
    const durasi = Date.now() - waktuMulai;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durasi} ms)`,
    );
  });

  next();
}

module.exports = logger;
