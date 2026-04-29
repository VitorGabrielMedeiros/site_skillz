document.addEventListener('DOMContentLoaded', function () {
  console.log('✅ Skillz App Iniciado!');

  /* =========================
     1. LOADING SCREEN
  ========================= */
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }, 2500);

  /* =========================
     2. SMOOTH SCROLL + MENU
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // ativa link
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      this.classList.add('active');

      // fecha menu mobile
      hamburger?.classList.remove('active');
      nav?.classList.remove('mobile-active');
    });
  });

  /* =========================
     3. REVEAL ANIMATIONS
  ========================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* =========================
     4. SLIDER GENÉRICO
  ========================= */
  function initSlider(containerSelector, autoPlay = true) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const slides = container.querySelectorAll('.slide');
    const dots = container.closest('.slider-container')?.querySelectorAll('.slider-dot') || [];

    let current = 0;
    let interval;

    function show(index) {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(interval);
        show(i);
        if (autoPlay) start();
      });
    });

    function start() {
      interval = setInterval(() => {
        show((current + 1) % slides.length);
      }, 4000);
    }

    show(0);
    if (autoPlay) start();
  }

  initSlider('.sobre .slider');

  /* =========================
     5. SERVIÇOS (CARDS CONTROLAM)
  ========================= */
  const servicosSlides = document.querySelectorAll('#servicos-slider .slide');

  document.querySelectorAll('.aba-card').forEach((card, index) => {
    card.addEventListener('click', () => {

      // ativa card
      document.querySelectorAll('.aba-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // mostra slide correto
      servicosSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

    });
  });

  /* =========================
     6. SCROLL SPY (CORRIGIDO)
  ========================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    let current = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();

      if (
        rect.top <= window.innerHeight * 0.4 &&
        rect.bottom >= window.innerHeight * 0.4
      ) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);

  /* =========================
     7. MOBILE MENU
  ========================= */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('mobile-active');
    });
  }

  /* =========================
     8. LOGO CLICK
  ========================= */
  document.getElementById('logo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.log('🚀 Skillz App rodando liso!');
});
