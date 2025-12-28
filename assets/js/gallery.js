/**
 * gallery.js
 * ----------
 * Tiny gallery filter:
 * - Buttons: data-filter="all|bigcats|painteddogs"
 * - Cards: data-tags="bigcats painteddogs"
 */

(function () {
  "use strict";

  function initGalleryFilters() {
    const buttons = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("[data-artwork]");

    if (!buttons.length || !cards.length) return;

    function setActive(btn) {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    }

    function applyFilter(value) {
      cards.forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "").split(" ").filter(Boolean);
        const show = value === "all" || tags.includes(value);
        card.style.display = show ? "" : "none";
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter") || "all";
        setActive(btn);
        applyFilter(filter);
      });
    });

    applyFilter("all");
    buttons[0].classList.add("is-active");
  }

  document.addEventListener("DOMContentLoaded", initGalleryFilters);
})();
