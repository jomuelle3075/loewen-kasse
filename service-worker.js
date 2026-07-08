// LöwenKasse Service Worker
// Sorgt dafür, dass die App auch ohne Internet funktioniert.
// Bei jedem neuen Deploy die Versions-Nummer hochzählen, damit alle Geräte
// die neue Version laden.
const CACHE_NAME = 'loewenkasse-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {
      // Auch wenn einzelne Icons fehlen, soll der SW installieren
      return Promise.resolve();
    })),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Im Hintergrund nach Updates schauen, aber sofort die Cache-Version liefern
        fetch(event.request)
          .then((fresh) => {
            if (fresh && fresh.ok) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, fresh.clone()));
            }
          })
          .catch(() => {});
        return cached;
      }
      return fetch(event.request).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    }),
  );
});
