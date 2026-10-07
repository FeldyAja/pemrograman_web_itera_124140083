// ===== Konstanta & State =====
const STORAGE_KEY = "keranjang_kasir";
const MIN_NAMA = 3;
const MIN_HARGA = 500;
const MIN_DISKON = 50000;
const PERSEN_DISKON = 0.1;

let keranjang = muatKeranjang();

// ===== Elemen DOM =====
const form = document.getElementById("form-barang");
const inputNama = document.getElementById("nama");
const inputHarga = document.getElementById("harga");
const inputQty = document.getElementById("qty");
const inputBayar = document.getElementById("bayar");
const isiKeranjang = document.getElementById("isi-keranjang");
const elTotal = document.getElementById("total");
const elDiskon = document.getElementById("diskon");
const elTotalAkhir = document.getElementById("total-akhir");
const elKembalian = document.getElementById("kembalian");

// ===== LocalStorage =====
function muatKeranjang() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return []; // data rusak -> mulai dari keranjang kosong
  }
}

function simpanKeranjang() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

// ===== Helper =====
function formatRupiah(angka) {
  return "Rp" + Math.round(angka).toLocaleString("id-ID");
}

function escapeHtml(teks) {
  return teks.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ===== Validasi =====
function tampilkanError(input, pesan) {
  document.getElementById("error-" + input.id).textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
}

function validasiForm() {
  const nama = inputNama.value.trim();
  const harga = Number(inputHarga.value);
  const qty = Number(inputQty.value);
  let valid = true;

  if (nama.length < MIN_NAMA) {
    tampilkanError(inputNama, `Nama barang minimal ${MIN_NAMA} karakter.`);
    valid = false;
  } else {
    tampilkanError(inputNama, "");
  }

  if (inputHarga.value === "" || isNaN(harga) || harga < MIN_HARGA) {
    tampilkanError(inputHarga, `Harga harus berupa angka minimal ${formatRupiah(MIN_HARGA)}.`);
    valid = false;
  } else {
    tampilkanError(inputHarga, "");
  }

  if (inputQty.value === "" || !Number.isInteger(qty) || qty < 1) {
    tampilkanError(inputQty, "Jumlah harus berupa bilangan bulat minimal 1.");
    valid = false;
  } else {
    tampilkanError(inputQty, "");
  }

  return valid;
}

// ===== Kalkulator =====
function hitungTotal() {
  return keranjang.reduce((jumlah, item) => jumlah + item.harga * item.qty, 0);
}

function hitungDiskon(total) {
  return total >= MIN_DISKON ? Math.round(total * PERSEN_DISKON) : 0;
}

function hitungKembalian() {
  const totalAkhir = hitungTotal() - hitungDiskon(hitungTotal());
  const bayar = Number(inputBayar.value);
  elKembalian.className = "kembalian";

  if (keranjang.length === 0 || inputBayar.value === "") {
    elKembalian.textContent = "";
  } else if (bayar < totalAkhir) {
    elKembalian.textContent = `Uang belum mencukupi, kurang ${formatRupiah(totalAkhir - bayar)}.`;
    elKembalian.classList.add("kurang");
  } else {
    elKembalian.textContent = `Kembalian: ${formatRupiah(bayar - totalAkhir)}`;
    elKembalian.classList.add("ok");
  }
}

// ===== Tampilan =====
function render() {
  if (keranjang.length === 0) {
    isiKeranjang.innerHTML = `<tr><td colspan="6" class="kosong">Keranjang masih kosong. Tambahkan barang lewat form.</td></tr>`;
  } else {
    isiKeranjang.innerHTML = keranjang.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(item.nama)}</td>
        <td class="num">${formatRupiah(item.harga)}</td>
        <td class="num">${item.qty}</td>
        <td class="num">${formatRupiah(item.harga * item.qty)}</td>
        <td><button class="btn btn-hapus" data-index="${i}">Hapus</button></td>
      </tr>
    `).join("");
  }

  const total = hitungTotal();
  const diskon = hitungDiskon(total);
  elTotal.textContent = formatRupiah(total);
  elDiskon.textContent = (diskon > 0 ? "-" : "") + formatRupiah(diskon);
  elTotalAkhir.textContent = formatRupiah(total - diskon);
  hitungKembalian();
}

// ===== Event Handler =====
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validasiForm()) return; // data tidak valid -> tidak masuk keranjang

  keranjang.push({
    nama: inputNama.value.trim(),
    harga: Number(inputHarga.value),
    qty: Number(inputQty.value),
  });
  simpanKeranjang();
  render();
  form.reset();
  inputNama.focus();
});

isiKeranjang.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn-hapus")) return;
  keranjang.splice(Number(e.target.dataset.index), 1);
  simpanKeranjang();
  render();
});

inputBayar.addEventListener("input", hitungKembalian);

document.getElementById("btn-reset").addEventListener("click", function () {
  keranjang = [];
  localStorage.removeItem(STORAGE_KEY);
  inputBayar.value = "";
  render();
});

// Tampilkan data tersimpan saat halaman pertama kali dibuka
render();