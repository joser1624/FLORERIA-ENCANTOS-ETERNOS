/* ================================================
   ENCANTOS ETERNOS – app3.js  ·  Estilo Andino
   Funcionalidades:
     · Filtro de productos por categoría
     · Animación de entrada de tarjetas
     · Botón volver arriba
     · Scroll suave
     · Validación newsletter
     · Feedback botón comprar
     · Contador de flores animado en hero stats
     · Efecto confetti en sección eventos
================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────
     1. FILTRO DE PRODUCTOS
  ───────────────────────────────────────────── */
  const filterBtns3 = document.querySelectorAll('.btn3-filter');
  const p3Cols      = document.querySelectorAll('.p3-col');
  const noRes3      = document.getElementById('noResults3');

  filterBtns3.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns3.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      p3Cols.forEach(col => {
        const cats = col.dataset.category || '';
        const show = filter === 'todos' || cats.includes(filter);

        if (show) {
          col.classList.remove('hidden');
          col.style.opacity = '0';
          col.style.transform = 'translateY(18px) scale(.97)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              col.style.opacity   = '1';
              col.style.transform = 'translateY(0) scale(1)';
            }, visible * 70);
          });
          visible++;
        } else {
          col.classList.add('hidden');
        }
      });

      if (noRes3) noRes3.classList.toggle('d-none', visible > 0);

      // Pequeña vibración del botón activo (playful)
      btn.style.transform = 'scale(1.08)';
      setTimeout(() => { btn.style.transform = ''; }, 200);
    });
  });


  /* ─────────────────────────────────────────────
     2. INTERSECTION OBSERVER – Entrada de cards
  ───────────────────────────────────────────── */
  const io3 = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, (i % 4) * 80);
        io3.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Cards de producto
  p3Cols.forEach(col => {
    col.style.opacity   = '0';
    col.style.transform = 'translateY(24px) scale(.97)';
    col.style.transition = 'opacity .5s ease, transform .5s ease';
    io3.observe(col);
  });

  // Cards de evento
  document.querySelectorAll('.ev3-card, .regalo3-feature, .regalo3-box').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    io3.observe(el);
  });

  // Servicios
  document.querySelectorAll('.svc3-card').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io3.observe(el);
  });


  /* ─────────────────────────────────────────────
     3. BOTÓN VOLVER ARRIBA
  ───────────────────────────────────────────── */
  const backTop3 = document.getElementById('backTop3');

  window.addEventListener('scroll', () => {
    if (backTop3) {
      backTop3.classList.toggle('visible', window.scrollY > 350);
    }
  }, { passive: true });

  backTop3?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ─────────────────────────────────────────────
     4. SCROLL SUAVE – ENLACES INTERNOS
  ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      // Cerrar navbar móvil
      const navEl = document.getElementById('navAndino');
      if (navEl?.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navEl)?.hide();
      }

      const hh  = document.querySelector('.site-header3')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - hh - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────────
     5. VALIDACIÓN NEWSLETTER
  ───────────────────────────────────────────── */
  const form3    = document.getElementById('newsletterForm3');
  const email3   = document.getElementById('email3');
  const error3   = document.getElementById('error3');
  const success3 = document.getElementById('success3');

  const isEmail3 = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  form3?.addEventListener('submit', e => {
    e.preventDefault();

    error3?.classList.add('d-none');
    success3?.classList.add('d-none');
    email3?.style.removeProperty('border-color');

    if (!isEmail3(email3?.value || '')) {
      error3?.classList.remove('d-none');
      if (email3) email3.style.borderColor = '#f5a090';
      email3?.focus();
      return;
    }

    success3?.classList.remove('d-none');
    if (email3) { email3.value = ''; email3.style.borderColor = 'var(--verde-lt)'; }

    // Confetti sutil
    spawnFlowers();

    setTimeout(() => {
      success3?.classList.add('d-none');
      email3?.style.removeProperty('border-color');
    }, 5000);
  });

  email3?.addEventListener('input', () => {
    if (isEmail3(email3.value)) {
      error3?.classList.add('d-none');
      email3.style.removeProperty('border-color');
    }
  });


  /* ─────────────────────────────────────────────
     6. BOTÓN COMPRAR – feedback cariñoso
  ───────────────────────────────────────────── */
  document.querySelectorAll('.btn3-comprar').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.disabled) return;
      const orig = this.textContent;
      this.textContent = '¡Agregado! 💛';
      this.style.background = 'var(--mostaza)';
      this.style.color = 'var(--marron)';
      this.disabled = true;

      setTimeout(() => {
        this.textContent = orig;
        this.style.background = '';
        this.style.color = '';
        this.disabled = false;
      }, 2000);
    });
  });


  /* ─────────────────────────────────────────────
     7. BOTONES EVENTO – feedback
  ───────────────────────────────────────────── */
  document.querySelectorAll('.btn3-evento').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Pequeño ripple visual
      this.style.transform = 'scale(.96) translateX(4px)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  });


  /* ─────────────────────────────────────────────
     8. FLORES FLOTANTES (micro-confetti)
     Se activa al suscribirse al newsletter
  ───────────────────────────────────────────── */
  function spawnFlowers () {
    const flowers = ['🌸','🌺','🌷','🌹','🌻','💐','🌼'];
    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div');
      el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      el.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -40px;
        font-size: ${16 + Math.random() * 20}px;
        pointer-events: none;
        z-index: 9000;
        animation: flowerFall ${1.5 + Math.random() * 2}s ease-in forwards;
        animation-delay: ${Math.random() * .8}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }
  }

  // Inyectar keyframe si no existe
  if (!document.querySelector('#flowerFallStyle')) {
    const style = document.createElement('style');
    style.id = 'flowerFallStyle';
    style.textContent = `
      @keyframes flowerFall {
        to {
          transform: translateY(110vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }


  /* ─────────────────────────────────────────────
     9. NAVBAR – Activo al scrollear
  ───────────────────────────────────────────── */
  const sections3 = document.querySelectorAll('section[id], footer[id]');
  const navLinks3 = document.querySelectorAll('.nav-link3');

  const highlightNav3 = () => {
    let current = '';
    sections3.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
    });
    navLinks3.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.style.color      = isActive ? 'var(--terracota)' : '';
      link.style.background = isActive ? 'var(--hueso-3)' : '';
    });
  };

  window.addEventListener('scroll', highlightNav3, { passive: true });


  /* ─────────────────────────────────────────────
     10. BOTÓN WAPP – Pequeña animación de pulso
  ───────────────────────────────────────────── */
  const wappBtn = document.querySelector('.btn3-wapp');
  if (wappBtn) {
    setInterval(() => {
      wappBtn.style.transform = 'translateY(-2px) scale(1.03)';
      setTimeout(() => { wappBtn.style.transform = ''; }, 400);
    }, 3000);
  }

});
