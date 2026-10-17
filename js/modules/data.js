// js/modules/data.js
// data yang tidak berubah: alamat API, kota bawaan, dan daftar kode cuaca

export const API = {
  weather: "https://api.open-meteo.com/v1/forecast",
  geocode: "https://geocoding-api.open-meteo.com/v1/search"
};

export const STORAGE_KEY = "dashboard-cuaca-waktu";
export const MAX_CITIES = 8;

// kota awal waktu localStorage masih kosong (koordinat kampus ITERA, sesuai contoh di modul)
export const DEFAULT_CITY = {
  name: "Kampus ITERA",
  label: "Lampung Selatan",
  latitude: -5.36,
  longitude: 105.31,
  timezone: "Asia/Jakarta"
};

// kode cuaca WMO dari Open-Meteo: [keterangan, ikon siang, ikon malam, tema warna kartu]
export const WEATHER_CODES = {
  0: ["Cerah", "☀️", "🌙", "clear"],
  1: ["Cerah berawan", "🌤️", "🌙", "clear"],
  2: ["Berawan", "⛅", "☁️", "cloud"],
  3: ["Mendung", "☁️", "☁️", "cloud"],
  45: ["Berkabut", "🌫️", "🌫️", "cloud"],
  48: ["Kabut tebal", "🌫️", "🌫️", "cloud"],
  51: ["Gerimis ringan", "🌦️", "🌧️", "rain"],
  53: ["Gerimis", "🌦️", "🌧️", "rain"],
  55: ["Gerimis lebat", "🌧️", "🌧️", "rain"],
  61: ["Hujan ringan", "🌦️", "🌧️", "rain"],
  63: ["Hujan sedang", "🌧️", "🌧️", "rain"],
  65: ["Hujan lebat", "🌧️", "🌧️", "rain"],
  71: ["Salju ringan", "🌨️", "🌨️", "snow"],
  73: ["Salju", "🌨️", "🌨️", "snow"],
  75: ["Salju lebat", "❄️", "❄️", "snow"],
  80: ["Hujan sesaat", "🌦️", "🌧️", "rain"],
  81: ["Hujan sesaat lebat", "🌧️", "🌧️", "rain"],
  82: ["Hujan sangat deras", "🌧️", "🌧️", "rain"],
  95: ["Badai petir", "⛈️", "⛈️", "storm"],
  96: ["Badai petir dan es", "⛈️", "⛈️", "storm"],
  99: ["Badai petir dan es lebat", "⛈️", "⛈️", "storm"]
};

export const ZONE_NAMES = {
  "Asia/Jakarta": "WIB",
  "Asia/Makassar": "WITA",
  "Asia/Jayapura": "WIT"
};
