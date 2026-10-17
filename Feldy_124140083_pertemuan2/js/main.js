// js/main.js
// file pertama yang dijalankan: ambil elemen HTML, lalu start dashboard
import { DashboardApp } from "./app.js";

const ids = [
  "greeting", "clock", "date", "zone", "searchForm", "q", "results", "status", "cities",
  "unitBtn", "refreshBtn", "editDialog", "editForm", "editName", "editLabel", "cancelEdit",
  "coordForm", "coordName", "coordLat", "coordLon"
];
const els = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));

new DashboardApp(els).start();
