const CACHE_NAME = "xalapa-rutas-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./data/ruta8.geojson",
  "./data/ruta20.geojson",
  "https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.css",
  "https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

self.addEventListener("message", e => {
  if (e.data === "update") {
    caches.keys().then(keys => {
      keys.forEach(key => caches.delete(key));
    }).then(() => {
      self.skipWaiting();
    });
  }
});