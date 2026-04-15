// ==========================================================================
// SKILLZ APP - VERSÃO ESTÁVEL & TESTADA
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Skillz App Iniciado!');
  
  // Loading Screen
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      document.body.style.overflow = 'auto';
      console.log('✅ Loading removido');
    }
  }, 2500); // 2.5s fixo

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Reveal Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  setInterval(() => {
    showSlide((currentSlide + 1) % slides.length);
  }, 4000);

  // Stats Counter
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 50;
        
        const update = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(update);
          } else {
            counter.textContent = target + '+';
          }
        };
        update();
      }
    });
  });

  document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
    statsObserver.observe(stat);
  });

// SOBRE MAIS PARA CIMA - AJUSTE FINAL
function smoothScrollPerfect() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = 80;
        const viewportHeight = window.innerHeight;
        let contentOffset = 250; // BASE
        
        // ESPECÍFICOS:
        if (targetId === '#inicio') {
          contentOffset = 200;      // Hero
        } 
        else if (targetId === '#sobre') {
          contentOffset = 260;      // SOBRE: AINDA MAIS PARA CIMA (320→260)
        }
        else if (targetId === '#servicos' || targetId === '#alunos') {
          contentOffset = 160;      // Serviços/Alunos: Bem em cima
        }
        else if (targetId === '#contato') {
          contentOffset = 220;      // Contato: Pouco para cima
        }
        
        const targetPosition = targetSection.offsetTop + contentOffset - (viewportHeight * 0.12) - headerHeight;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
        
        // Resto do código igual...
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav');
        if (hamburger && nav) {
          hamburger.classList.remove('active');
          nav.classList.remove('mobile-active');
        }
      }
    });
  });
}

// Chama a função
smoothScrollPerfect();

  // Nav Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav?.classList.toggle('mobile-active');
  });

  // Logo Click
  document.getElementById('logo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.log('✅ Skillz App Carregado com Sucesso!');
});
