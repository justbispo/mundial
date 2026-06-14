/*
 * sw-register.js — registers the service worker so the app is installable
 * as a PWA (and works offline). Loaded with `defer` from index.html.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .catch((error) =>
        console.warn("[pwa] service worker registration failed", error),
      );
  });
}
