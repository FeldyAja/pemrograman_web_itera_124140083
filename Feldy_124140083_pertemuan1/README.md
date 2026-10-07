# Tugas Praktikum Pertemuan 1 - Kasir Mini POS

## Identitas

| | |
|---|---|
| Nama | Feldy |
| NIM | 124140083 |
| Kelas Praktikum | RB |
| Mata Kuliah | Pengembangan Aplikasi Web (PAW) |
| Program Studi | Teknik Informatika, Institut Teknologi Sumatera (ITERA) |

## Deskripsi Aplikasi

Aplikasi ini adalah **Kasir & Keranjang Belanja Sederhana (Mini POS)** berbasis web. Studi kasus yang dipilih adalah kasir kantin kampus (Kasir Kantin GK2). Kasir dapat mencatat barang yang dibeli, melihat total belanja, mendapat potongan diskon otomatis, lalu menghitung kembalian dari uang yang diterima.

Aplikasi dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework) dengan tujuan menerapkan materi Pertemuan 1, yaitu validasi input form, perhitungan otomatis, manipulasi DOM, dan penyimpanan data dengan `localStorage`.

## Panduan Menjalankan

1. Download atau clone repository ini, lalu buka foldernya di VS Code.
2. Install ekstensi **Live Server** di VS Code (jika belum ada).
3. Klik kanan pada file `index.html`, pilih **Open with Live Server**.
4. Aplikasi akan terbuka di browser (biasanya di `http://127.0.0.1:5500`).

Aplikasi ini tidak membutuhkan server khusus, sehingga file `index.html` juga bisa langsung dibuka dengan klik dua kali di browser.

## Daftar Fitur

**Validasi form**
- [x] Nama barang wajib diisi, minimal 3 karakter
- [x] Harga satuan wajib angka, minimal Rp500
- [x] Jumlah wajib bilangan bulat, minimal 1
- [x] Pesan error berwarna merah muncul di bawah input yang salah
- [x] Barang yang tidak valid tidak masuk ke keranjang
- [x] Form otomatis di-reset setelah barang berhasil ditambahkan

**Kalkulator**
- [x] Subtotal per barang (harga x qty)
- [x] Total belanja dari seluruh isi keranjang
- [x] Diskon 10% jika total belanja minimal Rp50.000
- [x] Total akhir setelah diskon
- [x] Input uang bayar dan kembalian otomatis
- [x] Keterangan "uang belum mencukupi" jika uang bayar kurang

**Keranjang dan localStorage**
- [x] Tabel keranjang (No, Nama Barang, Harga, Qty, Subtotal, Aksi)
- [x] Tombol Hapus pada setiap baris, total dan diskon dihitung ulang otomatis
- [x] Isi keranjang tersimpan di `localStorage` dan tidak hilang saat halaman di-refresh
- [x] Tombol Transaksi Baru untuk mengosongkan keranjang dan membersihkan `localStorage`
- [x] Tampilan responsif untuk layar kecil

## Tangkapan Layar

**1. Tampilan form input utama**

![Tampilan form input utama](Feldy_124140083_pertemuan1/img/form-input.png)

**2. Tampilan saat validasi error muncul**

![Tampilan validasi error](Feldy_124140083_pertemuan1/img/validasi-error.png)

**3. Tampilan hasil perhitungan dan tabel keranjang**

![Tampilan hasil perhitungan](Feldy_124140083_pertemuan1/img/hasil-bayar.png)

## Penjelasan Teknis Singkat

### 1. Validasi input

Saat tombol "Tambah ke keranjang" ditekan, event `submit` pada form dijalankan dan `e.preventDefault()` dipakai agar halaman tidak reload. Setelah itu fungsi `validasiForm()` memeriksa tiga input:

- nama: setelah `trim()`, panjangnya harus minimal 3 karakter,
- harga: tidak boleh kosong, harus angka, dan minimal 500,
- qty: tidak boleh kosong dan harus bilangan bulat minimal 1 (dicek dengan `Number.isInteger()`).

Jika ada input yang salah, fungsi `tampilkanError()` menulis pesan ke elemen `<small class="error">` di bawah input dan menambahkan class `invalid` agar border input menjadi merah. Fungsi `validasiForm()` mengembalikan `true` atau `false`. Jika `false`, proses berhenti dan barang tidak dimasukkan ke array `keranjang`.

### 2. Algoritma kalkulator

- `hitungTotal()` menjumlahkan `harga * qty` dari setiap item di array `keranjang` menggunakan `reduce()`.
- `hitungDiskon(total)` mengembalikan 10% dari total jika total >= 50.000, selain itu bernilai 0.
- Total akhir = total belanja - diskon.
- `hitungKembalian()` membandingkan uang bayar dengan total akhir. Jika uang bayar kurang, ditampilkan pesan uang belum mencukupi beserta kekurangannya. Jika cukup, ditampilkan kembalian = uang bayar - total akhir. Fungsi ini dijalankan setiap kali input uang bayar berubah (event `input`) dan setiap kali tampilan diperbarui.
- `formatRupiah()` memformat angka ke format Rupiah dengan `toLocaleString("id-ID")`.

### 3. Menampilkan data (render)

Fungsi `render()` menampilkan ulang isi tabel dari array `keranjang` dengan `map()` dan `join()` ke dalam `innerHTML`, lalu memperbarui total belanja, diskon, total akhir, dan kembalian. Fungsi ini dipanggil setiap kali data berubah (tambah, hapus, reset) dan saat halaman pertama kali dibuka. Nama barang diproses dengan `escapeHtml()` supaya karakter HTML pada input tidak dijalankan sebagai kode.

### 4. Serialisasi localStorage

Data keranjang berupa array of object (`nama`, `harga`, `qty`). Karena `localStorage` hanya bisa menyimpan string, alurnya sebagai berikut:

- **Simpan:** `simpanKeranjang()` mengubah array menjadi string dengan `JSON.stringify()`, lalu menyimpannya dengan `localStorage.setItem()` pada key `keranjang_kasir`.
- **Muat:** saat halaman dibuka, `muatKeranjang()` mengambil string dengan `localStorage.getItem()` lalu mengubahnya kembali menjadi array dengan `JSON.parse()`. Proses ini dibungkus `try...catch`, sehingga jika data rusak, keranjang dimulai dari array kosong.
- **Reset:** tombol Transaksi Baru mengosongkan array `keranjang` dan menghapus data dengan `localStorage.removeItem()`.
