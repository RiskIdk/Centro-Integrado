// encuentranos.js — Interacciones de encuentranos.html
(function () {
  "use strict";

  // Año en footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Menú móvil ──────────────────────────────────
  var header  = document.querySelector(".site-header");
  var toggle  = document.getElementById("navToggle");
  var navEl   = document.getElementById("mainNav");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    if (navEl) {
      navEl.addEventListener("click", function (e) {
        if (e.target.tagName === "A" && header.classList.contains("nav-open")) {
          header.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Abrir menú");
        }
      });
    }
  }

  // ── Tabs de sedes ───────────────────────────────
  var tabs   = document.querySelectorAll(".enc-tab");
  var panels = document.querySelectorAll(".enc-panel");

  function activateTab(tab) {
    // Desactivar todos
    tabs.forEach(function (t) {
      t.classList.remove("enc-tab--active");
      t.setAttribute("aria-selected", "false");
    });
    panels.forEach(function (p) {
      p.classList.remove("enc-panel--active");
      p.hidden = true;
    });

    // Activar el seleccionado
    tab.classList.add("enc-tab--active");
    tab.setAttribute("aria-selected", "true");

    var targetId = tab.getAttribute("data-target");
    var panel = document.getElementById(targetId);
    if (panel) {
      panel.classList.add("enc-panel--active");
      panel.hidden = false;
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activateTab(tab);
    });

    // Navegación con teclado (←→ entre tabs)
    tab.addEventListener("keydown", function (e) {
      var idx   = Array.from(tabs).indexOf(tab);
      var total = tabs.length;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        activateTab(tabs[(idx + 1) % total]);
        tabs[(idx + 1) % total].focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        activateTab(tabs[(idx - 1 + total) % total]);
        tabs[(idx - 1 + total) % total].focus();
      }
    });
  });

  // ── Scroll animado (reveal) ──────────────────────
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls    = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

})();
