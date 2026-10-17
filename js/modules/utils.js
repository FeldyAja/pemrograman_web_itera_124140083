// js/modules/utils.js
// fungsi kecil buat format suhu, jam, dan tanggal
import { ZONE_NAMES } from "./data.js";

// nama kota datang dari API dan input user, jadi di-escape dulu sebelum masuk innerHTML
export const escapeHtml = (text = "") =>
  String(text).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

export const formatTemp = (celsius, unit = "C") => {
  if (celsius == null) return "--°";
  const value = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
  return `${Math.round(value)}°${unit}`;
};

// format id-ID memakai titik untuk jam (14.05.09), saya ganti jadi titik dua
export const formatTime = (date, timeZone) =>
  new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone })
    .format(date)
    .replaceAll(".", ":");

export const formatDate = (date, timeZone) =>
  new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone }).format(date);

// WIB/WITA/WIT untuk zona Indonesia, selain itu pakai singkatan bawaan browser (GMT+9, dst.)
export const zoneLabel = (date, timeZone) =>
  ZONE_NAMES[timeZone] ??
  new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "short" })
    .formatToParts(date)
    .find(part => part.type === "timeZoneName")?.value ??
  "";

export const greetingFor = hour =>
  hour >= 18 || hour < 4 ? "Selamat malam" : hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : "Selamat sore";
