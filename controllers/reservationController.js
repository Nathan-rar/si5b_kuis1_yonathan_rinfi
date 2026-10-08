// Controller: menangani request, melakukan validasi, dan menyusun response.
// Lapisan ini yang berbicara dengan req dan res, lalu memanggil model.

const reservationModel = require("../models/reservationModel");

// Memeriksa apakah tanggal benar-benar valid dan berformat YYYY-MM-DD.
function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// Memeriksa seluruh field wajib. Mengembalikan pesan kesalahan atau null bila lolos.
function validateReservation(body) {
  const requiredStrings = ["namaPemesan", "ruang"];

  for (const field of requiredStrings) {
    if (typeof body[field] !== "string" || body[field].trim() === "") {
      return `Field ${field} wajib diisi dengan teks`;
    }
  }

  if (!isValidDate(body.tanggal)) {
    return "Field tanggal wajib berformat YYYY-MM-DD dan berisi tanggal yang valid";
  }

  if (
    typeof body.jamMulai !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.jamMulai)
  ) {
    return "Field jamMulai wajib berformat HH:mm yang valid";
  }

  if (
    typeof body.durasiJam !== "number" ||
    !Number.isFinite(body.durasiJam) ||
    body.durasiJam <= 0
  ) {
    return "Field durasiJam wajib berupa angka lebih dari 0";
  }

  return null;
}

// Mengambil field yang boleh diisi pengguna, tanpa menyertakan id.
function pickReservationFields(body) {
  return {
    namaPemesan: body.namaPemesan.trim(),
    ruang: body.ruang.trim(),
    tanggal: body.tanggal,
    jamMulai: body.jamMulai,
    durasiJam: body.durasiJam,
  };
}

// GET /meeting-reservations
function getAllReservations(req, res) {
  const { tanggal } = req.query;
  const reservations = reservationModel.findAll(tanggal);

  return res.status(200).json(reservations);
}

// GET /meeting-reservations/:id
function getReservationById(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const reservation = reservationModel.findById(id);

  if (reservation === null) {
    return res.status(404).json({
      status: "error",
      message: `Data reservasi dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  return res.status(200).json(reservation);
}

// POST /meeting-reservations
function createReservation(req, res) {
  const validationError = validateReservation(req.body || {});

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const newReservation = reservationModel.create(pickReservationFields(req.body));

  return res.status(201).json({
    status: "success",
    message: "Data reservasi berhasil ditambahkan",
    data: newReservation,
  });
}

// PUT /meeting-reservations/:id
function updateReservation(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const existing = reservationModel.findById(id);

  if (existing === null) {
    return res.status(404).json({
      status: "error",
      message: `Data reservasi dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  const validationError = validateReservation(req.body || {});

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const updatedReservation = reservationModel.update(id, pickReservationFields(req.body));

  return res.status(200).json({
    status: "success",
    message: `Data reservasi dengan id ${id} berhasil diperbarui`,
    data: updatedReservation,
  });
}

// DELETE /meeting-reservations/:id
// Mengembalikan 204 No Content sesuai ketentuan Kuis 1 (tanpa isi respons).
function deleteReservation(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const deleted = reservationModel.remove(id);

  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: `Data reservasi dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  return res.status(204).send();
}

// GET / - informasi API
function getApiInfo(req, res) {
  return res.status(200).json({
    namaMahasiswa: "Yonathan Rinfi",
    nim: "2428240101",
    kelas: "SI5B",
    nomorTopik: 28,
    namaTopik: "Coworking Space - Reservasi Ruang Rapat",
    arsitektur: "routes - controllers - models - middlewares",
    endpoints: [
      "GET /meeting-reservations",
      "GET /meeting-reservations/:id",
      "POST /meeting-reservations",
      "PUT /meeting-reservations/:id",
      "DELETE /meeting-reservations/:id",
      "GET /meeting-reservations?tanggal=YYYY-MM-DD",
    ],
  });
}

module.exports = {
  getApiInfo,
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
