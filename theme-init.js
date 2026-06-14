/*
 * theme-init.js — applies the saved (or preferred) theme before first paint.
 *
 * Loaded synchronously in <head> (before the stylesheet renders) so dark-mode
 * users never see a flash of the light theme. The full theme logic lives in
 * script.js; this only sets the initial data-theme attribute.
 */
(() => {
  try {
    let theme = localStorage.getItem("wc26wallchart-theme");
    if (!theme) {
      theme = window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (_error) {}
})();
