/* ============================================
   SARATOGA SPRINGS FC — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initStickyHeader();
    initMobileMenu();
    initScrollAnimations();
    initStatCounters();
    initSmoothScroll();
    initGalleryFilters();
    initFAQ();
    initFormValidation();
  }

  // ---------- Sticky Header ----------
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const threshold = 50;

    function handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load for inner pages
  }

  // ---------- Mobile Menu ----------
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.mobile-overlay');
    if (!toggle || !nav) return;

    function openMenu() {
      toggle.classList.add('active');
      nav.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking nav links
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ---------- Scroll Animations ----------
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
    );

    if (!animatedElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything
      animatedElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // ---------- Animated Stat Counters ----------
  function initStatCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach(function (counter) {
        observer.observe(counter);
      });
    } else {
      counters.forEach(animateCounter);
    }
  }

  // ---------- Smooth Scroll ----------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- Gallery Filtering ----------
  function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-full-grid .gallery-item');

    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active button
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            item.style.animation = 'none';
            item.offsetHeight; // trigger reflow
            item.style.animation = '';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // ---------- FAQ Accordion ----------
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(function (faq) {
          faq.classList.remove('open');
          var ans = faq.querySelector('.faq-answer');
          if (ans) ans.style.maxHeight = null;
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // ---------- Form Validation ----------
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        form.querySelectorAll('.form-group').forEach(function (group) {
          group.classList.remove('error');
        });

        // Validate required fields
        form.querySelectorAll('[required]').forEach(function (field) {
          const group = field.closest('.form-group');
          if (!field.value.trim()) {
            if (group) group.classList.add('error');
            isValid = false;
          }
        });

        // Validate email
        form.querySelectorAll('[type="email"]').forEach(function (field) {
          const group = field.closest('.form-group');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (field.value && !emailRegex.test(field.value)) {
            if (group) group.classList.add('error');
            isValid = false;
          }
        });

        // Validate phone
        form.querySelectorAll('[type="tel"]').forEach(function (field) {
          const group = field.closest('.form-group');
          const phoneRegex = /^[\d\s\-\(\)\+]{7,}$/;
          if (field.value && !phoneRegex.test(field.value)) {
            if (group) group.classList.add('error');
            isValid = false;
          }
        });

        if (isValid) {
          // Show success message
          const successMsg = form.querySelector('.form-success');
          if (successMsg) {
            successMsg.classList.add('show');
            form.reset();
            setTimeout(function () {
              successMsg.classList.remove('show');
            }, 5000);
          }
        } else {
          // Scroll to first error
          const firstError = form.querySelector('.form-group.error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  }
})();
