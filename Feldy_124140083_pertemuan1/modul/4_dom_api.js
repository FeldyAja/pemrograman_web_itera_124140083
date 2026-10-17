// 1. Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode'); //[cite: 27]
}

// 2. Todo List dengan LocalStorage
let todos = JSON.parse(localStorage.getItem('todo_list')) || []; //[cite: 27]

function renderTodo() {
    document.getElementById("listTodo").innerHTML = todos.map((t, i) => `
        <li>
            <span style="text-decoration: ${t.selesai ? 'line-through' : 'none'}">${t.teks}</span>
            <button onclick="tandaiSelesai(${i})">✓</button>
            <button class="btn-danger" onclick="hapusTodo(${i})">X</button>
        </li>
    `).join("");
}

function tambahTodo() {
    let teks = document.getElementById("inputTodo").value;
    todos.push({ teks, selesai: false });
    localStorage.setItem('todo_list', JSON.stringify(todos)); //[cite: 27]
    renderTodo();
}

function hapusTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todo_list', JSON.stringify(todos)); //[cite: 27]
    renderTodo();
}

function tandaiSelesai(index) {
    todos[index].selesai = !todos[index].selesai;
    localStorage.setItem('todo_list', JSON.stringify(todos)); //[cite: 27]
    renderTodo();
}
renderTodo();

// 3. Fetch API, Search & Pagination
let posts = [];
let halamanAktif = 1;
const itemPerHalaman = 5;

async function ambilData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts"); //[cite: 25]
    posts = await res.json();
    renderAPI();
}

function renderAPI(data = posts) {
    let awal = (halamanAktif - 1) * itemPerHalaman;
    let potongan = data.slice(awal, awal + itemPerHalaman); //[cite: 27]
    
    document.getElementById("apiOutput").innerHTML = potongan.map(p => `
        <div style="border-bottom:1px solid #ccc; margin-bottom:10px;">
            <h4>${p.title}</h4>
        </div>
    `).join("");
    document.getElementById("infoHalaman").innerText = `Halaman ${halamanAktif}`;
}

function gantiHalaman(arah) {
    halamanAktif += arah;
    if (halamanAktif < 1) halamanAktif = 1; //[cite: 27]
    renderAPI();
}

function cariData() {
    let keyword = document.getElementById("cariPost").value.toLowerCase();
    let hasilCari = posts.filter(p => p.title.toLowerCase().includes(keyword)); //[cite: 27]
    halamanAktif = 1; 
    renderAPI(hasilCari);
}

ambilData();