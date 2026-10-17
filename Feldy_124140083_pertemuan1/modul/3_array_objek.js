// 1. Array of Objects Mahasiswa
let dataMhs = [
    { nim: "12414001", nama: "Andi", nilai: 80 },
    { nim: "12414002", nama: "Budi", nilai: 95 },
    { nim: "12414003", nama: "Citra", nilai: 75 }, //[cite: 22]
    { nim: "12414004", nama: "Doni", nilai: 88 },
    { nim: "12414005", nama: "Eka", nilai: 92 }
];

// Read: Menampilkan Tabel
function renderTabel(data = dataMhs) {
    let tbody = document.getElementById("tabelMhs");
    tbody.innerHTML = data.map((m, i) => `
        <tr>
            <td>${m.nim}</td><td>${m.nama}</td><td>${m.nilai}</td>
            <td><button class="btn-danger" onclick="hapusMhs(${i})">Delete</button></td>
        </tr>
    `).join(""); //[cite: 22]
}

// Create: Menambah Mahasiswa
function tambahMhs() {
    let nama = document.getElementById("namaMhs").value;
    let nim = document.getElementById("nimMhs").value;
    let nilai = Number(document.getElementById("nilaiMhs").value);
    dataMhs.push({ nim, nama, nilai }); //[cite: 22]
    renderTabel();
}

// Delete: Menghapus Mahasiswa
function hapusMhs(index) {
    dataMhs.splice(index, 1); //[cite: 22]
    renderTabel();
}

// 2. Mencari Nilai Tertinggi
function cariTertinggi() {
    let max = dataMhs.reduce((prev, current) => (prev.nilai > current.nilai) ? prev : current); //[cite: 22]
    alert(`Nilai tertinggi: ${max.nama} (${max.nilai})`);
}

// 3. Filter di Atas Rata-rata
function filterAtasRataRata() {
    let total = dataMhs.reduce((sum, m) => sum + m.nilai, 0);
    let rataRata = total / dataMhs.length;
    let hasil = dataMhs.filter(m => m.nilai > rataRata); //[cite: 22]
    renderTabel(hasil);
}

// 4. Mengurutkan Berdasarkan Nama
function urutkanNama() {
    dataMhs.sort((a, b) => a.nama.localeCompare(b.nama)); //[cite: 22]
    renderTabel();
}

renderTabel();