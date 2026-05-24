/* ============================================================
   main.js – Funcionalidad compartida entre todas las páginas
   Incluye: dark mode, scroll reveal, smooth scroll,
            navbar effect, contadores animados, lightbox
   ============================================================ */

/* ── 1. Dark Mode ─────────────────────────────────────────── */
(function initDarkMode() {
  const root   = document.documentElement;
  const toggle = document.getElementById('darkModeToggle');
  const icon   = toggle ? toggle.querySelector('i') : null;

  // Aplicar preferencia guardada; si no hay, usar light por defecto
  const saved  = localStorage.getItem('at-theme');
  const theme  = saved || 'light';

  root.setAttribute('data-theme', theme);
  if (icon) setIcon(icon, theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('at-theme', next);
      if (icon) setIcon(icon, next);
    });
  }

  function setIcon(el, theme) {
    el.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
})();


/* ── 2. Scroll Reveal (Intersection Observer) ─────────────── */
(function initScrollReveal() {
  // Marcar elementos con .reveal como animables solo cuando JS está activo
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('reveal-ready');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal-ready').forEach(el => observer.observe(el));
})();


/* ── 3. Smooth Scroll para anclas internas ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id     = this.getAttribute('href');
    const target = id === '#' ? null : document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── 4. Navbar: sombra al hacer scroll ────────────────────── */
(function initNavbarEffect() {
  const navbar = document.querySelector('.at-navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('shadow-sm', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ── 5. Contadores Animados ────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target || '0');
    const suffix   = el.dataset.suffix  || '';
    const prefix   = el.dataset.prefix  || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600; // ms

    const startTime = performance.now();

    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing easeOutQuart para desaceleración suave
      const eased    = 1 - Math.pow(1 - progress, 4);
      const value    = eased * target;

      el.textContent = prefix + value.toFixed(decimals) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
})();


/* ── 6. Lightbox (galería de proyecto-detalle) ────────────── */
(function initLightbox() {
  const images = document.querySelectorAll('.gallery-lightbox');
  if (!images.length) return;

  // Crear el modal dinámicamente
  const modalEl = document.createElement('div');
  modalEl.innerHTML = `
    <div class="modal fade" id="lightboxModal" tabindex="-1" aria-label="Vista ampliada">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content border-0" style="background: rgba(0,0,0,0.92);">
          <div class="modal-body p-3 text-center position-relative">
            <button
              type="button"
              class="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
            <img
              id="lightboxImg"
              src=""
              alt=""
              class="img-fluid rounded"
              style="max-height: 82vh; object-fit: contain;"
            />
            <p
              id="lightboxCaption"
              class="mt-2 mb-0 small"
              style="color: rgba(255,255,255,0.6);"
            ></p>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);

  const bsModal   = new bootstrap.Modal(document.getElementById('lightboxModal'));
  const lbImg     = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      lbImg.src           = img.src;
      lbImg.alt           = img.alt;
      lbCaption.textContent = img.alt || `Imagen ${index + 1}`;
      bsModal.show();
    });
  });
})();
