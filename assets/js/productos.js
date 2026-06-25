// productos.js — Funcionalidad del Catálogo y Carrito de Cotización
(function () {
  "use strict";

  // Base de datos de productos extraída del Catálogo Grupo Renee 2026
  var productsDb = [
    // --- GUANTES DE MANIPULACIÓN ---
    {
      id: "pug-17",
      code: "PUG-17",
      name: "Guantes Negros Ligeros",
      desc: "Recubiertos de poliuretano. Antiestáticos, electrostáticos con alta resistencia a cortes, abrasión y pinchazos.",
      category: "guantes-man",
      sizes: ["S", "M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/PUG-17.png"
    },
    {
      id: "550b",
      code: "550B",
      name: "Guantes de Palma Nitrilo Livianos",
      desc: "Excelente sensibilidad táctil con gran resistencia a cortes, abrasión y perforaciones. Textura microtexturizada.",
      category: "guantes-man",
      sizes: ["S", "M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/550b.png"
    },
    {
      id: "500nftd",
      code: "500NFTD",
      name: "Guantes Espuma Punteada",
      desc: "Guantes livianos sin costuras con tecnología de espuma punteada en la palma. Mayor agarre y resistencia a cortes.",
      category: "guantes-man",
      sizes: ["S", "M", "L", "XL"],
      unit: "par",
      img: "assets/img/GUANTES/500NTFD.png"
    },
    {
      id: "300p",
      code: "300P",
      name: "Guantes Recubiertos Goma Grabada",
      desc: "Palma recubierta de goma grabada azul con soporte de algodón/poliéster sin costuras calibre 10. Para ensamble y construcción.",
      category: "guantes-man",
      sizes: ["M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/300P.png"
    },

    // --- GUANTES Y MANGAS ANTI-CORTE ---
    {
      id: "manga-kevlar",
      code: "MANGA KEVLAR",
      name: "Manga Protectora Kevlar",
      desc: "Calibre 10 sin costuras. Alta resistencia contra cortes y calor de contacto. Cómodas y flexibles.",
      category: "guantes-cor",
      sizes: ["Estándar"],
      unit: "unidad",
      img: "assets/img/GUANTES/manga kevlar.png"
    },
    {
      id: "excalibur-ex5",
      code: "EX5",
      name: "Excalibur® EX5 Anti-Corte",
      desc: "Mezcla de polietileno de alta densidad (HDPE), nylon y spandex con palma y dedos recubiertos. Alta resistencia al corte.",
      category: "guantes-cor",
      sizes: ["S", "L"],
      unit: "par",
      img: "assets/img/GUANTES/EXCALIBUR ex5.png"
    },
    {
      id: "pug-611",
      code: "PUG-611",
      name: "Guante Sin Costuras HDPE",
      desc: "Soporte de fibra de HDPE calibre 13 con palma bañada en poliuretano para excelente agarre y sensibilidad.",
      category: "guantes-cor",
      sizes: ["M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/PUG 611.png"
    },
    {
      id: "excalibur-ex5nff",
      code: "EX5NFF",
      name: "Excalibur® Nitrilo Completo",
      desc: "Soporte HDPE, nylon y spandex recubierto completamente de nitrilo espumado en palma y dorso. Protección de líquidos y cortes.",
      category: "guantes-cor",
      sizes: ["M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/EXCALIBUR EX5NFF.png"
    },
    {
      id: "cr336g",
      code: "CR336G",
      name: "Guantes Nitrilo Anticongelantes",
      desc: "Protección para frío extremo que cumple con la FDA. Textura rugosa de nitrilo ideal para manejo de químicos y alimentos.",
      category: "guantes-cor",
      sizes: ["XS", "S", "M", "L", "XL"],
      unit: "par",
      img: "assets/img/GUANTES/CR336G.png"
    },
    {
      id: "600kv",
      code: "600KV",
      name: "Guantes Alta Visibilidad Anti-Corte",
      desc: "Resistentes al corte, abrasión y perforaciones con tejido de alta visibilidad para entornos de riesgo mecánico.",
      category: "guantes-cor",
      sizes: ["M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/600kv.png"
    },

    // --- GUANTES DE IMPACTO ---
    {
      id: "ut1950",
      code: "UT1950",
      name: "Ultratech® Nitrilo Arenoso",
      desc: "Nylon negro calibre 13 con recubrimiento de nitrilo espumado negro de acabado arenoso para mayor agarre y resistencia a la abrasión.",
      category: "guantes-exa",
      sizes: ["S", "M", "L", "XL"],
      unit: "par",
      img: "assets/img/GUANTES/UltraTech® UT1950.png"
    },

    // --- GUANTES DE EXAMINACIÓN ---
    {
      id: "405pf",
      code: "405PF",
      name: "Guantes de Examen Nitrilo-Vinilo",
      desc: "Guantes desechables de grado médico de 9.5 pulgadas. Libres de polvo, mezcla azul de 5 milésimas de espesor.",
      category: "guantes-exa",
      sizes: ["S", "M", "L"],
      unit: "caja",
      img: "assets/img/GUANTES/405PF.png"
    },
    {
      id: "805pf",
      code: "805PF",
      name: "Guantes Desechables Nitrilo Pesado",
      desc: "Grado examinación, azul, 8 milésimas de espesor y 11 pulgadas de largo. Puntas de los dedos texturizadas, libre de polvo.",
      category: "guantes-exa",
      sizes: ["S", "M", "L"],
      unit: "caja",
      img: "assets/img/GUANTES/805PF.png"
    },
    {
      id: "1005pf",
      code: "1005PF",
      name: "Panther-Guard® Nitrilo Microdiamante",
      desc: "Grado industrial, sin talco, 9 milésimas y 11 pulgadas. Patrón de microdiamantes en relieve para máximo agarre.",
      category: "guantes-exa",
      sizes: ["S", "M", "L", "XL"],
      unit: "caja",
      img: "assets/img/GUANTES/1005PF.png"
    },
    {
      id: "522",
      code: "522 Verde",
      name: "Guantes Extralargos Nitrilo Verde",
      desc: "Guantes sin soporte de 22 milésimas de espesor con diseño diamante elevado. Excelente protección química y resistencia.",
      category: "guantes-exa",
      sizes: ["M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/522 guantes.png"
    },

    // --- GUANTES DE TEMPERATURA & SOLDADURA ---
    {
      id: "mg9648",
      code: "MG9648",
      name: "Predator® Bi-Polímero PVC/Nitrilo",
      desc: "Cuerpo de nylon calibre 18 sin costuras con doble inmersión de bi-polímero. Resistencia química e hidrocarburos.",
      category: "guantes-tem",
      sizes: ["M", "L"],
      unit: "par",
      img: "assets/img/GUANTES/MG9648.png"
    },
    {
      id: "9918rint",
      code: "9918RINT",
      name: "Guantes Frogwear® Neopreno Aislado",
      desc: "Resistentes al calor y químicos, elaborados en neopreno aislado de primera calidad. Longitud de 18 pulgadas.",
      category: "guantes-tem",
      sizes: ["Única"],
      unit: "par",
      img: "assets/img/GUANTES/9918RINT.png"
    },
    {
      id: "modelo-api",
      code: "MODELO API",
      name: "Guante Soldador Split",
      desc: "Fabricado en piel de res split con forro interior resistente a chispas. Indicado para trabajos de soldadura de alto riesgo.",
      category: "guantes-tem",
      sizes: ["Estándar"],
      unit: "par",
      img: "assets/img/GUANTES/GUANTE APY.png"
    },
    {
      id: "tipo-operador",
      code: "OPERADOR NAPA",
      name: "Guante Tipo Operador Napa",
      desc: "Cuero de 1.1 a 1.3 mm en palma, cosido con hilo de algodón, elástico en dorso para ajuste cómodo. Ribete en puño.",
      category: "guantes-tem",
      sizes: ["Estándar"],
      unit: "par",
      img: "assets/img/GUANTES/guante operador.png"
    },

    // --- PROTECCIÓN AUDITIVA ---
    {
      id: "hp-m4",
      code: "HP-M4",
      name: "Orejera Premium HP-M4",
      desc: "Orejera con diadema acolchada para aumentar la comodidad. Atenuación de alto nivel diseñada para reducción de ruido severo.",
      category: "audicion",
      sizes: ["Estándar"],
      unit: "unidad",
      img: "assets/img/OREJERAS/orejeras premium.png"
    },
    {
      id: "hp-m3",
      code: "HP-M3",
      name: "Orejeras para Casco HP-M3",
      desc: "Diseñadas para acoplarse en cascos rígidos ranurados estándar. Tres posiciones de giro. Cojines de PVC suaves.",
      category: "audicion",
      sizes: ["Estándar"],
      unit: "unidad",
      img: "assets/img/OREJERAS/orejeras.png"
    },
    {
      id: "hp-s2",
      code: "HP-S2",
      name: "Tapones de Silicona con Cordón",
      desc: "Tapones de silicona de triple falange reutilizables. NRR 26 dB. Protección efectiva y fácil limpieza.",
      category: "audicion",
      sizes: ["Estándar"],
      unit: "par",
      img: "assets/img/OREJERAS/tapones auditivos.png"
    },

    // --- PROTECCIÓN VISUAL ---
    {
      id: "bh543af",
      code: "BH543AF",
      name: "Gafas de Seguridad Envolventes",
      desc: "Lente único moldeado de curva base 10 con patillas de goma. Visión periférica completa de 180 grados. Anti-empañante.",
      category: "visual",
      sizes: ["Estándar"],
      unit: "unidad",
      img: "assets/img/GAFAS/gafas seguridad.png"
    },
    {
      id: "bh511af",
      code: "BH511AF",
      name: "Gafas de Seguridad Pavón®",
      desc: "Estilo envolvente tradicional con lente de un solo molde de curva base 10. Patillas de goma cómodas. Máxima nitidez.",
      category: "visual",
      sizes: ["Estándar"],
      unit: "unidad",
      img: "assets/img/GAFAS/gafas transparentes.png"
    },

    // --- BOTAS DE PROTECCIÓN ---
    {
      id: "ref-9350",
      code: "REF. 9350",
      name: "Bota Steel Worker 5” Microfibra",
      desc: "Microfibra resistente a la humedad. Suela PU bidensidad, dieléctrica (18 kV, ASTM F2413), puntera composite y construcción Strobel.",
      category: "calzado",
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
      unit: "par",
      img: "assets/img/BOTAS/Ref. 9350.png"
    },
    {
      id: "ref-9860",
      code: "REF. 9860",
      name: "Bota Steel Worker 5” Alta Durabilidad",
      desc: "Microfibra de alta calidad resistente a hidrocarburos and humedad. Dieléctrica (18 kV), puntera de seguridad composite liviana.",
      category: "calzado",
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
      unit: "par",
      img: "assets/img/BOTAS/Ref. 9860.png"
    },
    {
      id: "ref-9852",
      code: "REF. 9852 CAUCHO-PU",
      name: "Bota Steel Worker Tubo Alto 10”",
      desc: "Cuero semigraso hidrofugado. Suela caucho vulcanizado bidensidad, dieléctrica (18 kV), puntera composite y plantilla antipunzón tejida.",
      category: "calzado",
      sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"],
      unit: "par",
      img: "assets/img/BOTAS/Ref. 9852 CAUCHO-PU.png"
    },
    {
      id: "ref-9850",
      code: "REF. 9850 CAUCHO-PU",
      name: "Bota Steel Worker Segura 6”",
      desc: "Cuero semigraso hidrofugado, suela caucho nitrilo. Dieléctrica (18 kV), puntera composite y plantilla antipunzón tipo Kevlar.",
      category: "calzado",
      sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"],
      unit: "par",
      img: "assets/img/BOTAS/Ref. 9850 CAUCHO-PU.png"
    },
    {
      id: "ref-4306",
      code: "REF. 4306",
      name: "Bota Steel Worker Dama 6”",
      desc: "Diseño ergonómico para damas en cuero semigraso hidrofugado. Dieléctrica (18 kV), suela caucho nitrilo y puntera composite.",
      category: "calzado",
      sizes: ["35", "36", "37", "38", "39", "40"],
      unit: "par",
      img: "assets/img/BOTAS/Ref. 4306 para damas.png"
    },
    {
      id: "ref-9368",
      code: "REF. 9368",
      name: "Bota Steel Worker TPU-PU 6”",
      desc: "Bota en microfibra con suela TPU-PU de inyección directa al corte. Dieléctrica (18 kV), puntera composite y sobreplantilla de poliuretano.",
      category: "calzado",
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
      unit: "par",
      img: "assets/img/BOTAS/Ref. 9368.png"
    },
    {
      id: "ref-gp101",
      code: "REF. GP101",
      name: "Bota Alpaca Caña Media",
      desc: "Microfibra 2mm con lengüeta fuelle de lona. Puntera composite liviana, suela antideslizante altamente resistente.",
      category: "calzado",
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
      unit: "par",
      img: "assets/img/BOTAS/Ref.GP101.png"
    },
    {
      id: "ref-9323",
      code: "REF. 9323",
      name: "Bota TPU-PU Confort",
      desc: "Microfibra calibre 1.8-2.0mm con elástico. Inyección directa al corte, dieléctrica, puntera composite y plantilla antipunzón.",
      category: "calzado",
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
      unit: "par",
      img: "assets/img/BOTAS/Ref.9323.png"
    }
  ];

  // Estado del Carrito (recupera de localStorage)
  var cart = JSON.parse(localStorage.getItem("c360_quote_cart")) || [];

  // Elementos DOM
  var productGrid = document.getElementById("productGrid");
  var productCount = document.getElementById("productCount");
  var searchInput = document.getElementById("productSearch");
  var categoriesList = document.getElementById("categoriesList");
  var cartBadge = document.getElementById("cartBadge");
  var floatingCartBadge = document.getElementById("floatingCartBadge");
  var cartDrawer = document.getElementById("cartDrawer");
  var cartOverlay = document.getElementById("cartOverlay");
  var cartTrigger = document.getElementById("cartTrigger");
  var floatingCartBtn = document.getElementById("floatingCartBtn");
  var cartCloseBtn = document.getElementById("cartCloseBtn");
  var cartItemsList = document.getElementById("cartItemsList");
  var cartEmptyState = document.getElementById("cartEmptyState");
  var cartDrawerFooter = document.getElementById("cartDrawerFooter");
  var quoteForm = document.getElementById("quoteForm");
  var btnSendQuote = document.getElementById("btnSendQuote");

  // Filtro y Búsqueda Activos
  var currentCategory = "all";
  var searchQuery = "";

  // Año Footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil del header principal
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (nav) {
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A" && header.classList.contains("nav-open")) {
          header.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  // --- RENDER DE PRODUCTOS ---
  function renderProducts() {
    productGrid.innerHTML = "";
    
    // Filtrado
    var filtered = productsDb.filter(function (prod) {
      var matchesCat = (currentCategory === "all" || prod.category === currentCategory);
      var matchesSearch = (
        prod.name.toLowerCase().includes(searchQuery) ||
        prod.code.toLowerCase().includes(searchQuery) ||
        prod.desc.toLowerCase().includes(searchQuery)
      );
      return matchesCat && matchesSearch;
    });

    productCount.textContent = "Mostrando: " + filtered.length + " productos";

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div class="prod-empty-search" style="grid-column: 1/-1; text-align: center; padding: 4rem var(--sp-4);">
          <span style="font-size: 2.5rem;">🔍</span>
          <h3 style="margin-top: 1rem; color: var(--azul-900);">No se encontraron productos</h3>
          <p style="color: var(--gris-500); font-size: var(--fs-sm);">Prueba con otros términos o cambia de categoría.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(function (prod) {
      // Determinar talla por defecto
      var defaultSize = prod.sizes[0];
      
      var card = document.createElement("article");
      card.className = "prod-card";
      card.setAttribute("data-id", prod.id);

      card.innerHTML = `
        <div class="prod-card-header">
          <span class="prod-badge prod-badge--${prod.category}">
            ${getCategoryName(prod.category)}
          </span>
          <span class="prod-code">${prod.code}</span>
        </div>
        <div class="prod-card-img">
          <img src="${prod.img}" alt="${prod.name}" loading="lazy" />
        </div>
        <h4>${prod.name}</h4>
        <p title="${prod.desc}">${prod.desc}</p>
        
        <div class="prod-specs">
          <span class="prod-spec-title">Talla / Medida</span>
          <div class="prod-sizes">
            ${prod.sizes.map(function (size) {
              return `<button class="size-pill ${size === defaultSize ? 'selected' : ''}" data-size="${size}">${size}</button>`;
            }).join("")}
          </div>
        </div>

        <div class="prod-actions">
          <div class="prod-qty">
            <button class="qty-btn qty-minus">−</button>
            <input type="number" class="qty-input" value="1" min="1" aria-label="Cantidad" />
            <button class="qty-btn qty-plus">+</button>
          </div>
          <button class="btn btn-primary btn-add-cart">
            <span>Añadir</span>
          </button>
        </div>
      `;

      // Eventos del Card
      var sizePills = card.querySelectorAll(".size-pill");
      var qtyInput = card.querySelector(".qty-input");
      var btnAdd = card.querySelector(".btn-add-cart");

      // Talla seleccionable
      sizePills.forEach(function (pill) {
        pill.addEventListener("click", function () {
          sizePills.forEach(function (p) { p.classList.remove("selected"); });
          pill.classList.add("selected");
        });
      });

      // Cantidad +/-
      card.querySelector(".qty-minus").addEventListener("click", function () {
        var val = parseInt(qtyInput.value) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
      card.querySelector(".qty-plus").addEventListener("click", function () {
        var val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
      });

      // Añadir al Carrito
      btnAdd.addEventListener("click", function () {
        var selectedSize = card.querySelector(".size-pill.selected").getAttribute("data-size");
        var qty = parseInt(qtyInput.value) || 1;
        addToCart(prod, selectedSize, qty);
        
        // Efecto micro-animación en el botón
        btnAdd.classList.add("btn-success");
        btnAdd.innerHTML = "<span>¡Añadido! ✓</span>";
        setTimeout(function () {
          btnAdd.classList.remove("btn-success");
          btnAdd.innerHTML = "<span>Añadir</span>";
        }, 1200);
      });

      productGrid.appendChild(card);
    });
  }

  function getCategoryName(catKey) {
    var mapping = {
      "guantes-man": "Manipulación",
      "guantes-cor": "Anti-Corte",
      "guantes-exa": "Examinación",
      "guantes-tem": "Temperatura",
      "audicion": "Auditiva",
      "visual": "Visual",
      "calzado": "Calzado"
    };
    return mapping[catKey] || "EPP";
  }

  // --- FUNCIONES DEL CARRITO ---
  function addToCart(product, size, qty) {
    // Buscar si ya existe la misma combinación producto + talla
    var existingIndex = cart.findIndex(function (item) {
      return item.id === product.id && item.size === size;
    });

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: product.id,
        code: product.code,
        name: product.name,
        category: product.category,
        size: size,
        qty: qty,
        unit: product.unit
      });
    }

    saveCart();
    updateCartUi();
  }

  function removeFromCart(id, size) {
    cart = cart.filter(function (item) {
      return !(item.id === id && item.size === size);
    });
    saveCart();
    updateCartUi();
  }

  function updateCartQty(id, size, newQty) {
    var index = cart.findIndex(function (item) {
      return item.id === id && item.size === size;
    });
    if (index > -1 && newQty > 0) {
      cart[index].qty = newQty;
      saveCart();
      updateCartUi();
    }
  }

  function saveCart() {
    localStorage.setItem("c360_quote_cart", JSON.stringify(cart));
  }

  function updateCartUi() {
    // Cuenta total de ítems agregados
    var totalCount = cart.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);

    cartBadge.textContent = totalCount;
    floatingCartBadge.textContent = totalCount;

    // Render listado
    cartItemsList.innerHTML = "";
    if (cart.length === 0) {
      cartEmptyState.style.display = "flex";
      cartDrawerFooter.style.display = "none";
    } else {
      cartEmptyState.style.display = "none";
      cartDrawerFooter.style.display = "block";

      cart.forEach(function (item) {
        var el = document.createElement("div");
        el.className = "cart-item";
        el.innerHTML = `
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-code">${item.code}</span>
            <div class="cart-item-meta">
              <span>Talla: <strong>${item.size}</strong></span>
              <span>Unidad: ${item.unit}</span>
            </div>
            
            <div class="cart-item-controls">
              <div class="cart-item-qty">
                <button class="qty-btn btn-dec">−</button>
                <input type="number" class="qty-input" value="${item.qty}" min="1" aria-label="Cantidad" />
                <button class="qty-btn btn-inc">+</button>
              </div>
              <button class="cart-item-remove">Eliminar</button>
            </div>
          </div>
        `;

        var input = el.querySelector(".qty-input");
        
        el.querySelector(".btn-dec").addEventListener("click", function () {
          var current = parseInt(input.value) || 1;
          if (current > 1) updateCartQty(item.id, item.size, current - 1);
        });

        el.querySelector(".btn-inc").addEventListener("click", function () {
          var current = parseInt(input.value) || 1;
          updateCartQty(item.id, item.size, current + 1);
        });

        input.addEventListener("change", function () {
          var val = parseInt(input.value) || 1;
          updateCartQty(item.id, item.size, val);
        });

        el.querySelector(".cart-item-remove").addEventListener("click", function () {
          removeFromCart(item.id, item.size);
        });

        cartItemsList.appendChild(el);
      });
    }
  }

  // --- ABRIR / CERRAR DRAWER ---
  function openDrawer() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }

  cartTrigger.addEventListener("click", openDrawer);
  floatingCartBtn.addEventListener("click", openDrawer);
  cartCloseBtn.addEventListener("click", closeDrawer);
  cartOverlay.addEventListener("click", closeDrawer);

  // --- FILTROS DE CATEGORÍA ---
  var catBtns = categoriesList.querySelectorAll(".prod-cat-btn");
  catBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      catBtns.forEach(function (b) { b.classList.remove("prod-cat-btn--active"); });
      btn.classList.add("prod-cat-btn--active");
      
      currentCategory = btn.getAttribute("data-filter");
      renderProducts();
      
      // Auto scroll suave a la toolbar si es móvil
      if (window.innerWidth <= 980) {
        document.querySelector(".prod-toolbar").scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- BÚSQUEDA ---
  searchInput.addEventListener("input", function (e) {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });

  // --- ENVIAR COTIZACIÓN POR WHATSAPP ---
  btnSendQuote.addEventListener("click", function (e) {
    e.preventDefault();

    var nameVal = document.getElementById("quoteName").value.trim();
    var companyVal = document.getElementById("quoteCompany").value.trim();

    if (!nameVal) {
      alert("Por favor, introduce tu Nombre y Apellido para completar la cotización.");
      document.getElementById("quoteName").focus();
      return;
    }

    // Armar el mensaje para WhatsApp
    var waNumber = "593999856207"; // Teléfono de Grupo Renee/OHS para cotizaciones
    var greeting = "¡Hola Centro Integrado 360 Ecuador! Me gustaría solicitar una cotización para mi empresa.\n\n";
    var clientInfo = `*Cliente:* ${nameVal}\n`;
    if (companyVal) {
      clientInfo += `*Empresa:* ${companyVal}\n`;
    }
    clientInfo += "\n*Productos solicitados:*\n";

    var itemsText = "";
    cart.forEach(function (item) {
      itemsText += `- *${item.qty}* unit. de *${item.name}* (Ref: ${item.code}) - Talla/Medida: *${item.size}*\n`;
    });

    var footer = "\nQuedo atento a su cotización formal. ¡Gracias!";
    var fullText = greeting + clientInfo + itemsText + footer;
    
    // Generar link WhatsApp
    var waUrl = "https://api.whatsapp.com/send?phone=" + waNumber + "&text=" + encodeURIComponent(fullText);
    
    // Abrir en pestaña nueva
    window.open(waUrl, "_blank");

    // Opcional: Limpiar el carrito después de enviar
    cart = [];
    saveCart();
    updateCartUi();
    closeDrawer();
  });

  // --- LIGHTBOX DE IMÁGENES (DELEGACIÓN DE EVENTOS) ---
  var lightbox = document.getElementById("prodLightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lightboxClose = document.getElementById("lightboxClose");

  if (productGrid && lightbox && lightboxImg && lightboxTitle && lightboxClose) {
    productGrid.addEventListener("click", function (e) {
      var imgContainer = e.target.closest(".prod-card-img");
      if (imgContainer) {
        var imgEl = imgContainer.querySelector("img");
        var cardEl = imgContainer.closest(".prod-card");
        if (imgEl && cardEl) {
          var titleEl = cardEl.querySelector("h4");
          var titleText = titleEl ? titleEl.textContent : "";
          
          lightboxImg.src = imgEl.src;
          lightboxImg.alt = imgEl.alt;
          lightboxTitle.textContent = titleText;
          
          lightbox.classList.add("open");
          lightbox.setAttribute("aria-hidden", "false");
        }
      }
    });

    lightboxClose.addEventListener("click", function () {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Carga inicial
  renderProducts();
  updateCartUi();

  // Detectar categoría desde Query String (ej. desde el navbar dropdown)
  var params = new URLSearchParams(window.location.search);
  var urlCat = params.get("cat");
  if (urlCat) {
    var targetBtn = categoriesList.querySelector(`[data-filter="${urlCat}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }

})();
