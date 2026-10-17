// Mengambil elemen HTML target
let output = document.getElementById("outputLatihan1");
let htmlKonten = "";

// 1. Latihan Data Diri (const & let)
const nama = "Feldy";
let umur = 20;
const kotaAsal = "Bandar Lampung";
htmlKonten += `<h3>1. Data Diri</h3>
               <p>Nama: <b>${nama}</b>, Umur: <b>${umur}</b>, Kota: <b>${kotaAsal}</b></p>`;

// 2. Pengecekan Kelulusan (if-else)
let nilaiUjian = 75;
let statusLulus = "";
if (nilaiUjian >= 70) {
    statusLulus = "Lulus";
} else {
    statusLulus = "Tidak Lulus";
}
htmlKonten += `<h3>2. Pengecekan Kelulusan</h3>
               <p>Nilai: ${nilaiUjian} -> Status: <b>${statusLulus}</b></p>`;

// 3. Kategori Umur (if-else if)
let usia = 15;
let kategori = "";
if (usia < 12) {
    kategori = "Anak-anak";
} else if (usia <= 17) {
    kategori = "Remaja";
} else if (usia <= 59) {
    kategori = "Dewasa";
} else {
    kategori = "Lansia";
}
htmlKonten += `<h3>3. Kategori Umur</h3>
               <p>Usia ${usia} tahun termasuk kategori: <b>${kategori}</b></p>`;

// 4. Konversi Hari (switch-case)
let angkaHari = 3;
let namaHari = "";
switch (angkaHari) {
    case 1: namaHari = "Senin"; break;
    case 2: namaHari = "Selasa"; break;
    case 3: namaHari = "Rabu"; break;
    case 4: namaHari = "Kamis"; break;
    case 5: namaHari = "Jumat"; break;
    case 6: namaHari = "Sabtu"; break;
    case 7: namaHari = "Minggu"; break;
    default: namaHari = "Hari tidak valid";
}
htmlKonten += `<h3>4. Konversi Hari</h3>
               <p>Hari ke-${angkaHari} adalah hari <b>${namaHari}</b></p>`;

// 5. Kalkulator Grade (Ternary Operator)
let skor = 85;
let grade = (skor >= 90) ? "A" : (skor >= 80) ? "B" : (skor >= 70) ? "C" : "D";
htmlKonten += `<h3>5. Kalkulator Grade</h3>
               <p>Skor ${skor} mendapatkan grade: <b style="color: #0f766e; font-size: 1.2rem;">${grade}</b></p>`;

// Mencetak semua isi variabel htmlKonten ke dalam antarmuka HTML
output.innerHTML = htmlKonten;