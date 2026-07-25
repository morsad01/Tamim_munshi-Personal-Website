/* ==========================================================================
   MOHAMMAD TAMIM MUNSHI MUBASHIR — INTERACTION ENGINE
   --------------------------------------------------------------------------
   Built with 100% Pure ES6+ Vanilla JavaScript.
   Features: Preloader, Theme Toggle, Typing Animation, Scrollspy, Modal Popups,
   Auto-playing Image Carousel (1.5s interval), Progress Bars & Stat Counters, Form Toast.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. PRELOADER & CURTAIN REVEAL
  // --------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');

  if (preloader && preloaderBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 10;
      if (progress >= 100) {
        progress = 100;
        preloaderBar.style.width = '100%';
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
        }, 300);
      } else {
        preloaderBar.style.width = progress + '%';
      }
    }, 60);
  }

  // --------------------------------------------------------------------------
  // 2. SCROLL PROGRESS BAR & NAVBAR SHRINK
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + '%';
    }

    if (navbar) {
      if (winScroll > 50) {
        navbar.classList.add('shrunk');
      } else {
        navbar.classList.remove('shrunk');
      }
    }

    if (backToTop) {
      if (winScroll > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 3. DARK / LIGHT MODE THEME SWITCHER
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlDoc = document.documentElement;

  const savedTheme = localStorage.getItem('tamim_theme') || 'light';
  htmlDoc.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlDoc.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlDoc.setAttribute('data-theme', newTheme);
      localStorage.setItem('tamim_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    if (theme === 'dark') {
      themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`;
      themeToggle.setAttribute('title', 'Switch to Light Mode');
      themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
      themeToggle.setAttribute('title', 'Switch to Dark Mode');
      themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. HERO TYPING ROTATOR (CYCLES 5 AI/ML ROLES)
  // --------------------------------------------------------------------------
  const typingText = document.getElementById('typingText');
  const roles = [
    'Software Engineering Student',
    'AI & Machine Learning Developer',
    'Healthcare AI Researcher',
    'Full-Stack Model Innovator',
    'Prompt & AI Systems Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 70;
  const deletingSpeed = 40;
  const delayBetweenRoles = 2000;

  function typeRole() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
    } else {
      setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
    }
  }

  setTimeout(typeRole, 800);

  // --------------------------------------------------------------------------
  // 6. HEALTHCARE AI DASHBOARD AUTO-PLAYING CAROUSEL (1.5s INTERVAL)
  // --------------------------------------------------------------------------
  const mockupCarouselTrack = document.getElementById('mockupCarouselTrack');
  const mockupDots = document.querySelectorAll('#mockupIndicators .mockup-dot');
  let currentSlide = 0;
  const totalSlides = 3;
  let carouselTimer = null;

  function goToSlide(index) {
    currentSlide = index;
    if (mockupCarouselTrack) {
      mockupCarouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    mockupDots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startCarousel() {
    stopCarousel();
    carouselTimer = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 1500); // Auto-slides every 1.5 seconds as requested
  }

  function stopCarousel() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

  mockupDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10);
      goToSlide(slideIndex);
      startCarousel(); // Reset timer on manual dot click
    });
  });

  if (mockupCarouselTrack) {
    mockupCarouselTrack.addEventListener('mouseenter', stopCarousel);
    mockupCarouselTrack.addEventListener('mouseleave', startCarousel);
    startCarousel();
  }

  // --------------------------------------------------------------------------
  // 7. CASE STUDY MODAL WINDOW POPUP
  // --------------------------------------------------------------------------
  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  const caseStudyData = {
    'modal-healthcare': `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: var(--primary); font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">
        <i class="fa-solid fa-code"></i> Core C Academic Project
      </div>
      <h2 style="font-size: 1.8rem; margin-bottom: 16px; color: var(--text);">Hospital Management System</h2>
      <p style="color: var(--gray); margin-bottom: 20px; line-height: 1.7;">
        A comprehensive medical software application built entirely in C programming to streamline hospital administration, patient record registration, doctor appointment bookings, and billing workflows using custom structs and binary file I/O.
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="glass-card" style="padding: 16px;">
          <h4 style="font-size: 0.9rem; margin-bottom: 4px; color: var(--primary);">Core Language</h4>
          <p style="font-size: 0.88rem; color: var(--gray);">Built 100% in C Programming Language with custom struct definitions.</p>
        </div>
        <div class="glass-card" style="padding: 16px;">
          <h4 style="font-size: 0.9rem; margin-bottom: 4px; color: var(--primary);">Data Persistence</h4>
          <p style="font-size: 0.88rem; color: var(--gray);">Structured file handling for permanent patient record storage.</p>
        </div>
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="https://github.com/" target="_blank" rel="noopener" class="btn btn-primary">
          <i class="fa-brands fa-github"></i> View GitHub Repository
        </a>
        <button class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('active')">
          Close Window
        </button>
      </div>
    `
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      if (caseStudyModal && modalBody && caseStudyData[modalKey]) {
        modalBody.innerHTML = caseStudyData[modalKey];
        caseStudyModal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (caseStudyModal) caseStudyModal.classList.remove('active');
    });
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        caseStudyModal.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. ANIMATED SKILL BARS & STAT COUNT-UP (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-fill');
  const counterNumbers = document.querySelectorAll('.achievement-number');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Fill skill bars inside this entry
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const progress = fill.getAttribute('data-progress');
          fill.style.width = progress + '%';
        });

        // Trigger stat counter numbers
        entry.target.querySelectorAll('.achievement-number').forEach(counter => {
          if (!counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounter(counter);
          }
        });
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      el.textContent = count + (target === 98 ? '%' : '+');
    }, 30);
  }

  // --------------------------------------------------------------------------
  // 9. TESTIMONIALS SLIDER CAROUSEL
  // --------------------------------------------------------------------------
  const testimonialTrack = document.getElementById('testimonialTrack');
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');
  let testimonialIndex = 0;

  if (testimonialTrack && prevSlide && nextSlide) {
    const slides = testimonialTrack.querySelectorAll('.testimonial-slide');
    const totalTestimonials = slides.length;

    nextSlide.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
      updateTestimonialSlide();
    });

    prevSlide.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
      updateTestimonialSlide();
    });

    function updateTestimonialSlide() {
      testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    }
  }

  // --------------------------------------------------------------------------
  // 10. CONTACT FORM VALIDATION & SUCCESS TOAST
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      document.querySelectorAll('.form-error').forEach(err => err.textContent = '');

      if (!nameInput || !nameInput.value.trim()) {
        showError('name', 'Please enter your full name');
        isValid = false;
      }

      if (!emailInput || !emailInput.value.trim() || !validateEmail(emailInput.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      }

      if (!messageInput || !messageInput.value.trim()) {
        showError('message', 'Please enter your message');
        isValid = false;
      }

      if (isValid) {
        contactForm.reset();
        if (formToast) {
          formToast.classList.add('active');
          setTimeout(() => {
            formToast.classList.remove('active');
          }, 4000);
        }
      }
    });
  }

  function showError(fieldName, msg) {
    const errSpan = document.querySelector(`[data-error-for="${fieldName}"]`);
    if (errSpan) errSpan.textContent = msg;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Dynamic Footer Current Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
