/**
 * MIRABILIA — Arquitectura de la Mirada
 * Frontend Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CONFIGURACIÓN DEL NEGOCIO
     ========================================================================== */
  // Reemplazar con el número de teléfono oficial (formato internacional sin signos)
  // Ejemplo Chile: 56912345678
  const WHATSAPP_PHONE = '56912345678'; 

  /* ==========================================================================
     2. MENÚ RESPONSIVO (MOBILE DRAWER)
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     3. FILTRADO POR PESTAÑAS (CATEGORÍAS DE SERVICIOS)
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Estado de botones
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const category = button.getAttribute('data-category');

      // Animación y filtrado de tarjetas
      serviceCards.forEach(card => {
        if (card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Inicializar mostrando la categoría 'pestanas'
  const initialCategory = 'pestanas';
  serviceCards.forEach(card => {
    if (card.getAttribute('data-category') !== initialCategory) {
      card.style.display = 'none';
    }
  });

  /* ==========================================================================
     4. ACORDEÓN DE POLÍTICAS DE RESERVA
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;

      // Colapsar los demás acordeones para un look limpio y ordenado
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          if (otherHeader.nextElementSibling) {
            otherHeader.nextElementSibling.classList.remove('open');
          }
        }
      });

      // Alternar el actual
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
     5. TABS DE CUIDADOS POSTERIORES
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
     6. MODAL DINÁMICO & GENERADOR DE URL WHATSAPP
     ========================================================================== */
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('serviceSelect');
  const scheduleInput = document.getElementById('scheduleInput');
  const openModalButtons = document.querySelectorAll('[data-open-modal]');

  // Abrir modal y preseleccionar servicio correspondiente
  openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = button.getAttribute('data-service');

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
      }

      bookingModal.classList.add('active');
      bookingModal.setAttribute('aria-hidden', 'false');
      if (scheduleInput) scheduleInput.focus();
    });
  });

  // Cerrar modal
  const closeModal = () => {
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Cerrar con click fuera del contenedor
  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal();
    }
  });

  // Procesar envío del formulario para WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedService = serviceSelect.value;
      const preferredSchedule = scheduleInput.value.trim() || 'Día y horario a convenir';

      // Estructura requerida:
      // "¡Hola! Quiero agendar una cita. Me interesa el servicio de: [Nombre del Servicio] para el día/horario: [Día y hora de preferencia]. ¿Qué disponibilidad tienes?"
      const rawMessage = `¡Hola! Quiero agendar una cita. Me interesa el servicio de: ${selectedService} para el día/horario: ${preferredSchedule}. ¿Qué disponibilidad tienes?`;

      // Codificación segura para URL
      const encodedMessage = encodeURIComponent(rawMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      // Redirigir a WhatsApp en pestaña nueva
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Cerrar y resetear modal
      closeModal();
      scheduleInput.value = '';
    });
  }

  /* ==========================================================================
     7. BOTÓN VOLVER ARRIBA
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});