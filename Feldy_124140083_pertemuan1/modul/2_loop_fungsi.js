// 1. Loop Tabel Perkalian
function cetakPerkalian() {
    let angka = Number(document.getElementById('inputPerkalian').value);
    let areaHasil = document.getElementById('hasilPerkalian');
    
    if (angka === 0) return; // Validasi sederhana

    let htmlOutput = `<b>Tabel Perkalian ${angka}:</b><br>`;
    
    // Perulangan 1 sampai 10 sesuai instruksi
    for (let i = 1; i <= 10; i++) {
        htmlOutput += `${angka} x ${i} = ${angka * i}<br>`; //
    }
    
    areaHasil.innerHTML = htmlOutput;
}

// 2. Fungsi Faktorial
function hitungFaktorial() {
    let angka = Number(document.getElementById('inputFaktorial').value);
    
    if (angka < 0) {
        document.getElementById('hasilFaktorial').innerText = "Tidak ada faktorial untuk angka negatif.";
        return;
    }

    let hasil = 1;
    for (let i = angka; i >= 1; i--) {
        hasil *= i; //[cite: 18]
    }
    
    document.getElementById('hasilFaktorial').innerText = `Faktorial dari ${angka} adalah ${hasil}`;
}

// 3. Fungsi Cek Bilangan Prima
function cekPrima() {
    let angka = Number(document.getElementById('inputPrima').value);
    let isPrima = true;
    
    if (angka <= 1) isPrima = false;
    
    for (let i = 2; i < angka; i++) {
        if (angka % i === 0) {
            isPrima = false;
            break;
        }
    }
    
    let keterangan = isPrima ? "adalah BILANGAN PRIMA" : "BUKAN bilangan prima";
    document.getElementById('hasilPrima').innerText = `Angka ${angka} ${keterangan}.`; //[cite: 18]
}

// 4. Kalkulator BMI dengan Event Handler
function hitungBMI() {
    let berat = parseFloat(document.getElementById('berat').value);
    // Mengubah cm ke meter sesuai rumus BMI
    let tinggiM = parseFloat(document.getElementById('tinggi').value) / 100; 
    
    if (isNaN(berat) || isNaN(tinggiM) || tinggiM === 0) {
        document.getElementById('hasilBMI').innerText = "Mohon masukkan data yang valid.";
        return;
    }

    let bmi = berat / (tinggiM * tinggiM); //[cite: 18]
    document.getElementById('hasilBMI').innerText = `Hasil BMI Anda: ${bmi.toFixed(2)}`;
}

// 5. Logika FizzBuzz
function jalankanFizzBuzz() {
    let areaHasil = document.getElementById('hasilFizzBuzz');
    let htmlOutput = "";
    
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            htmlOutput += "<b>FizzBuzz</b><br>"; //[cite: 18]
        } else if (i % 3 === 0) {
            htmlOutput += "Fizz<br>"; //[cite: 18]
        } else if (i % 5 === 0) {
            htmlOutput += "Buzz<br>"; //[cite: 18]
        } else {
            htmlOutput += i + "<br>";
        }
    }
    
    areaHasil.innerHTML = htmlOutput;
}