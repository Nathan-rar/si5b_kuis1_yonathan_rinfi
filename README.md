# Kuis 1 — Refactor RESTful API ke Arsitektur Backend Terstruktur

**Mata Kuliah:** Pengembangan Aplikasi Web II (SUB-CPMK-6)
**Kelas:** SI5B
**Nama:** Yonathan Rinfi
**NPM:** 2428240101
**Dosen:** Nur Rachmat, M.Kom.

## Topik Tugas 1

**Coworking Space — Reservasi Ruang Rapat** (Topik 28), dengan entitas utama
`meeting-reservations` dan alamat dasar `/meeting-reservations`.

## Tentang kuis ini

Kuis ini meminta refactor API dari Tugas 1 — yang semula seluruh kodenya berada
di dalam satu berkas `app.js` — menjadi arsitektur backend terstruktur dengan
pemisahan tanggung jawab:

| Folder | Tanggung jawab |
|---|---|
| `models/` | Menyimpan data dan fungsi pengolahannya, **tanpa** memakai `req` dan `res` |
| `controllers/` | Menangani request, validasi, dan menyusun response |
| `routes/` | Memetakan alamat ke fungsi controller memakai `express.Router()` |
| `middlewares/` | Logger, `cekApiKey`, dan penanganan error terpusat |

Perilaku API tetap sama seperti sebelum refactor, kecuali `DELETE` yang kini
membalas **204 No Content** sesuai ketentuan Kuis 1 (pada Tugas 1 masih 200).

## Struktur folder

```text
si5b_kuis1_yonathan_rinfi/
├── models/
│   └── reservationModel.js
├── controllers/
│   └── reservationController.js
├── routes/
│   └── reservationRoutes.js
├── middlewares/
│   ├── logger.js
│   ├── cekApiKey.js
│   └── errorHandler.js
├── app.js
├── .env
├── .env.example
├── .gitignore
└── package.json
```

## Daftar endpoint

| No | Metode | Alamat | API key | Status sukses | Fungsi |
|---|---|---|---|---|---|
| 1 | GET | `/meeting-reservations` | Tidak | 200 | Ambil semua data (bisa difilter `?tanggal=YYYY-MM-DD`) |
| 2 | GET | `/meeting-reservations/:id` | Tidak | 200 | Ambil satu data |
| 3 | POST | `/meeting-reservations` | Ya | 201 | Tambah data |
| 4 | PUT | `/meeting-reservations/:id` | Ya | 200 | Ubah data |
| 5 | DELETE | `/meeting-reservations/:id` | Ya | 204 | Hapus data |

Field data: `id`, `namaPemesan`, `ruang`, `tanggal`, `jamMulai`, `durasiJam`.
Field wajib saat POST: `namaPemesan`, `ruang`, `tanggal`, `jamMulai`, `durasiJam`.

## Cara menjalankan

```bash
npm install
cp .env.example .env     # lalu isi API_KEY
npm start
```

Server berjalan di `http://localhost:4000` (nilai `PORT` dari `.env`).

## Pengujian

Diuji dengan `curl` — 5 skenario berhasil dan 4 skenario gagal:

| ID | Skenario | Harapan | Hasil |
|---|---|---|---|
| T01 | Menampilkan semua data | 200 | 200 OK |
| T02 | Menampilkan satu data berdasarkan ID | 200 | 200 OK |
| T03 | Menambah data baru | 201 | 201 Created |
| T04 | Mengubah data | 200 | 200 OK |
| T05 | Menghapus data | 204 | 204 No Content |
| N01 | Menambah data tanpa API key | 401 | 401 Unauthorized |
| N02 | Menambah data dengan body tidak lengkap | 400 | 400 Bad Request |
| N03 | Mengirim JSON yang rusak | 400 | 400 Bad Request |
| N04 | Mengambil ID yang tidak ada | 404 | 404 Not Found |

## Dokumentasi

Bukti pengerjaan (12 tangkapan layar beserta penjelasan) ada di:

```text
PAW2_Kuis1_SI5B_2428240101_Yonathan_Rinfi.docx
```

## Catatan keamanan

Berkas `.env` berisi `API_KEY` dan **tidak** ikut terunggah (tercantum di
`.gitignore`). Berkas `.env.example` disertakan sebagai contoh.
