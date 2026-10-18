/**
 * MIRABILIA — Arquitectura de la Mirada
 * Motor de Paños de Seda (FeralUI Flow Style) + Interacciones Cinematográficas
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CONFIGURACIÓN DEL NEGOCIO
     ========================================================================== */
  const WHATSAPP_PHONE = '56912345678'; 
  const DEPOSIT_AMOUNT = 5000;

  /* ==========================================================================
     //Nueva seccion de sugerencia: 2. MOTOR CANVAS DE PAÑOS DE SEDA LÍQUIDA (FERALUI FLOW)
     ========================================================================== */
  const canvas = document.getElementById('silkCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    // Presets inspirados en tu paleta oficial y en la captura de FeralUI (Willow Mist / Forest Tea / Gold)
    const silkPalettes = {
      emerald: {
        bg: '#061511',
        ribbons: [
          { color1: 'rgba(24, 88, 68, 0.65)', color2: 'rgba(120, 148, 127, 0.35)', amp: 130, freq: 0.0018, speed: 0.008, yOffset: 0.25 },
          { color1: 'rgba(176, 138, 79, 0.32)', color2: 'rgba(24, 88, 68, 0.15)', amp: 160, freq: 0.0014, speed: -0.006, yOffset: 0.55 },
          { color1: 'rgba(120, 148, 127, 0.42)', color2: 'rgba(242, 235, 221, 0.14)', amp: 110, freq: 0.0022, speed: 0.01, yOffset: 0.78 }
        ]
      },
      gold: {
        bg: '#091914',
        ribbons: [
          { color1: 'rgba(176, 138, 79, 0.55)', color2: 'rgba(212, 178, 121, 0.28)', amp: 145, freq: 0.0017, speed: 0.009, yOffset: 0.28 },
          { color1: 'rgba(24, 88, 68, 0.5)', color2: 'rgba(176, 138, 79, 0.22)', amp: 165, freq: 0.0013, speed: -0.007, yOffset: 0.55 },
          { color1: 'rgba(242, 235, 221, 0.25)', color2: 'rgba(176, 138, 79, 0.15)', amp: 115, freq: 0.0021, speed: 0.011, yOffset: 0.76 }
        ]
      },
      mist: {
        bg: '#071D17',
        ribbons: [
          { color1: 'rgba(120, 148, 127, 0.62)', color2: 'rgba(182, 222, 202, 0.35)', amp: 140, freq: 0.0019, speed: 0.008, yOffset: 0.25 },
          { color1: 'rgba(24, 88, 68, 0.58)', color2: 'rgba(120, 148, 127, 0.28)', amp: 170, freq: 0.0015, speed: -0.006, yOffset: 0.52 },
          { color1: 'rgba(212, 178, 121, 0.28)', color2: 'rgba(242, 235, 221, 0.2)', amp: 120, freq: 0.002, speed: 0.009, yOffset: 0.78 }
        ]
      }
    };

    let currentMood = 'emerald';

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Renderizado de los pliegues de seda con distorsión armónica
    const drawSilk = () => {
      const palette = silkPalettes[currentMood];
      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      palette.ribbons.forEach((ribbon, idx) => {
        const baseY = height * ribbon.yOffset;
        const grad = ctx.createLinearGradient(0, baseY - 220, width, baseY + 220);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.25, ribbon.color1);
        grad.addColorStop(0.65, ribbon.color2);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, height);

        // Borde superior del paño de seda
        for (let x = 0; x <= width; x += 24) {
          const wave1 = Math.sin(x * ribbon.freq + time * ribbon.speed + idx) * ribbon.amp;
          const wave2 = Math.cos(x * (ribbon.freq * 0.6) - time * (ribbon.speed * 0.8)) * (ribbon.amp * 0.45);
          const y = baseY + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        // Borde inferior desfasado para crear el grosor variable del pliegue de seda
        for (let x = width; x >= 0; x -= 24) {
          const wave1 = Math.sin(x * ribbon.freq + time * ribbon.speed + idx + 1.4) * (ribbon.amp * 1.15);
          const wave2 = Math.cos(x * (ribbon.freq * 0.5) + time * ribbon.speed) * (ribbon.amp * 0.55);
          const y = baseY + 260 + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.filter = 'blur(42px)';
        ctx.fill();
      });

      ctx.restore();
      time += 1;
      requestAnimationFrame(drawSilk);
    };

    drawSilk();

    // Botones para cambiar la atmósfera de seda en vivo
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        moodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMood = btn.getAttribute('data-mood') || 'emerald';
      });
    });
  }

  /* ==========================================================================
     3. ILUMINACIÓN INTERACTIVA FERALUI (SPOTLIGHT & AMBIENT GLOW)
     ========================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  window.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }

    spotlightCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     4. SCROLL REVEAL CINEMATOGRÁFICO
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     5. MENÚ RESPONSIVO (MOBILE DRAWER)
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     6. FILTRADO POR PESTAÑAS (CATEGORÍAS DE SERVICIOS)
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  const filterServices = (category) => {
    serviceCards.forEach(card => {
      const match = category === 'todos' || card.getAttribute('data-category') === category;
      if (match) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const category = button.getAttribute('data-category');
      filterServices(category);
    });
  });

  filterServices('pestanas');

  /* ==========================================================================
     7. LÓGICA DEL RECOMENDADOR INTERACTIVO DE MIRADA
     ========================================================================== */
  const recommendations = {
    'pestanas-salud': {
      title: 'Lifting Coreano',
      desc: 'Ideal para pestañas sensibles o rectas que buscan una elevación sedosa con queratina y péptidos botánicos de bajo impacto químico.',
      price: '$20.000',
      service: 'Lifting Coreano'
    },
    'cejas-definidas': {
      title: 'Dúo Cejas Perfectas',
      desc: 'Combina Visagismo + Perfilado + Laminado para estructurar la simetría de tu rostro y fijar el vello con efecto pluma disciplinado.',
      price: '$16.000',
      service: 'Dúo Cejas Perfectas'
    },
    'transformacion-total': {
      title: 'Experiencia Coreana Completa',
      desc: 'Nuestro tratamiento Signature: Lifting Coreano nutritivo + Diseño y Visagismo + Laminado de cejas para una armonía total.',
      price: '$32.000',
      service: 'Experiencia Coreana Completa'
    }
  };

  const advisorChips = document.querySelectorAll('.advisor-chip');
  const recTitle = document.getElementById('recTitle');
  const recDesc = document.getElementById('recDesc');
  const recPrice = document.getElementById('recPrice');
  const recBtn = document.getElementById('recBtn');

  advisorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      advisorChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const goal = chip.getAttribute('data-goal');
      const data = recommendations[goal];

      if (data && recTitle) {
        recTitle.textContent = data.title;
        recDesc.textContent = data.desc;
        recPrice.textContent = data.price;
        recBtn.setAttribute('data-service', data.service);
      }
    });
  });

  /* ==========================================================================
     8. SLIDER INTERACTIVO ANTES / DESPUÉS
     ========================================================================== */
  const compRange = document.getElementById('compRange');
  const compBefore = document.getElementById('compBefore');
  const compHandle = document.getElementById('compHandle');

  if (compRange && compBefore && compHandle) {
    compRange.addEventListener('input', (e) => {
      const val = e.target.value;
      compBefore.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
      compHandle.style.left = `${val}%`;
    });
  }

  /* ==========================================================================
     9. ACORDEÓN DE POLÍTICAS DE RESERVA
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;

      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          if (otherHeader.nextElementSibling) {
            otherHeader.nextElementSibling.classList.remove('open');
          }
        }
      });

      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        content.classList.remove('open');
      } else {
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('open');
      }
    });
  });

  /* ==========================================================================
     10. TABS DE CUIDADOS POSTERIORES
     ========================================================================== */
  const aftercareTabs = document.querySelectorAll('.aftercare-tab-btn');
  const aftercarePanels = document.querySelectorAll('.aftercare-panel');

  aftercareTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      aftercareTabs.forEach(t => t.classList.remove('active'));
      aftercarePanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     11. MODAL DINÁMICO, CÁLCULO DE SALDO & GENERADOR WHATSAPP
     ========================================================================== */
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const bookingForm = document.getElementById('bookingForm');
  const clientNameInput = document.getElementById('clientName');
  const serviceSelect = document.getElementById('serviceSelect');
  const scheduleInput = document.getElementById('scheduleInput');
  const remainingBalanceEl = document.getElementById('remainingBalance');
  const balanceRow = document.getElementById('balanceRow');
  const timeChips = document.querySelectorAll('.time-chip');

  const updateBalanceSummary = () => {
    if (!serviceSelect || !remainingBalanceEl) return;
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const price = parseInt(selectedOption.getAttribute('data-price') || '0', 10);

    if (price > DEPOSIT_AMOUNT) {
      const remaining = price - DEPOSIT_AMOUNT;
      remainingBalanceEl.textContent = `$${remaining.toLocaleString('es-CL')}`;
      balanceRow.style.display = 'flex';
    } else {
      balanceRow.style.display = 'none';
    }
  };

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateBalanceSummary);
  }

  timeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      timeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (scheduleInput) {
        scheduleInput.value = chip.getAttribute('data-time');
      }
    });
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal]');
    if (!trigger) return;

    e.preventDefault();
    const serviceName = trigger.getAttribute('data-service');

    if (serviceName && serviceSelect) {
      let optionFound = false;
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value === serviceName) {
          serviceSelect.selectedIndex = i;
          optionFound = true;
          break;
        }
      }
      if (!optionFound) {
        serviceSelect.value = 'Consulta General';
      }
      updateBalanceSummary();
    }

    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    if (clientNameInput) clientNameInput.focus();
  });

  const closeModal = () => {
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeModal();
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = clientNameInput ? clientNameInput.value.trim() : '';
      const selectedService = serviceSelect.value;
      const preferredSchedule = scheduleInput.value.trim() || 'Día y horario a convenir';

      const greeting = clientName ? `¡Hola! Soy ${clientName} y quiero agendar una cita.` : `¡Hola! Quiero agendar una cita.`;
      const rawMessage = `${greeting} Me interesa el servicio de: ${selectedService} para el día/horario: ${preferredSchedule}. ¿Qué disponibilidad tienes?`;

      const encodedMessage = encodeURIComponent(rawMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      closeModal();
      bookingForm.reset();
      timeChips.forEach(c => c.classList.remove('active'));
    });
  }

  /* ==========================================================================
     12. BOTÓN VOLVER ARRIBA
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});