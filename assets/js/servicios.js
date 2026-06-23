(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    // 1. Efecto Fade-In Stagger para las Tarjetas de Servicio
    var observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    var cardObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var cards = entry.target.querySelectorAll(".service-card");
          cards.forEach(function(card, idx) {
            setTimeout(function() {
              card.classList.add("visible");
            }, idx * 80); // Stagger de 80ms entre tarjetas
          });
          cardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    var grids = document.querySelectorAll(".services-block-grid");
    grids.forEach(function(grid) {
      cardObserver.observe(grid);
    });

    // 2. Control de clicks en los botones de "Solicitar Servicio"
    var requestButtons = document.querySelectorAll(".btn-request-service");
    requestButtons.forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        var targetType = btn.getAttribute("data-service-type");
        var message = "";
        var whatsappUrl = "";

        if (targetType === "salud") {
          message = encodeURIComponent("Hola, me gustaría solicitar información sobre los Servicios de Salud Ocupacional.");
          whatsappUrl = "https://wa.me/593992631451?text=" + message;
        } else if (targetType === "seguridad") {
          message = encodeURIComponent("Hola, me gustaría solicitar información sobre los Servicios de Seguridad Industrial.");
          whatsappUrl = "https://wa.me/593984064249?text=" + message;
        } else if (targetType === "movil") {
          message = encodeURIComponent("Hola, me gustaría solicitar información sobre la Unidad Médica Móvil.");
          whatsappUrl = "https://wa.me/593992631451?text=" + message;
        } else if (targetType === "brigadistas") {
          message = encodeURIComponent("Hola, me gustaría solicitar información sobre el Programa de Formación de Brigadistas.");
          whatsappUrl = "https://wa.me/593984064249?text=" + message;
        }

        if (whatsappUrl) {
          // Agregar micro-animación antes de redirigir
          btn.style.transform = "scale(0.95)";
          setTimeout(function() {
            btn.style.transform = "";
            window.open(whatsappUrl, "_blank");
          }, 150);
        }
      });
    });

    // 3. Efectos dinámicos en las tarjetas al pasar el cursor (Micro-interacciones)
    var cards = document.querySelectorAll(".service-card");
    cards.forEach(function(card) {
      card.addEventListener("mouseenter", function() {
        var img = card.querySelector("img");
        if (img) {
          img.style.transform = "translateY(-4px) scale(1.05)";
        }
      });
      card.addEventListener("mouseleave", function() {
        var img = card.querySelector("img");
        if (img) {
          img.style.transform = "";
        }
      });
    });
  });
})();
