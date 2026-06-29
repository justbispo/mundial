/*
 * sw.js — service worker for the Mundial 2026 PWA.
 *
 * Strategy:
 *   - Precache the app shell (HTML/CSS/JS/icons) on install so the app opens
 *     offline and is installable on Android/Chrome.
 *   - Static assets: cache-first (fast, offline-friendly).
 *   - Live API (worldcup26.ir/get/*): always network, never cached, so results
 *     stay fresh.
 * Bump CACHE_VERSION whenever the shell files change to force an update.
 */
const CACHE_VERSION = "mundial26-v19";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./theme-init.js",
  "./data.js",
  "./script.js",
  "./manifest.webmanifest",
  "./icons/favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/world_cup_black.png",
  "./icons/world_cup_white.png",
  "./icons/livemodetv_dark.svg",
  "./icons/livemodetv_light.svg",
  "./icons/rtp1.svg",
  "./icons/sic.png",
  "./icons/sporttv.svg",
  "./icons/sporttv1.svg",
  "./icons/sporttv5.svg",
  "./icons/tvi.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /* Never cache the live results API — always hit the network. */
  if (url.pathname.startsWith("/get/")) {
    return; // let the browser handle it normally
  }

  /* Only manage same-origin requests; let cross-origin pass through. */
  if (url.origin !== self.location.origin) return;

  /* Cache-first for the app shell / static assets, with a network fallback
     that also fills the cache for next time. */
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((response) => {
            if (
              response &&
              response.status === 200 &&
              response.type === "basic"
            ) {
              const copy = response.clone();
              caches
                .open(CACHE_VERSION)
                .then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => {
            /* offline navigation falls back to the cached app shell */
            if (request.mode === "navigate")
              return caches.match("./index.html");
          }),
    ),
  );
});
