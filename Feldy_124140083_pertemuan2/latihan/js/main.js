// js/main.js
// Pengendali tampilan (DOM): nampilin hasil demo dan latihan ke halaman

import {
  demoVariables,
  demoArrowFunctions,
  demoTemplateLiterals,
  demoDestructuring,
  demoSpreadRest,
  demoDefaultParams,
  demoClasses,
  demoObjectLiterals,
  demoArrayMethods,
  demoAdvancedArrays,
  demoPromises,
  demoAsyncAwait,
  latihanDasar,
  latihanDestructuring,
  latihanClasses,
  latihanArray,
  latihanMultiEndpoint,
  latihanRetry,
  latihanLoadingDanError,
  latihanPagination,
  latihanDebounceSearch
} from './app.js';
import { escapeHtml } from './modules/utils.js';

// helper buat nampilin kartu hasil demo
export function addOutput(title, subtitle, content) {
  const outputEl = document.getElementById("output");
  if (!outputEl) return;
  const card = document.createElement("div");
  card.className = "output-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm";
  card.innerHTML = `
    <h4 class="font-bold text-blue-600 text-base mb-1">${title}</h4>
    <p class="text-xs text-gray-500 mb-2">${subtitle}</p>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap overflow-x-auto result">${content}</pre>
  `;
  outputEl.appendChild(card);

  // dikembalikan biar latihan yang hasilnya datang belakangan bisa update isi kartunya
  return card.querySelector(".result");
}

const json = (data) => JSON.stringify(data);

// tombol Clear Output
document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});

// jalanin semua demo dari modul
function runAllDemos() {
  // Demo Let dan Const
  const varResults = demoVariables();
  addOutput(
    "1. Let dan Const",
    "var vs let/const dan block scope",
    `var (function scope): ${varResults.oldVar}
let (block scope): ${varResults.newLet}
const (immutable): ${varResults.PI}
const object (mutable content): ${JSON.stringify(varResults.user)}`
  );

  // Demo Arrow Functions
  const arrowResults = demoArrowFunctions();
  addOutput(
    "2. Arrow Functions",
    "Perbandingan fungsi reguler dan arrow functions",
    `Regular function: ${arrowResults.regularSum}
Arrow function: ${arrowResults.arrowSum}
Short arrow: ${arrowResults.shortArrowSum}
No params: ${arrowResults.sayHello}
Single param: ${arrowResults.square}`
  );

  // Demo Template Literals
  const templateResults = demoTemplateLiterals();
  addOutput(
    "3. Template Literals",
    "String concatenation vs template literals",
    `Old way: ${templateResults.oldWay}
New way: ${templateResults.newWay}
With expression: ${templateResults.expression}
Multi-line: ${templateResults.multiLine}`
  );

  // Demo Destructuring
  const destructuringResults = demoDestructuring();
  addOutput(
    "4. Destructuring",
    "Ekstraksi nilai dari objek dan array",
    `Object basic: ${JSON.stringify(destructuringResults.objectBasic)}
Object renamed: ${JSON.stringify(destructuringResults.objectRenamed)}
Object default: ${destructuringResults.objectDefault}
Object nested: ${JSON.stringify(destructuringResults.objectNested)}
Array basic: ${JSON.stringify(destructuringResults.arrayBasic)}
Array skipped: ${destructuringResults.arraySkipped}
Array with rest: ${JSON.stringify(destructuringResults.arrayRest)}
Swapped variables: ${JSON.stringify(destructuringResults.swapped)}`
  );

  // Demo Spread dan Rest Operators
  const spreadRestResults = demoSpreadRest();
  addOutput(
    "5. Spread dan Rest Operators",
    "Penggunaan ... untuk array dan objek",
    `Spread in array: ${JSON.stringify(spreadRestResults.spreadArray)}
Copy array: ${JSON.stringify(spreadRestResults.copyArray)}
Merged arrays: ${JSON.stringify(spreadRestResults.mergedArrays)}
Spread in object: ${JSON.stringify(spreadRestResults.spreadObject)}
Rest in function (sum): ${spreadRestResults.restSum}
Rest with regular params: ${JSON.stringify(spreadRestResults.restProcess)}`
  );

  // Demo Default Parameters
  const defaultParamsResults = demoDefaultParams();
  addOutput(
    "6. Default Parameters",
    "Nilai default untuk parameter fungsi",
    `Old way: ${defaultParamsResults.oldWay}
Old way with params: ${defaultParamsResults.oldWayParams}
New way: ${defaultParamsResults.newWay}
New way with params: ${defaultParamsResults.newWayParams}
With expression: ${JSON.stringify(defaultParamsResults.withExpression)}
Using previous params: ${JSON.stringify(defaultParamsResults.usingPrevious)}`
  );

  // Demo Classes
  const classesResults = demoClasses();
  addOutput(
    "7. Classes",
    "Penggunaan class dan inheritance",
    `User: ${classesResults.user.info}
User created: ${classesResults.user.createdDate}
Admin: ${classesResults.admin.info}
Admin created: ${classesResults.admin.createdDate}
Admin has access: ${classesResults.admin.hasAccess}
user instanceof User: ${classesResults.isUserInstance}
admin instanceof User: ${classesResults.isAdminInstance}`
  );

  // Demo Enhanced Object Literals
  const objectLiteralsResults = demoObjectLiterals();
  addOutput(
    "8. Enhanced Object Literals",
    "Penulisan objek yang lebih ringkas",
    `Property shorthand: ${JSON.stringify(objectLiteralsResults.newWay)}
Method shorthand: ${objectLiteralsResults.methods.new}
Computed properties: ${JSON.stringify(objectLiteralsResults.computedProps)}
Dynamic properties: ${JSON.stringify(objectLiteralsResults.dynamicProps)}`
  );

  // Demo Array Methods
  const arrayMethodsResults = demoArrayMethods();
  addOutput(
    "9. Modern Array Methods",
    "Higher-Order Functions pada array",
    `map: ${JSON.stringify(arrayMethodsResults.map)}
filter (evenNumbers): ${JSON.stringify(arrayMethodsResults.filter.evenNumbers)}
filter (activeUsers): ${arrayMethodsResults.filter.activeUsers}
find: ${JSON.stringify(arrayMethodsResults.find)}
some (hasAdult): ${arrayMethodsResults.some}
every (allAdults): ${arrayMethodsResults.every}
reduce (sum): ${arrayMethodsResults.reduce.sum}
reduce (oldest): ${arrayMethodsResults.reduce.oldest}
chaining (activeUsersNames): ${JSON.stringify(arrayMethodsResults.chaining.activeUsersNames)}
chaining (totalActiveAge): ${arrayMethodsResults.chaining.totalActiveAge}`
  );

  // Demo Advanced Arrays
  const advArraysResults = demoAdvancedArrays();
  addOutput(
    "10. Advanced Arrays",
    "Fitur array lanjutan",
    `Clone: ${JSON.stringify(advArraysResults.clone)}
Concat: ${JSON.stringify(advArraysResults.concat.combinedArrays)}
Array.from: ${JSON.stringify(advArraysResults.arrayFrom.withMapFn)}
Array.of: ${JSON.stringify(advArraysResults.arrayOf)}
flat: ${JSON.stringify(advArraysResults.flatAndFlatMap.flattened)}
deepFlat: ${JSON.stringify(advArraysResults.flatAndFlatMap.deepFlattened)}
flatMap: ${JSON.stringify(advArraysResults.flatAndFlatMap.flatMapped)}
includes: ${advArraysResults.includes}`
  );

  // Demo Promises
  addOutput(
    "11. Promises",
    "Penanganan operasi asinkron dengan Promise",
    ""
  );
  const promiseOutput = demoPromises();
  document.querySelector('.output-item:last-child .result').appendChild(promiseOutput);

  // Demo Async/Await
  addOutput(
    "12. Async/Await",
    "Penanganan operasi asinkron dengan syntax yang lebih bersih",
    ""
  );
  const asyncOutput = demoAsyncAwait();
  document.querySelector('.output-item:last-child .result').appendChild(asyncOutput);

  // demo selesai, lanjut ke latihan
  runLatihan();
}

// ============================================================
// LATIHAN (INI TUGASNYA)
// Semua latihan dari tiap modul ditampilin di sini, setelah 12 demo di atas.
// Kodenya ada di app.js bagian paling bawah.
// ============================================================
function runLatihan() {
  const outputEl = document.getElementById("output");
  if (!outputEl) return;

  // judul pemisah biar jelas mana demo, mana tugas
  const judul = document.createElement("h2");
  judul.className = "text-xl font-bold text-gray-700 pt-4";
  judul.textContent = "Latihan (Tugas)";
  outputEl.appendChild(judul);

  // Latihan 1: let/const, arrow function, template literals
  const dasar = latihanDasar();
  addOutput(
    "Latihan 1. Let, Const, Arrow Functions, Template Literals",
    "Tugas dari modul Let/Const dan Template Literals",
    `[ubah nilai const] ${dasar.errorConst}
[var, nilai di luar blok] ${dasar.varLuar}
[let, nilai di luar blok] ${dasar.letLuar}
[var di luar blok if] ${dasar.bocor.var}
[let di luar blok if] ${dasar.bocor.let}
[arrow] ${json(dasar.arrow)}

[HTML string, kartu user]
${escapeHtml(dasar.htmlKartu)}

[HTML string, daftar produk]
${escapeHtml(dasar.htmlProduk)}`
  );

  // Latihan 2: destructuring dan spread/rest
  const destr = latihanDestructuring();
  addOutput(
    "Latihan 2. Destructuring dan Spread/Rest",
    "Tugas dari modul Destructuring dan Operators",
    `[nested 4 level] ${json(destr.nested)}
[statistik rest param] ${json(destr.statistik)}
[statistik tanpa argumen] ${json(destr.statistikKosong)}
[merge 3 object] ${json(destr.gabungan)}
[for...of + destructuring] ${json(destr.hasilLoop)}
[for...of + entries()] ${json(destr.hasilEntries)}`
  );

  // Latihan 3: classes dan object literals
  const kelas = latihanClasses();
  addOutput(
    "Latihan 3. Classes dan Object Literals",
    "Tugas dari modul Classes dan Object Literals",
    `[DigitalProduct] ${kelas.ebook.info}
  ongkir: ${kelas.ebook.ongkir}, diskon 20%: ${kelas.ebook.diskon20}, instanceof Product: ${kelas.ebook.isProduct}
[PhysicalProduct] ${kelas.laptop.info}
  ongkir: ${kelas.laptop.ongkir}, harga setelah setter: ${kelas.laptop.hargaSetelahSetter}
  set price = -1 -> ${kelas.laptop.errorSetter}
[computed property names] ${json(kelas.keyDinamis)}
[default param + destructuring, kosong] ${json(kelas.produkKosong)}
[default param + destructuring, sebagian] ${json(kelas.produkSebagian)}`
  );

  // Latihan 4: array methods
  const arr = latihanArray();
  addOutput(
    "Latihan 4. Modern Array Methods",
    "Tugas dari modul Modern Array Methods",
    `[groupBy user per role] ${json(arr.userPerRole)}
[groupBy produk per kategori] ${json(arr.produkPerKategori)}
[rata-rata umur] ${arr.rataUmur}
[rata-rata harga] ${arr.rataHarga}
[rata-rata array kosong] ${arr.rataKosong}
[flat bawaan] ${json(arr.flatBawaan)}
[flat pakai reduce] ${json(arr.flatReduce)}
[total produk tech setelah diskon 10%] ${arr.totalTechDiskon}
[user aktif per role] ${json(arr.rataUmurPerRole)}`
  );

  // Latihan 5: async. Yang ini hasilnya datang belakangan, jadi kartunya di-update setelah selesai
  const multiEl = addOutput(
    "Latihan 5a. Fetch beberapa endpoint",
    "Tugas dari modul Async Programming",
    "Memuat..."
  );
  latihanMultiEndpoint().then((hasil) => {
    multiEl.textContent = `User: ${hasil.totalUser}, produk: ${hasil.totalProduk}, stats: ${json(hasil.stats)}
Waktu total: ${hasil.durasiMs} ms (paralel, kalau berurutan sekitar 1800 ms)`;
  });

  const retryEl = addOutput(
    "Latihan 5b. Retry dengan exponential backoff",
    "Tugas dari modul Async Programming",
    "Mencoba..."
  );
  latihanRetry().then(({ hasil, log }) => {
    retryEl.textContent = `${hasil}
${log.join("\n")}`;
  });

  // tiga latihan berikut punya UI sendiri, jadi cukup dikasih wadah kartunya
  latihanLoadingDanError(
    addOutput(
      "Latihan 5c dan 5d. Loading state dan error boundary",
      "Klik tombol, lihat loading-nya, terus coba yang endpoint rusak",
      ""
    )
  );

  latihanPagination(
    addOutput(
      "Latihan 5e. Pagination dengan async/await",
      "23 data, 5 per halaman",
      ""
    )
  );

  latihanDebounceSearch(
    addOutput(
      "Latihan 5f. Debounced search",
      "Ketik pelan-pelan lalu cepat, bandingkan jumlah ketikan dengan panggilan API",
      ""
    )
  );
}

// tombol Run Demo
document.getElementById("runBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
  runAllDemos();
});
