// js/app.js
import { API, STORAGE_KEY, MAX_CITIES, DEFAULT_CITY, WEATHER_CODES } from "./modules/data.js";
import { escapeHtml, formatTemp, formatTime, formatDate, zoneLabel, greetingFor } from "./modules/utils.js";

// Satu kota yang dipantau. Ini pengganti TaskItem dari modul, disesuaikan untuk dashboard cuaca.
export class CityItem {
  constructor({ id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, label = "", latitude, longitude, timezone = "Asia/Jakarta", weather = null } = {}) {
    Object.assign(this, { id, name, label, latitude, longitude, timezone, weather });
  }

  // teks, ikon, dan tema warna diturunkan dari kode cuaca terakhir
  get condition() {
    const { code, isDay = 1 } = this.weather ?? {};
    const [text, day, night, theme] = WEATHER_CODES[code] ?? [this.weather ? "Kondisi lain" : "Memuat data", "🌡️", "🌡️", "none"];
    return { text, icon: isDay ? day : night, theme };
  }

  // hasil pencarian geocoding diubah jadi CityItem
  static fromGeocode({ name, admin1, country, latitude, longitude, timezone }) {
    const label = [admin1, country].filter(Boolean).join(", ");
    return new CityItem({ name, label, latitude, longitude, timezone });
  }
}

// Mengurus state, localStorage, pemanggilan API, dan tampilan
export class DashboardApp {
  constructor(els) {
    this.els = els;
    const { unit, cities } = this.load();
    this.unit = unit;
    this.cities = cities.map(c => new CityItem(c));
    this.found = [];
    this.editingId = null;
  }

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved?.cities)) return saved;
    } catch {
      // isi localStorage rusak, pakai data bawaan saja
    }
    return { unit: "C", cities: [DEFAULT_CITY] };
  }

  save() {
    const { unit, cities } = this;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ unit, cities }));
  }

  setStatus(message) {
    this.els.status.textContent = message;
  }

  async fetchWeather(city) {
    const params = new URLSearchParams({
      latitude: city.latitude,
      longitude: city.longitude,
      current_weather: true,
      daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: "auto",
      forecast_days: 1
    });
    const res = await fetch(`${API.weather}?${params}`, { signal: AbortSignal.timeout?.(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const { current_weather: cw, daily, timezone } = await res.json();
    city.timezone = timezone;
    city.weather = {
      temp: cw.temperature,
      wind: cw.windspeed,
      code: cw.weathercode ?? cw.weather_code,
      isDay: cw.is_day,
      max: daily.temperature_2m_max[0],
      min: daily.temperature_2m_min[0],
      rain: daily.precipitation_probability_max?.[0] ?? null // bisa kosong kalau model cuaca tidak menyediakan
    };
  }

  async refreshAll() {
    if (!this.cities.length) return;
    this.setStatus("Memperbarui cuaca...");
    const results = await Promise.allSettled(this.cities.map(c => this.fetchWeather(c)));
    const failed = results.filter(r => r.status === "rejected").length;
    this.save();
    this.render();
    this.setStatus(
      failed
        ? `${failed} kota gagal diperbarui, yang tampil adalah data terakhir.`
        : `Cuaca diperbarui pukul ${new Date().toLocaleTimeString("id-ID")}.`
    );
  }

  async searchCity(query) {
    const params = new URLSearchParams({ name: query, count: 5, language: "id" });
    const res = await fetch(`${API.geocode}?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { results = [] } = await res.json();
    return results;
  }

  async addCity(city) {
    if (this.cities.length >= MAX_CITIES) return this.setStatus(`Maksimal ${MAX_CITIES} kota.`);

    const exists = this.cities.some(c => Math.abs(c.latitude - city.latitude) < 0.01 && Math.abs(c.longitude - city.longitude) < 0.01);
    if (exists) return this.setStatus(`${city.name} sudah ada di dashboard.`);

    this.cities = [...this.cities, city]; // array baru, bukan push
    let message = `${city.name} ditambahkan.`;
    try {
      await this.fetchWeather(city);
    } catch {
      message = `${city.name} ditambahkan, tapi cuacanya belum bisa dimuat.`;
    }
    this.save();
    this.render();
    this.setStatus(message);
  }

  openEdit(id) {
    const city = this.cities.find(c => c.id === id);
    if (!city) return;
    const { editName, editLabel, editDialog } = this.els;
    this.editingId = id;
    editName.value = city.name;
    editLabel.value = city.label;
    editDialog.showModal();
  }

  removeCity(id) {
    const city = this.cities.find(c => c.id === id);
    if (!city || !confirm(`Hapus ${city.name} dari dashboard?`)) return;
    this.cities = this.cities.filter(c => c.id !== id);
    this.save();
    this.render();
    this.setStatus(`${city.name} dihapus.`);
  }

  resetCities() {
    this.cities = [new CityItem(DEFAULT_CITY)];
    this.save();
    this.render();
    this.refreshAll();
  }

  cardHtml({ id, name, label, timezone, weather, condition }) {
    const { text, icon, theme } = condition;
    const { unit } = this;
    const detail = weather
      ? `Maks ${formatTemp(weather.max, unit)}, min ${formatTemp(weather.min, unit)}, ${weather.rain != null ? `peluang hujan ${weather.rain}%, ` : ""}angin ${Math.round(weather.wind)} km/j`
      : "Menunggu data cuaca";

    return `
      <article class="card ${theme}" data-id="${id}">
        <div class="card-top">
          <div>
            <h2>${escapeHtml(name)}</h2>
            <p class="label">${escapeHtml(label)}</p>
          </div>
          <div class="actions">
            <button type="button" data-action="edit" aria-label="Edit ${escapeHtml(name)}">Edit</button>
            <button type="button" data-action="delete" aria-label="Hapus ${escapeHtml(name)}">Hapus</button>
          </div>
        </div>
        <time class="local-time" data-tz="${escapeHtml(timezone)}"></time>
        <div class="temp-row"><span class="icon">${icon}</span><span class="temp">${formatTemp(weather?.temp, unit)}</span></div>
        <p class="cond">${text}</p>
        <p class="meta">${detail}</p>
      </article>`;
  }

  render() {
    const { cities, unitBtn } = this.els;
    unitBtn.textContent = `Ubah ke °${this.unit === "C" ? "F" : "C"}`;
    cities.innerHTML = this.cities.length
      ? this.cities.map(c => this.cardHtml(c)).join("")
      : `<p class="empty">Belum ada kota. Cari kota di atas atau <button type="button" data-action="reset">kembalikan kota bawaan</button>.</p>`;
    this.tick();
  }

  showResults() {
    const { results } = this.els;
    results.hidden = !this.found.length;
    results.innerHTML = this.found
      .map(({ name, admin1, country }, i) => {
        const text = [name, admin1, country].filter(Boolean).join(", ");
        return `<li><button type="button" data-index="${i}">${escapeHtml(text)}</button></li>`;
      })
      .join("");
  }

  // dipanggil tiap detik, hanya mengganti teks jam supaya kartu tidak dirender ulang
  tick() {
    const now = new Date();
    const { clock, date, zone, greeting, cities } = this.els;
    const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    clock.textContent = formatTime(now, localZone);
    date.textContent = formatDate(now, localZone);
    zone.textContent = `Zona waktu perangkat: ${localZone} (${zoneLabel(now, localZone)})`;
    greeting.textContent = greetingFor(now.getHours());
    cities.querySelectorAll("[data-tz]").forEach(el => {
      el.textContent = `${formatTime(now, el.dataset.tz)} ${zoneLabel(now, el.dataset.tz)}`;
    });
  }

  bind() {
    const { searchForm, q, results, cities, unitBtn, refreshBtn, editForm, editName, editLabel, editDialog, cancelEdit, coordForm, coordName, coordLat, coordLon } = this.els;

    searchForm.addEventListener("submit", async e => {
      e.preventDefault();
      const query = q.value.trim();
      if (!query) return;
      this.setStatus(`Mencari "${query}"...`);
      try {
        this.found = await this.searchCity(query);
        this.showResults();
        this.setStatus(this.found.length ? "Pilih salah satu hasil untuk menambahkannya." : `Kota "${query}" tidak ditemukan.`);
      } catch {
        this.setStatus("Pencarian gagal. Cek koneksi internet lalu coba lagi.");
      }
    });

    results.addEventListener("click", async e => {
      const btn = e.target.closest("[data-index]");
      if (!btn) return;
      await this.addCity(CityItem.fromGeocode(this.found[btn.dataset.index]));
      results.hidden = true;
      q.value = "";
    });

    // tambah lokasi lewat koordinat, untuk tempat yang tidak ketemu di pencarian (misalnya kampus)
    coordForm.addEventListener("submit", async e => {
      e.preventDefault();
      const latitude = parseFloat(coordLat.value);
      const longitude = parseFloat(coordLon.value);
      if (!(Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180)) {
        return this.setStatus("Koordinat tidak valid. Latitude harus -90 sampai 90, longitude -180 sampai 180.");
      }
      const name = coordName.value.trim() || `Lokasi ${latitude}, ${longitude}`;
      await this.addCity(new CityItem({ name, label: `${latitude}, ${longitude}`, latitude, longitude }));
      coordForm.reset();
    });

    cities.addEventListener("click", e => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const id = btn.closest("[data-id]")?.dataset.id;
      const actions = {
        edit: () => this.openEdit(id),
        delete: () => this.removeCity(id),
        reset: () => this.resetCities()
      };
      actions[btn.dataset.action]?.();
    });

    unitBtn.addEventListener("click", () => {
      this.unit = this.unit === "C" ? "F" : "C";
      this.save();
      this.render();
    });

    refreshBtn.addEventListener("click", () => this.refreshAll());
    cancelEdit.addEventListener("click", () => editDialog.close());

    // form pakai method="dialog", jadi dialog tertutup sendiri setelah submit
    editForm.addEventListener("submit", () => {
      const fields = { name: editName.value.trim(), label: editLabel.value.trim() };
      this.cities = this.cities.map(c => (c.id === this.editingId ? new CityItem({ ...c, ...fields }) : c));
      this.save();
      this.render();
    });
  }

  start() {
    this.bind();
    this.render(); // tampilkan data tersimpan dulu, baru ambil yang terbaru
    this.refreshAll();
    setInterval(() => this.tick(), 1000);
    setInterval(() => this.refreshAll(), 10 * 60 * 1000);
  }
}
