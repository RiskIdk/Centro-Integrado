// Centro Integrado 360 — interacciones de la landing
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

    // Cerrar al elegir una opción
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

  // Animaciones de entrada al hacer scroll
  var revealTargets = document.querySelectorAll(
    ".section .section-title, .hero-copy, .hero-figure, .brand-card, .mv-card, " +
    ".serv-card, .ventaja, .suc-card, .eco-card, .con-card, .table-wrap, .sol-list, " +
    ".mvv-card, .quienes-copy, .quienes-media"
  );

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 6) * 60 + "ms";
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach(function (el) { io.observe(el); });

    // Observer separado para .ventaja-item (animación de slide-in)
    var ventajaItems = document.querySelectorAll(".ventaja-item");
    if (ventajaItems.length) {
      var ventajaObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              ventajaObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      ventajaItems.forEach(function (el) { ventajaObserver.observe(el); });
    }
  } else {
    // Sin animaciones: mostrar todo directamente
    document.querySelectorAll(".ventaja-item").forEach(function(el) {
      el.classList.add("is-visible");
    });
  }


  // --- MIND MAP SVG DESPLEGABLE ---
  var mmWrap = document.getElementById("mindmapStage");
  var mmPanel = document.getElementById("mmDetailPanel");
  var mmPanelInner = document.getElementById("mmPanelInner");
  var mmPanelClose = document.getElementById("mmPanelClose");
  var mmActiveNode = null;

  // Datos de cada nodo: icono, título, descripción y solución
  var MM_DATA = {
    accidentes: {
      icon: "⚠️",
      title: "Accidentes Laborales",
      tag: "Salud Ocupacional",
      desc: "Los accidentes de trabajo representan costos humanos, económicos y legales enormes para las empresas. La falta de vigilancia médica y protocolos adecuados incrementa exponencialmente el riesgo.",
      solution: "Implementamos exámenes pre/post ocupacionales, vigilancia médica continua y campañas preventivas que detectan riesgos antes de que generen incidentes."
    },
    cultura: {
      icon: "📚",
      title: "Baja cultura preventiva",
      tag: "Capacitación",
      desc: "Cuando los trabajadores no conocen los riesgos ni los procedimientos de seguridad, los accidentes son inevitables. La cultura preventiva es el pilar de cualquier programa de seguridad exitoso.",
      solution: "Desarrollamos programas de capacitación de brigadistas, primeros auxilios, manejo de extintores y simulacros de evacuación para construir una cultura de seguridad sólida."
    },
    riesgos: {
      icon: "🛡️",
      title: "Riesgos Industriales",
      tag: "Seguridad Industrial",
      desc: "Los entornos industriales presentan riesgos físicos, químicos, mecánicos y biológicos que, sin gestión adecuada, exponen a los trabajadores a daños graves o fatales.",
      solution: "Identificamos, evaluamos y controlamos los riesgos industriales mediante inspecciones periódicas, EPP especializado y estrategias de mitigación personalizadas para cada sector."
    },
    exposicion: {
      icon: "☢️",
      title: "Exposición a riesgos laborales",
      tag: "Salud & Seguridad",
      desc: "La exposición prolongada a agentes nocivos —ruido, vibraciones, sustancias químicas, temperaturas extremas— genera enfermedades profesionales crónicas y costosas para la empresa.",
      solution: "Realizamos monitoreo de higiene industrial, evaluamos la exposición de cada puesto de trabajo y establecemos controles de ingeniería y administrativos para reducirla al mínimo."
    },
    ausentismo: {
      icon: "📅",
      title: "Ausentismo laboral",
      tag: "Salud Ocupacional",
      desc: "El ausentismo no controlado reduce la productividad, aumenta la carga sobre otros trabajadores y refleja problemas de salud no atendidos que se agravan con el tiempo.",
      solution: "Nuestros programas de vigilancia de salud, campañas preventivas y manejo de enfermedades crónicas laborales reducen las ausencias y mejoran el bienestar general del equipo."
    },
    epp: {
      icon: "🦺",
      title: "Falta de EPP",
      tag: "Seguridad Industrial",
      desc: "El uso incorrecto o la ausencia de Equipos de Protección Personal es una de las principales causas de accidentes y enfermedades laborales. La selección incorrecta del EPP puede ser igual de peligrosa.",
      solution: "Proveemos EPP especializado para cada riesgo —respiratorio, visual, auditivo, mecánico— y capacitamos al personal en su correcto uso, mantenimiento e inspección periódica."
    },
    procesos: {
      icon: "🔗",
      title: "Procesos fragmentados",
      tag: "Modelo 360",
      desc: "Cuando la salud ocupacional y la seguridad industrial operan de forma separada, los datos no se cruzan, se duplican esfuerzos y los trabajadores quedan desprotegidos en las brechas del sistema.",
      solution: "Nuestro modelo Centro Integrado 360 unifica OHS Centro Médico y Grupo Renee bajo una sola plataforma: misma información, misma estrategia, resultados amplificados."
    },
    control: {
      icon: "📊",
      title: "Falta de control ocupacional",
      tag: "Digitalización",
      desc: "Sin sistemas de registro adecuados, es imposible hacer seguimiento a las condiciones de salud de los trabajadores, cumplir con los reportes al SUT o tomar decisiones preventivas basadas en datos.",
      solution: "Nuestro CRM 360 e historias clínicas digitales permiten controlar en tiempo real el estado de salud de cada trabajador, con acceso desde cualquier dispositivo y reportes automáticos al SUT."
    },
    incumplimiento: {
      icon: "📋",
      title: "Incumplimiento normativo",
      tag: "Cumplimiento Legal",
      desc: "El incumplimiento de la normativa laboral ecuatoriana —IESS, Ministerio de Trabajo, SUT— puede resultar en sanciones económicas severas, demandas y daño reputacional para la empresa.",
      solution: "Gestionamos todos los indicadores de salud y seguridad requeridos por la normativa, incluyendo el registro y carga en el SUT, garantizando el cumplimiento legal de tu empresa."
    }
  };

  function openMmPanel(nodeKey) {
    var data = MM_DATA[nodeKey];
    if (!data || !mmPanel || !mmPanelInner) return;

    mmPanelInner.innerHTML =
      '<span class="mm-panel-icon">' + data.icon + '</span>' +
      '<h3 class="mm-panel-title">' + data.title + '</h3>' +
      '<span class="mm-panel-tag">' + data.tag + '</span>' +
      '<p class="mm-panel-desc">' + data.desc + '</p>' +
      '<div class="mm-panel-solution">' +
        '<strong>Nuestra solución 360</strong>' +
        data.solution +
      '</div>';

    mmPanel.classList.add("mm-panel--open");
  }

  function closeMmPanel() {
    if (mmPanel) mmPanel.classList.remove("mm-panel--open");
    // Desactivar nodo previamente activo
    if (mmActiveNode) {
      mmActiveNode.classList.remove("mm-branch--active");
      mmActiveNode = null;
    }
  }

  if (mmWrap) {

    // === CONFIGURAR LÍNEAS ===
    // Las líneas se animarán directamente desde JS para evitar
    // conflictos de especificidad entre inline styles y reglas CSS.
    var mmLines = mmWrap.querySelectorAll(".mm-line");
    mmLines.forEach(function(line) {
      var len = line.getTotalLength ? line.getTotalLength() : 500;
      // Estado inicial: oculta (dashoffset = longitud total)
      line.setAttribute("stroke-dasharray", len);
      line.setAttribute("stroke-dashoffset", len);
    });

    // === CONFIGURAR NODOS CON DELAY ESCALONADO ===
    var mmBranches = mmWrap.querySelectorAll(".mm-branch");
    mmBranches.forEach(function(branch) {
      var delay = parseInt(branch.getAttribute("data-delay") || "0", 10);
      branch.style.transitionDelay = delay + "ms";
    });

    var mmCenterG = mmWrap.querySelector(".mm-center-g");
    if (mmCenterG) mmCenterG.style.transitionDelay = "0ms";

    // === FUNCIÓN PARA ACTIVAR ANIMACIÓN ===
    function activateMindmap() {
      // 1. Activar nodo central y ramas via CSS
      mmWrap.classList.add("mm-active");

      // 2. Animar cada línea directamente con JS (escalonado)
      mmLines.forEach(function(line) {
        var delay = parseInt(line.getAttribute("data-delay") || "0", 10);
        setTimeout(function() {
          line.style.transition = "stroke-dashoffset 0.7s ease, stroke 0.5s ease";
          line.setAttribute("stroke-dashoffset", "0");
          line.setAttribute("stroke", "rgba(255, 200, 80, 0.65)");
        }, delay);
      });
    }

    // === OBSERVER — activa al entrar en pantalla ===
    if ("IntersectionObserver" in window) {
      var mmObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            activateMindmap();
            mmObserver.unobserve(mmWrap);
          }
        });
      }, { threshold: 0.10 });
      mmObserver.observe(mmWrap);
    } else {
      // Fallback si no hay IntersectionObserver
      activateMindmap();
    }

    // Interactividad: clic en nodos rama para abrir el panel
    mmBranches.forEach(function(branch) {
      branch.addEventListener("click", function() {
        var nodeKey = branch.getAttribute("data-node");
        if (!nodeKey) return;

        // Si ya estaba activo, cerramos
        if (mmActiveNode === branch) {
          closeMmPanel();
          return;
        }

        // Desactivar el anterior
        if (mmActiveNode) mmActiveNode.classList.remove("mm-branch--active");

        // Activar el nuevo
        branch.classList.add("mm-branch--active");
        mmActiveNode = branch;
        openMmPanel(nodeKey);
      });

      // Accesibilidad teclado
      branch.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          branch.click();
        }
        if (e.key === "Escape") {
          closeMmPanel();
        }
      });
    });

    // Cerrar panel
    if (mmPanelClose) {
      mmPanelClose.addEventListener("click", closeMmPanel);
    }

    // Cerrar con Escape
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && mmPanel && mmPanel.classList.contains("mm-panel--open")) {
        closeMmPanel();
      }
    });

    // Cerrar al hacer clic fuera del panel (en el fondo del SVG)
    var mmSvg = mmWrap.querySelector(".mindmap-full-svg");
    if (mmSvg) {
      mmSvg.addEventListener("click", function(e) {
        // Si el clic fue en el SVG pero no en un branch, cerrar panel
        if (!e.target.closest(".mm-branch") && mmPanel.classList.contains("mm-panel--open")) {
          closeMmPanel();
        }
      });
    }
  }


  // --- CHATBOX FAQ SYSTEM ---
  var chatbox = document.getElementById("faqChatbox");
  var trigger = document.getElementById("chatboxTrigger");
  var tooltip = document.getElementById("chatboxTooltip");
  var tooltipClose = document.getElementById("tooltipClose");
  var chatWindow = document.getElementById("chatboxWindow");
  var closeBtn = document.getElementById("chatboxCloseBtn");
  var messagesContainer = document.getElementById("chatboxMessages");
  var inputForm = document.getElementById("chatboxInputForm");
  var chatInput = document.getElementById("chatboxInput");
  var badge = document.getElementById("chatboxBadge");
  var quickReplies = document.getElementById("chatboxQuickReplies");

  if (chatbox && trigger && chatWindow) {
    // Mostrar tooltip después de un retraso
    setTimeout(function() {
      if (!chatWindow.classList.contains("open") && tooltip) {
        tooltip.classList.add("show");
      }
    }, 4000);

    // Cerrar tooltip
    if (tooltipClose) {
      tooltipClose.addEventListener("click", function(e) {
        e.stopPropagation();
        tooltip.classList.remove("show");
      });
    }

    // Toggle ventana del chat
    function toggleChat() {
      var isOpen = chatWindow.classList.toggle("open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      chatWindow.setAttribute("aria-hidden", isOpen ? "false" : "true");
      
      // Ocultar tooltip al abrir
      if (isOpen && tooltip) {
        tooltip.classList.remove("show");
      }
      
      // Ocultar badge de notificación
      if (isOpen && badge) {
        badge.style.display = "none";
      }

      // Alternar iconos de trigger
      var iconChat = trigger.querySelector(".icon-chat");
      var iconClose = trigger.querySelector(".icon-close");
      if (isOpen) {
        if (iconChat) iconChat.style.display = "none";
        if (iconClose) iconClose.style.display = "block";
        setTimeout(function() { chatInput.focus(); }, 300);
      } else {
        if (iconChat) iconChat.style.display = "block";
        if (iconClose) iconClose.style.display = "none";
      }

      // Mensaje de bienvenida inicial
      if (isOpen && messagesContainer && messagesContainer.children.length === 0) {
        sendBotMessage("¡Hola! Bienvenido al <b>Centro Integrado 360</b>. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?");
      }
    }

    trigger.addEventListener("click", toggleChat);
    if (closeBtn) closeBtn.addEventListener("click", toggleChat);

    // Respuestas rápidas
    if (quickReplies) {
      quickReplies.addEventListener("click", function(e) {
        var btn = e.target.closest(".quick-reply-btn");
        if (btn) {
          var questionText = btn.textContent;
          var key = btn.getAttribute("data-question");
          addUserMessage(questionText);
          showTypingIndicator();
          
          setTimeout(function() {
            removeTypingIndicator();
            var response = getAnswerByKey(key);
            sendBotMessage(response);
          }, 800);
        }
      });
    }

    // Enviar pregunta desde input
    if (inputForm) {
      inputForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var query = chatInput.value.trim();
        if (!query) return;

        addUserMessage(query);
        chatInput.value = "";
        showTypingIndicator();

        setTimeout(function() {
          removeTypingIndicator();
          var response = findAnswer(query);
          sendBotMessage(response);
        }, 800);
      });
    }

    var FAQ_DATA = [
      {
        key: "servicios",
        keywords: ["servicio", "servicios", "ofrecen", "hacen", "salud", "seguridad", "ocupacional", "industrial", "examen", "examenes", "capacitacion", "capacitaciones"],
        answer: "Ofrecemos soluciones integrales en:<br>• <b>Salud Ocupacional:</b> Exámenes pre/post ocupacionales, toma de muestras in situ, historias clínicas digitales e indicadores SUT.<br>• <b>Seguridad Industrial:</b> EPP especializado, identificación de riesgos y capacitaciones en seguridad laboral."
      },
      {
        key: "sucursales",
        keywords: ["sucursal", "sucursales", "donde", "ubicacion", "ubicados", "direcciones", "quito", "guayaquil", "manta", "sedes", "oficinas", "direccion", "matriz"],
        answer: "Contamos con cobertura nacional en 4 sedes:<br>• <b>Guayaquil Matriz:</b> Av. de las Aguas, Urbanor (junto a UIDE).<br>• <b>Guayaquil Mucho Lote:</b> Mucho Lote 1 (locales 5-8 y 11).<br>• <b>Quito:</b> Av. de la Prensa y Vaca de Castro.<br>• <b>Manta:</b> Av. Flavio Reyes, edificio Platinum."
      },
      {
        key: "horarios",
        keywords: ["horario", "horarios", "atencion", "atendiendo", "hora", "abren", "cierran", "dias", "sabado", "sabados", "semana"],
        answer: "Nuestra matriz en Guayaquil atiende de:<br>• <b>Lunes a Viernes:</b> 07:00 – 19:00.<br>• <b>Sábados:</b> 07:00 – 14:00.<br>Para citas o consultas en otras sedes, contáctanos por WhatsApp."
      },
      {
        key: "contacto",
        keywords: ["contacto", "whatsapp", "telefono", "correo", "mail", "llamar", "escribir", "redes", "celular", "facebook", "instagram", "web", "asesor", "cotizar", "cotizacion", "precio", "precios", "costo", "costos"],
        answer: "Comunícate con nosotros para cotizaciones o dudas:<br>• <b>Salud Ocupacional (OHS):</b> WhatsApp al <a href='https://wa.me/593992631451' target='_blank'>099 263 1451</a> o ventas@ohs.com.ec.<br>• <b>Seguridad Industrial (Grupo Renee):</b> WhatsApp al <a href='https://wa.me/593984064249' target='_blank'>098 406 4249</a> o jefatura.ventas@gruporenee.com.ec."
      },
      {
        key: "movil",
        keywords: ["movil", "unidad", "domicilio", "empresa", "in situ", "viaje", "camion", "brigadas", "brigadistas", "simulacro", "extintor"],
        answer: "¡Sí! Contamos con una <b>Unidad Médica Móvil</b> completamente equipada para realizar exámenes ocupacionales directo en tu empresa a nivel nacional. También capacitamos brigadas en primeros auxilios y evacuación."
      },
      {
        key: "resultados",
        keywords: ["resultado", "resultados", "portal", "pacientes", "crm", "orion", "contifico", "historias", "clinicas", "plataforma", "sistema", "digital"],
        answer: "El <b>Portal de Pacientes</b> para consultar resultados e historias clínicas estará disponible próximamente. Si eres asesor o administrador, puedes ingresar al <b>CRM 360</b> desde la sección Ecosistema Digital en el menú superior."
      }
    ];

    function getAnswerByKey(key) {
      for (var i = 0; i < FAQ_DATA.length; i++) {
        if (FAQ_DATA[i].key === key) return FAQ_DATA[i].answer;
      }
      return "Lo siento, no encontré información sobre eso.";
    }

    function removeAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function findAnswer(query) {
      var cleanQuery = removeAccents(query.toLowerCase());
      var bestMatch = null;
      var maxMatches = 0;
      
      for (var i = 0; i < FAQ_DATA.length; i++) {
        var matches = 0;
        var keywords = FAQ_DATA[i].keywords;
        for (var j = 0; j < keywords.length; j++) {
          if (cleanQuery.indexOf(keywords[j]) !== -1) {
            matches++;
          }
        }
        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = FAQ_DATA[i];
        }
      }

      if (bestMatch && maxMatches > 0) {
        return bestMatch.answer;
      }

      return "Lo siento, no tengo una respuesta exacta para eso. ¿Podrías intentar con palabras clave como 'servicios', 'sucursales', 'horarios', 'contacto' o 'unidad móvil'? También puedes escribir a nuestros asesores vía WhatsApp:<br>• <b>Salud (OHS):</b> <a href='https://wa.me/593992631451' target='_blank'>099 263 1451</a><br>• <b>Seguridad (Renee):</b> <a href='https://wa.me/593984064249' target='_blank'>098 406 4249</a>";
    }

    function addUserMessage(text) {
      var msg = document.createElement("div");
      msg.className = "chat-msg chat-msg--user";
      msg.textContent = text;
      messagesContainer.appendChild(msg);
      scrollToBottom();
    }

    function sendBotMessage(html) {
      var msg = document.createElement("div");
      msg.className = "chat-msg chat-msg--bot";
      msg.innerHTML = html;
      messagesContainer.appendChild(msg);
      scrollToBottom();
    }

    function showTypingIndicator() {
      var indicator = document.createElement("div");
      indicator.className = "typing-indicator";
      indicator.id = "typingIndicator";
      indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
      messagesContainer.appendChild(indicator);
      scrollToBottom();
    }

    function removeTypingIndicator() {
      var indicator = document.getElementById("typingIndicator");
      if (indicator) {
        indicator.parentNode.removeChild(indicator);
      }
    }

    function scrollToBottom() {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }

  // --- FORMULARIO DE CONTACTO INTERACTIVO ---
  var contactForm = document.getElementById("interactiveContactForm");
  var submitBtn = document.getElementById("formSubmitBtn");
  var successAlert = document.getElementById("formSuccessAlert");

  if (contactForm && submitBtn && successAlert) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Cambiar estado del botón a enviando
      var btnText = submitBtn.querySelector("span");
      var btnIcon = submitBtn.querySelector(".send-icon");
      var originalText = btnText ? btnText.textContent : "Enviar Solicitud";

      if (btnText) btnText.textContent = "Enviando...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.75";
      submitBtn.style.cursor = "not-allowed";

      // Simular envío de datos
      setTimeout(function () {
        // Mostrar alerta de éxito
        successAlert.style.display = "flex";
        
        // Desplazar suavemente hasta la alerta de éxito
        successAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Resetear formulario
        contactForm.reset();

        // Restaurar estado del botón
        setTimeout(function () {
          if (btnText) btnText.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "";
          submitBtn.style.cursor = "";
          
          // Ocultar alerta de éxito después de un tiempo
          setTimeout(function() {
            successAlert.style.opacity = "0";
            setTimeout(function() {
              successAlert.style.display = "none";
              successAlert.style.opacity = "1";
            }, 300);
          }, 6000);
        }, 2000);

      }, 1500);
    });
  }

  // --- CARRUSEL SLIDER BANNER HOME ---
  var homeSlider = document.getElementById("homeSlider");
  var sliderTrack = document.getElementById("sliderTrack");
  var slides = document.querySelectorAll("#sliderTrack .slide");
  var prevBtn = document.getElementById("prevSlideBtn");
  var nextBtn = document.getElementById("nextSlideBtn");

  // Generar dots dinámicamente según la cantidad de slides reales
  var dotsContainer = document.getElementById("sliderDots");
  if (dotsContainer && slides.length > 0) {
    dotsContainer.innerHTML = "";
    for (var i = 0; i < slides.length; i++) {
      var span = document.createElement("span");
      span.className = "dot" + (i === 0 ? " active" : "");
      span.setAttribute("data-index", i);
      dotsContainer.appendChild(span);
    }
  }
  var dots = document.querySelectorAll("#sliderDots .dot");

  if (homeSlider && sliderTrack && slides.length > 0) {
    var currentIndex = 0;
    var slideCount = slides.length;
    var startX = 0;
    var currentTranslate = 0;
    var prevTranslate = 0;
    var isDragging = false;
    var animationID = 0;
    var autoplayInterval;

    // Inicializar slider
    updateSliderPosition();
    startAutoplay();

    // Event Listeners para botones
    if (prevBtn) {
      prevBtn.addEventListener("click", function() {
        prevSlide();
        resetAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function() {
        nextSlide();
        resetAutoplay();
      });
    }

    // Event Listeners para los dots
    dots.forEach(function(dot) {
      dot.addEventListener("click", function(e) {
        var index = parseInt(e.target.getAttribute("data-index"));
        goToSlide(index);
        resetAutoplay();
      });
    });

    // Soporte para gestos táctiles (Móviles)
    homeSlider.addEventListener("touchstart", touchStart);
    homeSlider.addEventListener("touchend", touchEnd);
    homeSlider.addEventListener("touchmove", touchMove);

    // Soporte para arrastre de ratón (Desktop)
    homeSlider.addEventListener("mousedown", touchStart);
    homeSlider.addEventListener("mouseup", touchEnd);
    homeSlider.addEventListener("mouseleave", touchEnd);
    homeSlider.addEventListener("mousemove", touchMove);

    // Evitar comportamiento por defecto en imágenes
    slides.forEach(function(slide) {
      slide.addEventListener("dragstart", function(e) { e.preventDefault(); });
    });

    function touchStart(event) {
      isDragging = true;
      startX = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      homeSlider.classList.add("grabbing");
      pauseAutoplay();
    }

    function touchMove(event) {
      if (isDragging) {
        var currentX = getPositionX(event);
        var diffX = currentX - startX;
        currentTranslate = prevTranslate + diffX;
      }
    }

    function touchEnd() {
      if (isDragging) {
        isDragging = false;
        cancelAnimationFrame(animationID);
        var movedBy = currentTranslate - prevTranslate;

        // Si se mueve más de 100px, cambia de slide
        if (movedBy < -100 && currentIndex < slideCount - 1) {
          currentIndex += 1;
        } else if (movedBy > 100 && currentIndex > 0) {
          currentIndex -= 1;
        }

        goToSlide(currentIndex);
        homeSlider.classList.remove("grabbing");
        startAutoplay();
      }
    }

    function getPositionX(event) {
      return event.type.includes("touch") ? event.touches[0].clientX : event.clientX;
    }

    function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
      sliderTrack.style.transform = "translateX(" + currentTranslate + "px)";
    }

    function updateSliderPosition() {
      var width = homeSlider.offsetWidth;
      currentTranslate = currentIndex * -width;
      prevTranslate = currentTranslate;
      sliderTrack.style.transform = "translateX(" + currentTranslate + "px)";
      updateDots();
    }

    function updateDots() {
      dots.forEach(function(dot, index) {
        if (index === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function nextSlide() {
      if (currentIndex < slideCount - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      goToSlide(currentIndex);
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slideCount - 1;
      }
      goToSlide(currentIndex);
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSliderPosition();
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function pauseAutoplay() {
      clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
      pauseAutoplay();
      startAutoplay();
    }

    // Manejar redimensionamiento de ventana
    window.addEventListener("resize", function() {
      updateSliderPosition();
    });
  }

  // --- ACORDION DE TARJETAS EN ¿QUÉ SOLUCIONAMOS? ---
  var accordionCards = document.querySelectorAll(".sol-accordion-card");
  accordionCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var isActive = card.classList.contains("active");

      // Cerrar las demás tarjetas
      accordionCards.forEach(function (c) {
        c.classList.remove("active");
        c.setAttribute("aria-expanded", "false");
        var body = c.querySelector(".sol-card-body");
        if (body) {
          body.style.maxHeight = null;
        }
      });

      // Si no estaba activa, abrirla
      if (!isActive) {
        card.classList.add("active");
        card.setAttribute("aria-expanded", "true");
        var body = card.querySelector(".sol-card-body");
        if (body) {
          body.style.maxHeight = body.scrollHeight + "px";
        }
      }
    });

    // Accesibilidad con teclado
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
})();
