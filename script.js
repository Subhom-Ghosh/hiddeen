
  // ═══════════════════════════════════════════
  //  NAVBAR — Scroll Effect, Scroll Spy, Mobile Menu
  // ═══════════════════════════════════════════

  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navLinksContainer = document.getElementById('navLinks');
  const hamburger = document.getElementById('navHamburger');
  const sections = document.querySelectorAll('section[id]');

  // Scroll → floating pill + active section tracking
  window.addEventListener('scroll', () => {
    // Floating pill toggle
    navbar.classList.toggle('scrolled', window.scrollY > 80);

    // Scroll spy — highlight active section link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  // ═══════════════════════════════════════════
  //  CUISINE MARQUEE — Clone cards for infinite loop
  // ═══════════════════════════════════════════

  document.querySelectorAll('.marquee-track').forEach(track => {
    const cards = track.querySelectorAll('.cuisine-card');
    // Clone all cards and append for seamless loop
    cards.forEach(card => {
      track.appendChild(card.cloneNode(true));
    });
  });

  // ═══════════════════════════════════════════
  //  SCROLL FLOAT ANIMATION ENGINE
  // ═══════════════════════════════════════════

  // Assign directional float variants to cards automatically
  const floatVariants = ['float-left', 'float-right', 'float-scale', 'float-rotate'];
  const cardSelectors = [
    '.dest-card.reveal',
    '.spi-card.reveal',
    '.wildlife-card.reveal',
    '.gi-card.reveal',
    '.heritage-card.reveal'
  ];

  cardSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((card, i) => {
      // Assign a float variant based on position
      const variant = floatVariants[i % floatVariants.length];
      card.classList.add(variant);

      // Assign a random float-seed for desynchronized idle animation
      card.style.setProperty('--float-seed', (Math.random() * 3).toFixed(2));
    });
  });

  // Assign parallax depth classes for visual variety
  document.querySelectorAll('.reveal').forEach((el, i) => {
    if (i % 5 === 0) el.classList.add('parallax-slow');
    if (i % 7 === 0) el.classList.add('parallax-fast');
  });

  // Intersection Observer — reveal elements as they scroll into view
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // ═══════════════════════════════════════════
  //  SMOOTH PARALLAX OFFSET ON SCROLL
  // ═══════════════════════════════════════════

  // Subtle parallax — cards shift slightly based on scroll position
  let ticking = false;
  const parallaxCards = document.querySelectorAll(
    '.dest-card.reveal.visible, .cuisine-card.reveal.visible, ' +
    '.spi-card.reveal.visible, .wildlife-card.reveal.visible, ' +
    '.gi-card.reveal.visible'
  );

  function updateParallax() {
    const scrollY = window.scrollY;
    const visibleCards = document.querySelectorAll(
      '.dest-card.reveal.visible, .cuisine-card.reveal.visible, ' +
      '.spi-card.reveal.visible, .wildlife-card.reveal.visible, ' +
      '.gi-card.reveal.visible, .heritage-card.reveal.visible'
    );

    visibleCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Only apply parallax to cards currently in viewport
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const depth = ((i % 3) + 1) * 0.5; // 0.5, 1.0, or 1.5
        const offsetY = (progress - 0.5) * depth * -12;
        card.style.setProperty('--parallax-y', `${offsetY.toFixed(2)}px`);
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ═══════════════════════════════════════════
  //  SPIRITUAL TABS
  // ═══════════════════════════════════════════

  function showTab(name) {
    document.querySelectorAll('.spiritual-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.spi-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    event.currentTarget.classList.add('active');

    // Re-trigger reveal animations for newly visible cards
    const panel = document.getElementById('tab-' + name);
    panel.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      // Small delay to reset animation state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          revealObserver.observe(el);
        });
      });
    });
  }

