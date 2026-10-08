// Titik masuk aplikasi.
// Berkas ini hanya merakit middleware dan route, lalu menjalankan server.

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middleware bawaan / pihak ketiga
app.use(cors());
app.use(logger);
app.use(express.json());

// Route utama
app.use("/", reservationRoutes);

// Penanganan error terpusat (harus paling bawah)
app.use(notFound);
app.use(errorHandler);

// Port diambil dari .env supaya tidak ditulis langsung di kode.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;
