// Route: memetakan alamat (URL) ke fungsi controller memakai express.Router().
// Rute POST, PUT, dan DELETE dilindungi middleware cekApiKey.

const express = require("express");
const reservationController = require("../controllers/reservationController");
const cekApiKey = require("../middlewares/cekApiKey");

const router = express.Router();

// Informasi API
router.get("/", reservationController.getApiInfo);

// Rute publik (tanpa API key)
router.get("/meeting-reservations", reservationController.getAllReservations);
router.get("/meeting-reservations/:id", reservationController.getReservationById);

// Rute terproteksi (wajib header x-api-key)
router.post("/meeting-reservations", cekApiKey, reservationController.createReservation);
router.put("/meeting-reservations/:id", cekApiKey, reservationController.updateReservation);
router.delete("/meeting-reservations/:id", cekApiKey, reservationController.deleteReservation);

module.exports = router;
