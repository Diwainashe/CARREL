/**
 * order-story.js
 * --------------
 * Builds the "guided scroll" ordering section.
 * - Slides are defined in index.html as JSON (data-order-items)
 * - Uses scroll-snap for smooth guided scroll
 * - Uses IntersectionObserver to highlight progress dots
 */

(function () {
  "use strict";

  function parseJsonAttribute(el, attrName) {
    try {
      const raw = el.getAttribute(attrName) || "[]";
      return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse JSON attribute:", attrName, err);
      return [];
    }
  }

  function createProgressDot(label, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "story-dot";
    btn.setAttribute("aria-label", `Go to ${label}`);
    btn.title = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function buildSlideMarkup(item, whatsappLink) {
    return `
      <article class="story-slide snap-start" data-story-slide>
        <div class="story-image">
          <img src="${item.imageSrc}" alt="${item.title}" loading="lazy">
        </div>
        <div class="story-copy">
          ${item.badge ? `<div class="badge">${item.badge}</div>` : ""}
          <h3>${item.title}</h3>
          <p class="muted">${item.description}</p>

          <div class="story-actions">
            <a class="btn btn-primary" href="${whatsappLink}" target="_blank" rel="noreferrer">
              Enquire on WhatsApp
            </a>
            <button class="btn btn-ghost" type="button" data-story-next>
              Next →
            </button>
          </div>

          <p class="tiny muted">
            Tip: Add preferred size, deadline, and reference images in WhatsApp.
          </p>
        </div>
      </article>
    `;
  }

  function initOrderStory() {
    const root = document.querySelector("[data-order-story]");
    if (!root) return;

    const items = parseJsonAttribute(root, "data-order-items");
    const scroller = root.querySelector("[data-story-scroller]");
    const dotsWrap = root.querySelector("[data-story-dots]");
    const countEl = root.querySelector("[data-story-count]");

    if (!scroller || !dotsWrap) return;

    scroller.innerHTML = "";

    items.forEach((item) => {
      const buildWhatsAppLink = window.__CK__?.buildWhatsAppLink;

      const message = [
        "Hi Carrel 👋",
        "",
        `I’d like to enquire about: ${item.enquiryTag || item.title}`,
        "",
        "My idea:",
        "- Subject/Animal:",
        "- Size:",
        "- Budget:",
        "- Deadline:",
        "",
        "Reference images (if any):"
      ].join("\n");

      const wa = typeof buildWhatsAppLink === "function"
        ? buildWhatsAppLink(message)
        : "https://wa.me/263773777615";

      scroller.insertAdjacentHTML("beforeend", buildSlideMarkup(item, wa));
    });

    const slides = Array.from(scroller.querySelectorAll("[data-story-slide]"));
    if (!slides.length) return;

    dotsWrap.innerHTML = "";
    const dots = slides.map((slide, idx) => {
      const item = items[idx];
      const dot = createProgressDot(item?.title || `Slide ${idx + 1}`, () => {
        slide.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    slides.forEach((slide, idx) => {
      const nextBtn = slide.querySelector("[data-story-next]");
      if (!nextBtn) return;

      nextBtn.addEventListener("click", () => {
        const next = Math.min(idx + 1, slides.length - 1);
        slides[next].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    function setActive(index) {
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
      if (countEl) countEl.textContent = `${index + 1} / ${slides.length}`;
    }

    setActive(0);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (!visible) return;

        const idx = slides.findIndex((s) => s === visible.target);
        if (idx >= 0) setActive(idx);
      },
      { root: scroller, threshold: [0.55, 0.65, 0.75] }
    );

    slides.forEach((s) => obs.observe(s));
  }

  document.addEventListener("DOMContentLoaded", initOrderStory);
})();
