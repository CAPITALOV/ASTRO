const CACHE = 'astro-v5';
const ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Кэшируем только обычные HTTP(S) GET-запросы.
  // Пропускаем chrome-extension://, moz-extension://, data:, blob:, file:
  // и любые не-GET методы — иначе Cache API выбрасывает TypeError.
  if (e.request.method !== 'GET') return;

  let url;
  try {
    url = new URL(e.request.url);
  } catch (_) {
    return;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((resp) => {
          // Кэшируем только успешные ответы
          if (resp.ok && resp.type === 'basic') {
            const clone = resp.clone();
            caches.open(CACHE).then((c) => {
              // Страховка: put() может упасть на неподдерживаемых запросах
              c.put(e.request, clone).catch(() => {});
            });
          }
          return resp;
        })
        .catch(() => caches.match('/index.html'));
    })
  );
});