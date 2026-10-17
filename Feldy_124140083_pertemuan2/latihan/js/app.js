// js/app.js
// Kumpulan demo fitur JavaScript Next Gen (ES6+), diekspor ke main.js
// Urutan file: demo dari modul (1-12), terus latihan/tugas di paling bawah.

import { sampleUsers, sampleProducts } from './modules/data.js';
import { formatRupiah, capitalize, escapeHtml } from './modules/utils.js';

// ----------------------------
// Let dan Const
// ----------------------------
export function demoVariables() {
  // var (cara lama)
  var oldVar = "Old variable";
  {
    var oldVar = "Changed inside block";
  }

  // let (ES6)
  let newLet = "New let variable";
  {
    let newLet = "Different variable inside block";
    console.log("newLet inside block:", newLet);
  }

  // const (ES6)
  const PI = 3.14159;
  const user = { name: "John", age: 30 };
  // PI = 3.15; // error, const nggak bisa di-assign ulang
  user.age = 31; // ini boleh, yang dikunci cuma referensinya

  return {
    oldVar,
    newLet,
    PI,
    user
  };
}

// ----------------------------
// Arrow Functions
// ----------------------------
export function demoArrowFunctions() {
  // fungsi biasa
  function regularSum(a, b) {
    return a + b;
  }

  // arrow function dasar
  const arrowSum = (a, b) => {
    return a + b;
  };

  // implicit return
  const shortArrowSum = (a, b) => a + b;

  // tanpa parameter
  const sayHello = () => "Hello World!";

  // satu parameter, kurungnya boleh dibuang
  const square = x => x * x;

  return {
    regularSum: regularSum(5, 3),
    arrowSum: arrowSum(5, 3),
    shortArrowSum: shortArrowSum(5, 3),
    sayHello: sayHello(),
    square: square(4)
  };
}

// ----------------------------
// Template Literals
// ----------------------------
export function demoTemplateLiterals() {
  const name = "John";
  const age = 30;

  // cara lama, pakai +
  const oldWay = "Nama saya " + name + " dan umur saya " + age + " tahun.";

  // template literals
  const newWay = `Nama saya ${name} dan umur saya ${age} tahun.`;

  // multi-baris, tinggal Enter
  const multiLine = `
    Ini adalah string multi-baris.
    Sangat berguna untuk HTML template.
    Nama: ${name}
    Umur: ${age}
  `;

  // isi ${} bisa ekspresi
  const expression = `Tahun lahir: ${new Date().getFullYear() - age}`;

  return {
    oldWay,
    newWay,
    multiLine,
    expression
  };
}

// ----------------------------
// Destructuring
// ----------------------------
export function demoDestructuring() {
  // object destructuring
  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    address: {
      city: "Jakarta",
      postalCode: "12345"
    }
  };

  // dasar
  const { firstName, lastName } = person;

  // ganti nama variabel
  const { firstName: fName, lastName: lName } = person;

  // nilai default
  const { hobby = "coding" } = person;

  // nested
  const { address: { city, postalCode } } = person;

  // array destructuring
  const colors = ["red", "green", "blue", "yellow", "purple"];

  // dasar
  const [firstColor, secondColor] = colors;

  // lewati elemen
  const [, , thirdColor] = colors;

  // rest pattern
  const [primary, secondary, ...restColors] = colors;

  // tukar nilai tanpa variabel bantu
  let a = 1;
  let b = 2;
  [a, b] = [b, a];

  return {
    objectBasic: { firstName, lastName },
    objectRenamed: { fName, lName },
    objectDefault: hobby,
    objectNested: { city, postalCode },
    arrayBasic: { firstColor, secondColor },
    arraySkipped: thirdColor,
    arrayRest: { primary, secondary, restColors },
    swapped: { a, b }
  };
}

// ----------------------------
// Spread dan Rest Operators
// ----------------------------
export function demoSpreadRest() {
  // spread di array
  const numbers = [1, 2, 3];
  const moreNumbers = [...numbers, 4, 5];

  // copy array
  const numbersCopy = [...numbers];

  // gabung array
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const mergedArray = [...array1, ...array2];

  // spread di object
  const person = {
    name: "John",
    age: 30
  };

  // copy object
  const personCopy = { ...person };

  // tambah properti sekalian timpa age
  const extendedPerson = {
    ...person,
    email: "john@example.com",
    age: 31
  };

  // rest parameter
  function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }

  // rest + parameter biasa
  function process(first, second, ...rest) {
    return {
      first,
      second,
      rest
    };
  }

  return {
    spreadArray: moreNumbers,
    copyArray: numbersCopy,
    mergedArrays: mergedArray,
    spreadObject: extendedPerson,
    restSum: sum(1, 2, 3, 4, 5),
    restProcess: process("a", "b", "c", "d", "e")
  };
}

// ----------------------------
// Default Parameters
// ----------------------------
export function demoDefaultParams() {
  // cara lama (ES5)
  function greetOld(name, greeting) {
    name = name || "Guest";
    greeting = greeting || "Hello";
    return `${greeting}, ${name}!`;
  }

  // default parameters (ES6)
  function greet(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
  }

  // default-nya bisa berupa ekspresi
  function createUser(name, role = "user", createdAt = new Date().toISOString()) {
    return { name, role, createdAt };
  }

  // atau pakai parameter sebelumnya
  function createOrder(product, quantity = 1, price, total = price * quantity) {
    return { product, quantity, price, total };
  }

  return {
    oldWay: greetOld(),
    oldWayParams: greetOld("John", "Hi"),
    newWay: greet(),
    newWayParams: greet("John", "Hi"),
    withExpression: createUser("Alice"),
    usingPrevious: createOrder("Laptop", 2, 1000000)
  };
}

// ----------------------------
// Classes
// ----------------------------
export function demoClasses() {
  class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
      this.createdAt = new Date();
    }

    getInfo() {
      return `${this.name} (${this.email})`;
    }

    getCreatedDate() {
      return this.createdAt.toLocaleDateString();
    }
  }

  // inheritance
  class Admin extends User {
    constructor(name, email, role = "admin") {
      // panggil constructor parent dulu
      super(name, email);
      this.role = role;
    }

    // override
    getInfo() {
      return `${this.name} (${this.email}) - ${this.role}`;
    }

    hasAccess(module) {
      return true; // contoh aja, admin selalu boleh
    }
  }

  const user = new User("John Doe", "john@example.com");
  const admin = new Admin("Admin User", "admin@example.com");

  return {
    user: {
      info: user.getInfo(),
      createdDate: user.getCreatedDate()
    },
    admin: {
      info: admin.getInfo(),
      createdDate: admin.getCreatedDate(),
      hasAccess: admin.hasAccess("dashboard")
    },
    isUserInstance: user instanceof User,
    isAdminInstance: admin instanceof User // true karena inheritance
  };
}

// ----------------------------
// Enhanced Object Literals
// ----------------------------
export function demoObjectLiterals() {
  const name = "John";
  const age = 30;

  // cara lama
  const oldPerson = {
    name: name,
    age: age,
    sayHello: function() {
      return "Hello!";
    }
  };

  // cara modern
  const newPerson = {
    name,
    age,
    // method shorthand
    sayHello() {
      return "Hello!";
    },
    // computed property names
    ["skill_" + 1]: "JavaScript",
    ["skill_" + 2]: "React"
  };

  const prefix = "user";
  const userData = {
    [`${prefix}_id`]: 123,
    [`${prefix}_name`]: "john_doe",
    [Date.now()]: "timestamp"
  };

  return {
    oldWay: oldPerson,
    newWay: newPerson,
    methods: {
      old: oldPerson.sayHello(),
      new: newPerson.sayHello()
    },
    computedProps: {
      skill1: newPerson.skill_1,
      skill2: newPerson.skill_2
    },
    dynamicProps: userData
  };
}

// ----------------------------
// Modern Array Methods dan Higher-Order Functions
// ----------------------------
export function demoArrayMethods() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const users = [
    { id: 1, name: "John", age: 25, active: true },
    { id: 2, name: "Jane", age: 30, active: false },
    { id: 3, name: "Bob", age: 22, active: true },
    { id: 4, name: "Alice", age: 28, active: true },
    { id: 5, name: "Charlie", age: 35, active: false }
  ];

  // map
  const doubled = numbers.map(num => num * 2);

  // filter
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  const activeUsers = users.filter(user => user.active);

  // find
  const userJane = users.find(user => user.name === "Jane");

  // some dan every
  const hasAdult = users.some(user => user.age >= 18);
  const allAdults = users.every(user => user.age >= 18);

  // reduce
  const sum = numbers.reduce((total, num) => total + num, 0);
  const oldest = users.reduce((oldest, user) =>
    user.age > oldest.age ? user : oldest, users[0]);

  // chaining
  const activeUsersNames = users
    .filter(user => user.active)
    .map(user => user.name);

  const totalActiveAge = users
    .filter(user => user.active)
    .reduce((sum, user) => sum + user.age, 0);

  return {
    map: doubled,
    filter: {
      evenNumbers,
      activeUsers: activeUsers.length
    },
    find: userJane,
    some: hasAdult,
    every: allAdults,
    reduce: {
      sum,
      oldest: oldest.name
    },
    chaining: {
      activeUsersNames,
      totalActiveAge
    }
  };
}

// ----------------------------
// Array Destructuring dan Spread Lanjutan
// ----------------------------
export function demoAdvancedArrays() {
  const numbers = [1, 2, 3, 4, 5];

  // clone dan gabung
  const numbersCopy = [...numbers];
  const moreNumbers = [...numbers, 6, 7, 8];
  const combinedArrays = [...numbers, ...[6, 7, 8, 9]];

  // Array.from
  const fromIterable = Array.from("hello");
  const withMapFn = Array.from(numbers, n => n * n);

  // Array.of
  const newArray = Array.of(1, "two", { three: 3 });

  // flat dan flatMap
  const nestedArrays = [1, [2, 3], [[4, 5], 6]];
  const flattened = nestedArrays.flat();
  const deepFlattened = nestedArrays.flat(2);

  const flatMapped = numbers.flatMap(n => [n, n * 2]);

  // includes
  const hasThree = numbers.includes(3);

  return {
    clone: numbersCopy,
    concat: {
      moreNumbers,
      combinedArrays
    },
    arrayFrom: {
      fromIterable,
      withMapFn
    },
    arrayOf: newArray,
    flatAndFlatMap: {
      flattened,
      deepFlattened,
      flatMapped
    },
    includes: hasThree
  };
}

// ----------------------------
// Promises
// ----------------------------
export function demoPromises() {
  // simulasi operasi async, selesai dalam 1 detik
  function fetchData(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) {
          resolve({ id, name: `User ${id}`, success: true });
        } else {
          reject(new Error("ID tidak valid"));
        }
      }, 1000);
    });
  }

  // promise dasar
  let basicPromiseResult = "Memuat...";
  fetchData(1)
    .then(data => {
      basicPromiseResult = `Sukses: ${JSON.stringify(data)}`;
      document.getElementById('promise-basic').textContent = basicPromiseResult;
    })
    .catch(err => {
      basicPromiseResult = `Error: ${err.message}`;
      document.getElementById('promise-basic').textContent = basicPromiseResult;
    });

  // chaining
  let chainResult = "Memuat...";
  fetchData(2)
    .then(user => {
      chainResult = `Dapat user: ${user.name}`;
      return fetchData(3); // balikin promise lain
    })
    .then(secondUser => {
      chainResult += ` dan ${secondUser.name}`;
      document.getElementById('promise-chain').textContent = chainResult;
    })
    .catch(err => {
      chainResult = `Error: ${err.message}`;
      document.getElementById('promise-chain').textContent = chainResult;
    });

  // Promise.all
  let allResult = "Memuat...";
  Promise.all([fetchData(4), fetchData(5), fetchData(6)])
    .then(results => {
      allResult = `Semua selesai: ${results.map(r => r.name).join(', ')}`;
      document.getElementById('promise-all').textContent = allResult;
    })
    .catch(err => {
      allResult = `Error di salah satu: ${err.message}`;
      document.getElementById('promise-all').textContent = allResult;
    });

  // Promise.race
  let raceResult = "Memuat...";
  Promise.race([
    fetchData(7),
    fetchData(8),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 1500))
  ])
    .then(winner => {
      raceResult = `Pemenang race: ${winner.name}`;
      document.getElementById('promise-race').textContent = raceResult;
    })
    .catch(err => {
      raceResult = `Error race: ${err.message}`;
      document.getElementById('promise-race').textContent = raceResult;
    });

  // elemen tempat hasil promise nanti ditulis
  const outputDiv = document.createElement('div');
  outputDiv.className = 'promise-outputs';

  const createPromiseElement = (id, label) => {
    const el = document.createElement('div');
    el.className = 'promise-result';
    el.innerHTML = `<strong>${label}:</strong> <span id="${id}">Memuat...</span>`;
    outputDiv.appendChild(el);
  };

  createPromiseElement('promise-basic', 'Promise Dasar');
  createPromiseElement('promise-chain', 'Promise Chain');
  createPromiseElement('promise-all', 'Promise.all');
  createPromiseElement('promise-race', 'Promise.race');

  return outputDiv;
}

// ----------------------------
// Async/Await
// ----------------------------
export function demoAsyncAwait() {
  // simulasi API call
  function fetchUser(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) {
          resolve({
            id,
            name: `User ${id}`,
            email: `user${id}@example.com`
          });
        } else {
          reject(new Error("ID user tidak valid"));
        }
      }, 1000);
    });
  }

  function fetchUserPosts(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: "Post 1", body: "Konten untuk post 1" },
          { id: 2, title: "Post 2", body: "Konten untuk post 2" },
        ]);
      }, 800);
    });
  }

  // async/await biasa
  async function getUserData(id) {
    try {
      const user = await fetchUser(id);
      const posts = await fetchUserPosts(user.id);
      return {
        user,
        posts,
        success: true
      };
    } catch (error) {
      return {
        error: error.message,
        success: false
      };
    }
  }

  // versi paralel
  async function getMultipleUsers(ids) {
    try {
      // semua user diambil barengan
      const userPromises = ids.map(id => fetchUser(id));
      const users = await Promise.all(userPromises);

      // posts tiap user juga barengan
      const postPromises = users.map(user => fetchUserPosts(user.id));
      const allPosts = await Promise.all(postPromises);

      // gabungin hasilnya
      return users.map((user, i) => ({
        user,
        posts: allPosts[i]
      }));
    } catch (error) {
      return { error: error.message };
    }
  }

  // elemen buat nampilin hasil
  const outputDiv = document.createElement('div');
  outputDiv.className = 'async-outputs';

  const basicAsyncResult = document.createElement('div');
  basicAsyncResult.innerHTML = '<strong>User Tunggal:</strong> Memuat...';
  basicAsyncResult.className = 'async-result';
  outputDiv.appendChild(basicAsyncResult);

  const parallelAsyncResult = document.createElement('div');
  parallelAsyncResult.innerHTML = '<strong>Beberapa User:</strong> Memuat...';
  parallelAsyncResult.className = 'async-result';
  outputDiv.appendChild(parallelAsyncResult);

  // jalankan, terus update tampilan kalau sudah selesai
  getUserData(42).then(result => {
    if (result.success) {
      basicAsyncResult.innerHTML = `
        <strong>User Tunggal:</strong> ${result.user.name} |
        Posts: ${result.posts.length}
      `;
    } else {
      basicAsyncResult.innerHTML = `<strong>Error:</strong> ${result.error}`;
    }
  });

  getMultipleUsers([101, 102, 103]).then(results => {
    if (!results.error) {
      parallelAsyncResult.innerHTML = `
        <strong>Beberapa User:</strong>
        ${results.map(r => r.user.name).join(', ')} |
        Total posts: ${results.reduce((sum, r) => sum + r.posts.length, 0)}
      `;
    } else {
      parallelAsyncResult.innerHTML = `<strong>Error:</strong> ${results.error}`;
    }
  });

  return outputDiv;
}


// ============================================================
// LATIHAN (INI TUGASNYA)
// Dari sini ke bawah isinya latihan yang disuruh di tiap modul.
// Aku kumpulin jadi satu di bawah, urutannya ngikutin urutan modul.
// Data dan helper-nya pakai punya data.js dan utils.js.
// ============================================================


// ----------------------------
// LATIHAN 1: Let, Const, Arrow Functions, Template Literals
// ----------------------------
export function latihanDasar() {
  // TUGAS: coba ubah nilai const dan lihat error yang muncul
  const PI = 3.14159;
  let errorConst = "tidak ada error";
  try {
    PI = 3.15;
  } catch (error) {
    errorConst = `${error.name}: ${error.message}`;
  }

  // TUGAS: bandingkan perilaku var di dalam dan di luar blok
  function cekVar() {
    var nilai = "luar blok";
    if (true) {
      var nilai = "dalam blok"; // var yang sama, jadi ketimpa
    }
    return nilai;
  }

  function cekLet() {
    let nilai = "luar blok";
    if (true) {
      let nilai = "dalam blok"; // variabel baru, cuma hidup di dalam blok
    }
    return nilai;
  }

  function cekBocor() {
    if (true) {
      var pakaiVar = "aku bocor";
      let pakaiLet = "aku aman";
    }
    // typeof dipakai biar nggak kena ReferenceError
    return { var: typeof pakaiVar, let: typeof pakaiLet };
  }

  // TUGAS: bikin arrow function dengan berbagai sintaks
  const tambah = (a, b) => { return a + b; };            // body lengkap
  const kali = (a, b) => a * b;                          // implicit return
  const kuadrat = x => x * x;                            // satu parameter
  const sapa = () => "Halo dari arrow function!";        // tanpa parameter
  const buatBuku = (judul, tahun) => ({ judul, tahun }); // return object, wajib pakai kurung
  const pangkat = (basis, eksponen = 2) => basis ** eksponen; // ada default parameter

  // TUGAS: pakai template literals buat bikin HTML string
  const buatKartuUser = ({ name, role, active, age }) => `
<div class="kartu-user">
  <h3>${capitalize(name)}</h3>
  <p>Role: ${role} | Umur: ${age} tahun</p>
  <span class="${active ? "aktif" : "nonaktif"}">${active ? "Aktif" : "Nonaktif"}</span>
</div>`;

  const htmlKartu = sampleUsers.slice(0, 2).map(buatKartuUser).join("\n");

  const htmlProduk = `<ul>
${sampleProducts.map(p => `  <li>${p.name} - ${formatRupiah(p.price)}</li>`).join("\n")}
</ul>`;

  return {
    errorConst,
    varLuar: cekVar(),
    letLuar: cekLet(),
    bocor: cekBocor(),
    arrow: {
      tambah: tambah(2, 3),
      kali: kali(4, 5),
      kuadrat: kuadrat(6),
      sapa: sapa(),
      buatBuku: buatBuku("Belajar JS", 2026),
      pangkat: pangkat(3),
      pangkatTiga: pangkat(2, 3)
    },
    htmlKartu,
    htmlProduk
  };
}


// ----------------------------
// LATIHAN 2: Destructuring dan Spread/Rest
// ----------------------------
export function latihanDestructuring() {
  // TUGAS: destructure object dengan nested properties minimal 3 level
  const perusahaan = {
    nama: "Tech Co",
    kantor: {
      pusat: {
        alamat: { kota: "Jakarta", kodePos: "12345" },
        lantai: 12
      }
    }
  };
  // ini 4 level: kantor -> pusat -> alamat -> kota
  const { kantor: { pusat: { alamat: { kota, kodePos }, lantai } } } = perusahaan;

  // TUGAS: function dengan rest parameters yang ngembaliin statistik (min, max, rata-rata)
  const statistik = (...angka) => {
    if (angka.length === 0) return { min: null, max: null, rataRata: null };
    const min = Math.min(...angka);
    const max = Math.max(...angka);
    const rataRata = angka.reduce((total, n) => total + n, 0) / angka.length;
    return { min, max, rataRata };
  };

  // TUGAS: merge 3 object pakai spread dan timpa beberapa properti
  const dasar = { nama: "Budi", umur: 20, kota: "Jakarta" };
  const kontak = { email: "budi@example.com", kota: "Bandung" };  // kota nimpa
  const akademik = { jurusan: "Informatika", umur: 21 };          // umur nimpa
  const gabungan = { ...dasar, ...kontak, ...akademik, semester: 3 };

  // TUGAS: pakai destructuring di dalam for...of
  const hasilLoop = [];
  for (const { name, role, age } of sampleUsers) {
    hasilLoop.push(`${name} (${role}, ${age} th)`);
  }

  // variasi: array destructuring di for...of lewat entries()
  const warna = ["merah", "hijau", "biru"];
  const hasilEntries = [];
  for (const [index, nama] of warna.entries()) {
    hasilEntries.push(`${index}: ${nama}`);
  }

  return {
    nested: { kota, kodePos, lantai },
    statistik: statistik(4, 8, 15, 16, 23, 42),
    statistikKosong: statistik(),
    gabungan,
    hasilLoop,
    hasilEntries
  };
}


// ----------------------------
// LATIHAN 3: Classes dan Object Literals
// ----------------------------
export function latihanClasses() {
  // TUGAS: class Product dengan inheritance ke DigitalProduct dan PhysicalProduct
  // TUGAS: implementasi getter dan setter di dalam class (price)
  class Product {
    constructor(name, price) {
      this.name = name;
      this._price = price;
    }

    get price() {
      return this._price;
    }

    // harga nggak boleh negatif
    set price(value) {
      if (value < 0) {
        throw new Error("Harga tidak boleh negatif");
      }
      this._price = value;
    }

    getDiscountedPrice(discount) {
      return this._price * (1 - discount);
    }

    describe() {
      return `${this.name} - ${formatRupiah(this._price)}`;
    }
  }

  class DigitalProduct extends Product {
    constructor(name, price, fileSizeMB) {
      super(name, price);
      this.fileSizeMB = fileSizeMB;
    }

    // produk digital nggak ada ongkir
    get shippingCost() {
      return 0;
    }

    describe() {
      return `${super.describe()} (digital, ${this.fileSizeMB} MB)`;
    }
  }

  class PhysicalProduct extends Product {
    constructor(name, price, weightKg) {
      super(name, price);
      this.weightKg = weightKg;
    }

    // ongkir 10 ribu per kg, dibulatkan ke atas
    get shippingCost() {
      return Math.ceil(this.weightKg) * 10000;
    }

    describe() {
      return `${super.describe()} (fisik, ${this.weightKg} kg)`;
    }
  }

  const ebook = new DigitalProduct("E-book JavaScript", 75000, 12);
  const laptop = new PhysicalProduct("Laptop Gaming", 15000000, 2.4);

  // coba setter: yang valid lolos, yang negatif ditolak
  laptop.price = 14000000;
  let errorSetter = "tidak ada error";
  try {
    laptop.price = -1;
  } catch (error) {
    errorSetter = error.message;
  }

  // TUGAS: computed property names buat bikin object dengan key dinamis
  const prefix = "produk";
  const keyDinamis = [ebook, laptop].reduce((hasil, produk, i) => ({
    ...hasil,
    [`${prefix}_${i + 1}`]: produk.name,
    [`harga_${i + 1}`]: produk.price
  }), {});

  // TUGAS: gabungin default parameters dengan destructuring di parameter fungsi
  const buatProduk = ({ name = "Tanpa nama", price = 0, category = "umum", stock = 10 } = {}) =>
    ({ name, price, category, stock });

  return {
    ebook: {
      info: ebook.describe(),
      ongkir: ebook.shippingCost,
      diskon20: ebook.getDiscountedPrice(0.2),
      isProduct: ebook instanceof Product
    },
    laptop: {
      info: laptop.describe(),
      ongkir: laptop.shippingCost,
      hargaSetelahSetter: laptop.price,
      errorSetter
    },
    keyDinamis,
    produkKosong: buatProduk(),
    produkSebagian: buatProduk({ name: "Mouse", price: 150000 })
  };
}


// ----------------------------
// LATIHAN 4: Modern Array Methods
// ----------------------------
export function latihanArray() {
  // TUGAS: implementasi groupBy pakai reduce()
  const groupBy = (array, key) =>
    array.reduce((hasil, item) => {
      const kunci = item[key];
      hasil[kunci] = hasil[kunci] || [];
      hasil[kunci].push(item);
      return hasil;
    }, {});

  const userPerRole = groupBy(sampleUsers, "role");
  const produkPerKategori = groupBy(sampleProducts, "category");

  // TUGAS: fungsi buat ngitung rata-rata dari array of objects
  const rataRata = (array, key) =>
    array.length === 0
      ? 0
      : array.reduce((total, item) => total + item[key], 0) / array.length;

  // TUGAS: ubah struktur array bersarang jadi flat
  const bersarang = [1, [2, 3], [[4, 5], 6], [[[7]]]];
  const flatBawaan = bersarang.flat(Infinity);
  const ratakan = (arr) =>
    arr.reduce(
      (hasil, item) => hasil.concat(Array.isArray(item) ? ratakan(item) : item),
      []
    );

  // TUGAS: gabungin filter, map, dan reduce buat analisis data yang agak kompleks
  // total harga produk tech setelah diskon 10%
  const totalTechDiskon = sampleProducts
    .filter(p => p.category === "tech")
    .map(p => ({ ...p, hargaDiskon: p.price * 0.9 }))
    .reduce((total, p) => total + p.hargaDiskon, 0);

  // ringkasan user aktif per role: jumlah dan rata-rata umur
  const ringkasanUser = sampleUsers
    .filter(u => u.active)
    .reduce((hasil, { role, age }) => {
      hasil[role] = hasil[role] || { jumlah: 0, totalUmur: 0 };
      hasil[role].jumlah += 1;
      hasil[role].totalUmur += age;
      return hasil;
    }, {});

  const rataUmurPerRole = Object.entries(ringkasanUser).map(
    ([role, { jumlah, totalUmur }]) => ({ role, jumlah, rataUmur: totalUmur / jumlah })
  );

  return {
    userPerRole: Object.fromEntries(
      Object.entries(userPerRole).map(([role, daftar]) => [role, daftar.map(u => u.name)])
    ),
    produkPerKategori: Object.fromEntries(
      Object.entries(produkPerKategori).map(([kat, daftar]) => [kat, daftar.map(p => p.name)])
    ),
    rataUmur: rataRata(sampleUsers, "age"),
    rataHarga: rataRata(sampleProducts, "price"),
    rataKosong: rataRata([], "age"),
    flatBawaan,
    flatReduce: ratakan(bersarang),
    totalTechDiskon,
    rataUmurPerRole
  };
}


// ----------------------------
// LATIHAN 5: Async Programming
// ----------------------------

// API palsu buat latihan, jadi nggak butuh internet
const tunggu = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fakeEndpoints = {
  "/api/users": () => sampleUsers,
  "/api/products": () => sampleProducts,
  "/api/stats": () => ({ visitors: 120, orders: 8 })
};

async function fakeFetch(endpoint, delay = 500) {
  await tunggu(delay);
  const handler = fakeEndpoints[endpoint];
  if (!handler) {
    throw new Error(`Endpoint ${endpoint} tidak ditemukan (404)`);
  }
  return handler();
}

// TUGAS: fetch data dari beberapa endpoint terus gabungin hasilnya
export async function latihanMultiEndpoint() {
  const mulai = performance.now();

  // tiga endpoint jalan barengan
  const [users, products, stats] = await Promise.all([
    fakeFetch("/api/users", 600),
    fakeFetch("/api/products", 800),
    fakeFetch("/api/stats", 400)
  ]);

  const durasiMs = Math.round(performance.now() - mulai);

  return {
    gabungan: { users, products, stats },
    totalUser: users.length,
    totalProduk: products.length,
    stats,
    durasiMs
  };
}

// TUGAS: mekanisme retry dengan exponential backoff
export async function retryDenganBackoff(fn, { percobaanMax = 4, delayAwal = 300, onRetry } = {}) {
  for (let percobaan = 1; percobaan <= percobaanMax; percobaan++) {
    try {
      return await fn(percobaan);
    } catch (error) {
      // udah percobaan terakhir, lempar errornya
      if (percobaan === percobaanMax) throw error;

      // delay dobel tiap gagal: 300, 600, 1200, ...
      const delay = delayAwal * 2 ** (percobaan - 1);
      onRetry?.(percobaan, delay, error);
      await tunggu(delay);
    }
  }
}

export async function latihanRetry() {
  const log = [];

  // fungsi yang sengaja gagal 2 kali, baru berhasil di percobaan ke-3
  const hasil = await retryDenganBackoff(
    async (percobaan) => {
      await tunggu(100);
      if (percobaan < 3) throw new Error(`gagal di percobaan ${percobaan}`);
      return `berhasil di percobaan ${percobaan}`;
    },
    {
      onRetry: (percobaan, delay, error) =>
        log.push(`${error.message}, coba lagi dalam ${delay} ms`)
    }
  );

  return { hasil, log };
}

// TUGAS: error boundary buat error async
// semua error dari fungsi async ditangkap di satu tempat, jadi UI nggak ikut rusak
export function denganErrorBoundary(asyncFn, { onError } = {}) {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      onError?.(error);
      return null;
    }
  };
}

// TUGAS: bikin loading state buat operasi async di UI (sekalian pakai error boundary di atas)
export function latihanLoadingDanError(container) {
  const panel = document.createElement("div");
  panel.className = "latihan-ui";
  panel.innerHTML = `
    <div class="latihan-ui__aksi">
      <button type="button" data-endpoint="/api/users">Muat data user</button>
      <button type="button" data-endpoint="/api/rusak">Muat endpoint rusak</button>
    </div>
    <div class="latihan-ui__status">Belum ada data. Klik salah satu tombol.</div>
  `;
  container.appendChild(panel);

  const status = panel.querySelector(".latihan-ui__status");
  const tombol = panel.querySelectorAll("button");

  const muatData = denganErrorBoundary(
    async (endpoint) => {
      status.classList.remove("latihan-ui__error");
      status.innerHTML = `<span class="spinner"></span> Memuat ${endpoint}...`;
      tombol.forEach((t) => (t.disabled = true));

      try {
        const data = await fakeFetch(endpoint, 1200);
        status.textContent = `Berhasil, dapat ${data.length} data: ${data.map((d) => d.name).join(", ")}`;
      } finally {
        // sukses atau gagal, tombolnya tetap dihidupkan lagi
        tombol.forEach((t) => (t.disabled = false));
      }
    },
    {
      onError: (error) => {
        status.classList.add("latihan-ui__error");
        status.textContent = `Gagal: ${error.message}`;
      }
    }
  );

  panel.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (btn) muatData(btn.dataset.endpoint);
  });
}

// TUGAS: pagination pakai async/await
const semuaItem = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, name: `Produk ${i + 1}` }));

async function fetchHalaman(halaman, ukuran = 5) {
  await tunggu(400);
  const awal = (halaman - 1) * ukuran;
  return {
    halaman,
    totalHalaman: Math.ceil(semuaItem.length / ukuran),
    data: semuaItem.slice(awal, awal + ukuran)
  };
}

export function latihanPagination(container) {
  const panel = document.createElement("div");
  panel.className = "latihan-ui";
  panel.innerHTML = `
    <div class="latihan-ui__daftar">Memuat...</div>
    <div class="latihan-ui__aksi">
      <button type="button" data-aksi="prev">Sebelumnya</button>
      <span class="latihan-ui__info"></span>
      <button type="button" data-aksi="next">Berikutnya</button>
    </div>
  `;
  container.appendChild(panel);

  const daftar = panel.querySelector(".latihan-ui__daftar");
  const info = panel.querySelector(".latihan-ui__info");
  const prev = panel.querySelector('[data-aksi="prev"]');
  const next = panel.querySelector('[data-aksi="next"]');

  let halaman = 1;
  let totalHalaman = 1;

  async function muatHalaman(nomor) {
    prev.disabled = next.disabled = true;
    daftar.textContent = "Memuat...";

    try {
      const hasil = await fetchHalaman(nomor);
      halaman = hasil.halaman;
      totalHalaman = hasil.totalHalaman;
      daftar.innerHTML = `<ul>${hasil.data.map((item) => `<li>${item.name}</li>`).join("")}</ul>`;
      info.textContent = `Halaman ${halaman} dari ${totalHalaman}`;
    } catch (error) {
      daftar.textContent = `Gagal: ${error.message}`;
    } finally {
      prev.disabled = halaman <= 1;
      next.disabled = halaman >= totalHalaman;
    }
  }

  prev.addEventListener("click", () => muatHalaman(halaman - 1));
  next.addEventListener("click", () => muatHalaman(halaman + 1));

  muatHalaman(1);
}

// TUGAS: debounced search dengan async API call
export function debounce(fn, delay = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const katalogCari = [
  ...sampleProducts.map((p) => p.name),
  "Mouse Wireless",
  "Monitor 24 Inch",
  "Meja Kerja",
  "Headset Bluetooth",
  "Webcam HD",
  "Lampu Meja"
];

async function cariProduk(kata) {
  await tunggu(300);
  return katalogCari.filter((nama) => nama.toLowerCase().includes(kata.toLowerCase()));
}

export function latihanDebounceSearch(container) {
  const panel = document.createElement("div");
  panel.className = "latihan-ui";
  panel.innerHTML = `
    <input type="text" placeholder="Cari produk, contoh: meja atau mouse">
    <div class="latihan-ui__info"></div>
    <div class="latihan-ui__status"></div>
    <ul></ul>
  `;
  container.appendChild(panel);

  const input = panel.querySelector("input");
  const info = panel.querySelector(".latihan-ui__info");
  const status = panel.querySelector(".latihan-ui__status");
  const daftar = panel.querySelector("ul");

  let jumlahKetikan = 0;
  let jumlahPanggilanApi = 0;
  let idTerakhir = 0;

  const updateInfo = () => {
    info.textContent = `Ketikan: ${jumlahKetikan} | Panggilan API: ${jumlahPanggilanApi}`;
  };
  updateInfo();

  const cari = async (kata) => {
    const idSaya = ++idTerakhir;
    jumlahPanggilanApi++;
    updateInfo();
    status.innerHTML = `<span class="spinner"></span> Mencari "${escapeHtml(kata)}"...`;

    const hasil = await cariProduk(kata);

    // kalau udah ada pencarian yang lebih baru, hasil yang ini dibuang
    if (idSaya !== idTerakhir) return;

    status.textContent = `${hasil.length} hasil untuk "${kata}"`;
    daftar.innerHTML = hasil.map((nama) => `<li>${escapeHtml(nama)}</li>`).join("");
  };

  const cariDenganDebounce = debounce(cari, 500);

  input.addEventListener("input", () => {
    jumlahKetikan++;
    updateInfo();

    const kata = input.value.trim();
    if (!kata) {
      // input kosong, nggak usah manggil API
      idTerakhir++;
      status.textContent = "";
      daftar.innerHTML = "";
      return;
    }
    status.textContent = "Menunggu kamu selesai ngetik...";
    cariDenganDebounce(kata);
  });
}
