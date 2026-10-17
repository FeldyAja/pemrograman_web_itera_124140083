# Dashboard Cuaca & Waktu

Tugas Praktikum Pengembangan Aplikasi Web, Pertemuan 2 (JavaScript Next Gen / ES6+).

Nama = Feldy

NIM = 124140083

Kelas = RB

Program Studi = Teknik Informatika, Institut Teknologi Sumatera

## Tentang aplikasi

Dari pilihan tema di tugas, saya memilih dashboard cuaca dan waktu real-time. Bagian atas halaman menampilkan jam digital yang berjalan tiap detik sesuai zona waktu perangkat. Di bawahnya ada kartu untuk tiap kota yang dipantau, berisi jam lokal dan cuaca terkininya. Kota awalnya kampus ITERA di Lampung Selatan, memakai koordinat dari contoh di materi bagian rekomendasi sumber API.

Yang bisa dilakukan di aplikasi ini:

- Menambah kota dengan mencari namanya, lalu memilih dari hasil pencarian (maksimal 8 kota).
- Menambah lokasi lewat koordinat (latitude dan longitude), untuk tempat yang tidak ketemu di pencarian karena bukan nama kota, misalnya sebuah kampus. Koordinat bisa disalin dari Google Maps dengan klik kanan pada titik yang dimaksud. Zona waktu lokasinya diambil otomatis dari respons cuaca.
- Mengedit nama tampilan dan keterangan kota lewat dialog.
- Menghapus kota. Kalau semuanya terhapus, ada tombol untuk mengembalikan kota bawaan.
- Melihat suhu, kondisi cuaca, suhu maksimum dan minimum hari ini, peluang hujan, serta kecepatan angin. Cuaca diperbarui otomatis tiap 10 menit atau lewat tombol "Perbarui cuaca".
- Mengganti satuan suhu antara °C dan °F.

Daftar kota, satuan suhu, dan data cuaca terakhir disimpan di localStorage, jadi tidak hilang waktu halaman ditutup. Kalau internet sedang mati, kartu tetap menampilkan data terakhir yang tersimpan.

## Screenshot

Tampilan utama :

![Tampilan utama dashboard](screenshots/dashboard.png)

Pencarian kota :

![Dialog edit kota](screenshots/edit-kota.png)

Pencarian dengan koordinat :

![Dialog edit kota](screenshots/edit-kota.png)

Dialog edit kota :

![Dialog edit kota](screenshots/edit-kota.png)



## API yang dipakai

Semuanya dari Open-Meteo, gratis dan tanpa API key. Untuk cuaca saya memakai endpoint forecast dengan `current_weather=true`, ditambah parameter `daily` untuk suhu maksimum/minimum dan peluang hujan, serta `timezone=auto` supaya zona waktu kota ikut terkirim. Untuk mencari kota saya memakai endpoint geocoding dari layanan yang sama, supaya kota bisa ditambah lewat nama. Kalau lokasinya tidak ketemu lewat nama, tersedia input koordinat yang langsung dikirim ke endpoint cuaca. Jamnya tidak butuh API, cukup `Intl.DateTimeFormat` bawaan browser.

- Cuaca: `https://api.open-meteo.com/v1/forecast`
- Pencarian kota: `https://geocoding-api.open-meteo.com/v1/search`

## Cara menjalankan

1. Buka folder proyek ini di VS Code.
2. Klik kanan `index.html`, pilih **Open with Live Server**.
3. Pastikan komputer terhubung ke internet supaya cuacanya bisa dimuat.

`index.html` jangan dibuka dengan klik dua kali. Karena memakai `type="module"`, browser memblokir `import` kalau dibuka lewat `file://`.

## Struktur folder

```text
Feldy_124140083_pertemuan2/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── main.js            titik masuk, menyiapkan elemen lalu menjalankan aplikasi
│   ├── app.js             class CityItem dan DashboardApp
│   └── modules/
│       ├── data.js        konstanta, kota bawaan, tabel kode cuaca
│       └── utils.js       fungsi format suhu, jam, tanggal, dan escape HTML
└── screenshots/
```

Mengikuti panduan arsitektur di modul materi (website praktikum), `CityItem` dipakai untuk satu item data dan `DashboardApp` untuk mengelola state, localStorage, dan `fetch()`. Di modul item-nya bernama `TaskItem`. Karena isi dashboard saya kota dan cuaca, bukan tugas, namanya saya ganti jadi `CityItem`.

## Fitur ES6+ dan lokasinya

| Fitur | Lokasi |
|---|---|
| `const` | `js/app.js` baris 56, `js/modules/data.js` baris 4 |
| `let` | `js/app.js` baris 109 |
| Arrow function | `js/modules/utils.js` baris 6, `js/modules/utils.js` baris 9, `js/modules/utils.js` baris 32, `js/app.js` baris 176, `js/app.js` baris 249, `js/main.js` baris 10 |
| Template literals | `js/app.js` baris 154, `js/app.js` baris 214, `js/modules/utils.js` baris 12 |
| Async/await | `js/app.js` baris 55, `js/app.js` baris 80, `js/app.js` baris 94, `js/app.js` baris 102 |
| Classes (constructor, getter, static) | `js/app.js` baris 6, `js/app.js` baris 12, `js/app.js` baris 19, `js/app.js` baris 26 |
| Destructuring | `js/app.js` baris 67, `js/app.js` baris 98, `js/app.js` baris 146, `js/app.js` baris 29 |
| Spread operator | `js/app.js` baris 108, `js/app.js` baris 269 |
| Default parameters | `js/app.js` baris 7, `js/modules/utils.js` baris 9 |
| Property shorthand | `js/app.js` baris 48 |
| Optional chaining dan `??` | `js/app.js` baris 166, `js/app.js` baris 13 |
| Array methods | `js/app.js` baris 133, `js/app.js` baris 121, `js/app.js` baris 105 |
| Modules (`import` / `export`) | `js/app.js` baris 2, `js/main.js` baris 3 |

Untuk operasi asinkron saya memilih async/await, tidak memakai rantai `.then()`. Di `refreshAll` ada `Promise.allSettled` (`js/app.js` baris 83), tapi hanya untuk menunggu semua kota selesai dimuat sekaligus dan tetap dipanggil dengan `await`, seperti contoh eksekusi paralel di modul. Dengan begitu satu kota yang gagal tidak menghentikan kota lainnya.

## Data di localStorage

Semuanya disimpan dalam satu key, `dashboard-cuaca-waktu`, berbentuk JSON:

```json
{
  "unit": "C",
  "cities": [
    { "id": "...", "name": "Kampus ITERA", "label": "Lampung Selatan",
      "latitude": -5.36, "longitude": 105.31, "timezone": "Asia/Jakarta",
      "weather": { "temp": 30.1, "wind": 8.2, "code": 2, "isDay": 1, "max": 32, "min": 24, "rain": 40 } }
  ]
}
```

Data ditulis di `js/app.js` baris 48 dan dibaca di `js/app.js` baris 38. Kalau isinya rusak atau belum ada, aplikasi memakai kota bawaan.

## Catatan

Nama kota berasal dari API dan input pengguna, jadi saya lewatkan `escapeHtml()` dulu sebelum dimasukkan ke `innerHTML`. Jam hanya mengganti teks elemen `<time>` tiap detik tanpa merender ulang kartu, supaya tombol dan dialog tidak terganggu.
