// nosotros.js — Interacciones exclusivas para nosotros.html
(function () {
  "use strict";

  // Año dinámico en el footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    if (nav) {
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A" && header.classList.contains("nav-open")) {
          header.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Abrir menú");
        }
      });
    }
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animación reveal para las tarjetas MVV
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i * 80) + "ms";
      revealIO.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Animación slide-in para los ítems de ¿Por qué elegirnos?
  var viItems = document.querySelectorAll(".nos-vi");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var viIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          viIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    viItems.forEach(function (el) { viIO.observe(el); });
  } else {
    viItems.forEach(function (el) { el.classList.add("is-visible"); });
  }

})();
