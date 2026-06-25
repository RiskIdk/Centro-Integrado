// particulares.js — Interacciones exclusivas para particulares.html
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

  // --- LÓGICA DEL MODAL DE AGENDAMIENTO ---
  var modal = document.getElementById("scheduleModal");
  var modalOverlay = document.getElementById("modalOverlay");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var scheduleForm = document.getElementById("scheduleForm");
  var formSpecialty = document.getElementById("formSpecialty");
  var modalTitle = document.getElementById("modalTitle");

  // Capturar clicks de agendamiento
  var scheduleButtons = document.querySelectorAll(".part-btn[data-specialty]");
  scheduleButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var specialty = btn.getAttribute("data-specialty");
      
      // Configurar el modal
      formSpecialty.value = specialty;
      modalTitle.textContent = "Agendar Cita: " + specialty;
      
      // Abrir modal
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Desactivar scroll del body
    });
  });

  // Cerrar modal
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Reactivar scroll
    scheduleForm.reset();
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  // Cerrar con tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Enviar formulario por WhatsApp
  if (scheduleForm) {
    scheduleForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      var nameVal = document.getElementById("formName").value.trim();
      var branchVal = document.getElementById("formBranch").value;
      var dateVal = document.getElementById("formDate").value;
      var timeVal = document.getElementById("formTime").value;
      var specialtyVal = formSpecialty.value;

      var waNumber = "593992602555"; // Contacto OHS
      
      // Construir el mensaje formateado para WhatsApp
      var text = "Hola OHS Centro Médico. Deseo agendar una cita médica de especialidad.\n\n" +
                 "*Mis datos:*\n" +
                 "- *Nombre y Apellido:* " + nameVal + "\n" +
                 "- *Especialidad:* " + specialtyVal + "\n" +
                 "- *Sede de atención:* " + branchVal + "\n";
      
      if (dateVal) {
        // Formatear fecha a algo más legible (AAAA-MM-DD a DD/MM/AAAA)
        var parts = dateVal.split("-");
        var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
        text += "- *Fecha sugerida:* " + formattedDate + "\n";
      } else {
        text += "- *Fecha sugerida:* Por coordinar\n";
      }

      if (timeVal) {
        text += "- *Hora sugerida:* " + timeVal + "\n";
      } else {
        text += "- *Hora sugerida:* Por coordinar\n";
      }

      // Codificar URL y abrir WhatsApp
      var waUrl = "https://api.whatsapp.com/send?phone=" + waNumber + "&text=" + encodeURIComponent(text);
      window.open(waUrl, "_blank");
      
      // Cerrar modal
      closeModal();
    });
  }

  // --- ACCORDION / COLLAPSIBLE CARDS ---
  var partCards = document.querySelectorAll(".part-card");
  partCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      // Si el click fue en el botón de agendar cita, no colapsar la tarjeta
      if (e.target.closest(".part-btn")) {
        return;
      }
      
      // Cerrar las otras tarjetas abiertas para un efecto limpio y ordenado
      partCards.forEach(function (otherCard) {
        if (otherCard !== card && otherCard.classList.contains("is-expanded")) {
          otherCard.classList.remove("is-expanded");
          otherCard.setAttribute("aria-expanded", "false");
        }
      });

      var isExpanded = card.classList.toggle("is-expanded");
      card.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });
  });

  // Animación reveal para las tarjetas de especialidad
  var revealEls = document.querySelectorAll(".part-card");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

    revealEls.forEach(function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      el.style.transitionDelay = (i % 3 * 80) + "ms";
      revealIO.observe(el);
    });

    // Añadir clase is-visible para animar
    document.addEventListener("DOMContentLoaded", function () {
      var style = document.createElement("style");
      style.textContent = ".part-card.is-visible { opacity: 1 !important; transform: translateY(0) !important; }";
      document.head.appendChild(style);
    });
  } else {
    revealEls.forEach(function (el) { el.style.opacity = "1"; });
  }

})();
