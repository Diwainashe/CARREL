/**
 * main.js
 * --------
 * Runs on EVERY page.
 * - Injects shared header + footer (so you edit once, it updates everywhere)
 * - Highlights active nav link
 * - Mobile menu toggle
 * - Subtle reveal-on-scroll animation helper
 *
 * Why this approach (instead of server-side includes)?
 * - Works as a "normal static site" with just HTML/CSS/JS files
 * - No build steps
 * - Easy to host on GitHub Pages / Netlify / any basic hosting
 */

(function () {
  "use strict";

  // ✅ Carrel's WhatsApp number (digits only, international format)
  const WHATSAPP_NUMBER = "263773777615";

  /**
   * Build a WhatsApp click-to-chat URL with pre-filled text.
   * WhatsApp expects URL-encoded text.
   */
  function buildWhatsAppLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  function renderHeader() {
    // Default enquiry template (used by header CTA)
    const message = [
      "Hi Carrel 👋",
      "",
      "I’d like to enquire about a painting.",
      "",
      "My idea:",
      "- Subject/Animal:",
      "- Size:",
      "- Budget:",
      "- Deadline:",
      "",
      "Reference images (if any):"
    ].join("\n");

    const wa = buildWhatsAppLink(message);

    return `
      <header class="site-header">
        <div class="container header-row">
          <a class="brand" href="index.html" aria-label="Go to homepage">
            <span class="brand-mark" aria-hidden="true">CK</span>
            <span class="brand-text">
              <span class="brand-name">Carrel Kumbirai</span>
              <span class="brand-tag">Wildlife Painter</span>
            </span>
          </a>

          <nav class="nav" aria-label="Primary">
            <a class="nav-link" href="index.html">Home</a>
            <a class="nav-link" href="gallery.html">Gallery</a>
            <a class="nav-link" href="commissions.html">Commissions</a>
            <a class="nav-link" href="about.html">About</a>
            <a class="nav-link" href="contact.html">Contact</a>
          </nav>

          <div class="header-actions">
            <a class="btn btn-ghost" href="https://www.instagram.com/kumbiraicarrel/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a class="btn btn-primary" href="${wa}" target="_blank" rel="noreferrer">
              WhatsApp Enquiry
            </a>

            <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false">
              <span class="menu-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>

        <div class="mobile-nav" hidden>
          <div class="container mobile-nav-inner">
            <a class="nav-link" href="index.html">Home</a>
            <a class="nav-link" href="gallery.html">Gallery</a>
            <a class="nav-link" href="commissions.html">Commissions</a>
            <a class="nav-link" href="about.html">About</a>
            <a class="nav-link" href="contact.html">Contact</a>
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="footer-brand">
              <span class="brand-mark" aria-hidden="true">CK</span>
              <div>
                <div class="footer-title">Carrel Kumbirai</div>
                <div class="footer-sub">Wildlife paintings • Commissions • Prints</div>
              </div>
            </div>
            <p class="muted small">
              Earth-tone wildlife artwork inspired by Africa. WhatsApp enquiries for commissions and availability.
            </p>
          </div>

          <div>
            <div class="footer-heading">Explore</div>
            <ul class="footer-links">
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="commissions.html">Commissions</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-heading">Contact</div>
            <ul class="footer-links">
              <li><a href="https://wa.me/263773777615" target="_blank" rel="noreferrer">WhatsApp: +263 773 777 615</a></li>
              <li><a href="https://www.instagram.com/kumbiraicarrel/" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
            <div class="muted small">© ${year} Carrel Kumbirai. All rights reserved.</div>
          </div>
        </div>
      </footer>
    `;
  }

  function injectLayout() {
    const headerMount = document.getElementById("site-header");
    const footerMount = document.getElementById("site-footer");

    if (headerMount) headerMount.innerHTML = renderHeader();
    if (footerMount) footerMount.innerHTML = renderFooter();

    setupActiveNav();
    setupMobileMenu();
    setupRevealAnimations();
  }

  function setupActiveNav() {
    const path = window.location.pathname;
    const current = path.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href === current) a.classList.add("is-active");
    });
  }

  function setupMobileMenu() {
    const btn = document.querySelector(".menu-btn");
    const mobile = document.querySelector(".mobile-nav");

    if (!btn || !mobile) return;

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      mobile.hidden = expanded;
    });
  }

  function setupRevealAnimations() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach((n) => obs.observe(n));
  }

  document.addEventListener("DOMContentLoaded", injectLayout);

  // Expose helper so other scripts can reuse it
  window.__CK__ = { buildWhatsAppLink };
})();
