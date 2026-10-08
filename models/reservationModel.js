// Model: menyimpan data reservasi dan fungsi pengolahannya.
// Lapisan ini sengaja tidak memakai req maupun res supaya tidak bergantung pada HTTP.

// Data awal reservasi ruang rapat (tanpa database, sesuai Tugas 1).
let meetingReservations = [
  {
    id: 1,
    namaPemesan: "PT Maju Digital",
    ruang: "Ruang Kenanga",
    tanggal: "2026-10-05",
    jamMulai: "13:00",
    durasiJam: 2,
  },
  {
    id: 2,
    namaPemesan: "CV Kreatif Nusantara",
    ruang: "Ruang Melati",
    tanggal: "2026-10-06",
    jamMulai: "09:30",
    durasiJam: 1.5,
  },
  {
    id: 3,
    namaPemesan: "Tim Sistem Informasi",
    ruang: "Ruang Anggrek",
    tanggal: "2026-10-05",
    jamMulai: "15:00",
    durasiJam: 2,
  },
];

// ID berikutnya yang akan diberikan saat data baru ditambahkan.
let nextId = 4;

// Mengambil seluruh data. Bila parameter tanggal diisi, hasilnya disaring.
function findAll(tanggal) {
  if (tanggal === undefined) {
    return [...meetingReservations];
  }

  return meetingReservations.filter((reservation) => reservation.tanggal === tanggal);
}

// Mengambil satu data berdasarkan id. Mengembalikan null bila tidak ada.
function findById(id) {
  const reservation = meetingReservations.find((item) => item.id === id);
  return reservation ?? null;
}

// Menyimpan data baru. ID dibuat otomatis oleh model, bukan oleh pengguna.
function create(fields) {
  const newReservation = {
    id: nextId,
    ...fields,
  };

  nextId += 1;
  meetingReservations.push(newReservation);

  return newReservation;
}

// Mengubah data yang sudah ada. Mengembalikan null bila id tidak ditemukan.
function update(id, fields) {
  const index = meetingReservations.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedReservation = {
    id,
    ...fields,
  };

  meetingReservations[index] = updatedReservation;

  return updatedReservation;
}

// Menghapus data. Mengembalikan true bila ada yang terhapus.
function remove(id) {
  const index = meetingReservations.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  meetingReservations.splice(index, 1);

  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
