const CACHE_NAME = "pwa-cache-v1";
const OFFLINE_URL = "https://fadedcloth.de/updates.html";
const ASSETS_TO_CACHE = [
  "https://fadedcloth.de/",
  "https://fadedcloth.de/index.html",
  "https://fadedcloth.de/legal.html",
  "https://fadedcloth.de/offline.html",
  "https://fadedcloth.de/styles/main.scss",
  "https://fadedcloth.de/scripts/animate.js",
  "https://fadedcloth.de/scripts/legal.js",
  //"https://fadedcloth.de/scripts/gallery.js",
  "https://fadedcloth.de/text/privacy-policy.md",
  "https://fadedcloth.de/text/terms-of-service.md",
  "https://shop.fadedcloth.de/index.html",
  "https://cdn.shopify.com/s/files/1/0892/0445/7817/files/icon-512x512.png?v=1738496004",
  "https://cdn.shopify.com/s/files/1/0892/0445/7817/files/icon-192x192.png?v=1738496004"
];

// Service Worker installieren und Dateien cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Netzwerkanfragen abfangen und Cache verwenden
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match(OFFLINE_URL);
        });
      })
  );
});

// Service Worker aktivieren und alte Caches löschen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
