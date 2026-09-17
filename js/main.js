/**
 * ============================================================================
 * PORTFOLIO CLIENT ENGINE
 * Ultra-modern interactive features: Canvas particle mesh, 3D tilt,
 * spotlight glow, scroll reveals, clipboard copy, and AJAX form handler.
 * Author: Pikki Solomon | Principal Frontend Architecture
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicYear();
  initHeroEntrance();
  initCanvasBackground();
  initNavbar();
  initScrollProgress();
  initAmbientCursorGlow();
  initParallaxGlows();
  initTypewriterRole();
  initHoverScramble();
  initBookPageScroll();
  initScrollReveal();
  initTitleGlow();
  initSkillPillCascade();
  initUniversalSpotlight();
  initProjectCard3D();
  initMagneticElements();
  initCounterAnimation();
  initContactForm();
  initClipboardCopy();
  initBackToTop();
  initResumeModal();
});

/**
 * Dynamic Copyright Year
 */
function initDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Cinematic Staggered Entrance Animation on Page Load
 */
function initHeroEntrance() {
  const navbar = document.querySelector('.navbar');
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  const statsGrid = document.querySelector('.stats-grid');

  if (navbar) navbar.classList.add('hero-entrance-navbar');
  if (heroLeft) heroLeft.classList.add('hero-entrance-text');
  if (heroRight) heroRight.classList.add('hero-entrance-card');
  if (statsGrid) statsGrid.classList.add('hero-entrance-stats');
}

/**
 * Parallax Floating for Ambient Glow Orbs on Scroll
 */
function initParallaxGlows() {
  const glows = document.querySelectorAll('.ambient-glow-1, .ambient-glow-2, .ambient-glow-3');
  if (!glows.length || window.matchMedia('(pointer: coarse)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        glows.forEach((glow, i) => {
          const speed = 0.15 + i * 0.08;
          glow.style.transform = `translate(${i === 2 ? '-50%, -50%' : '0, 0'}) translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Section Title Glow Effect When Centered in Viewport
 */
function initTitleGlow() {
  const titles = document.querySelectorAll('.section-title');
  if (!titles.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view-glow');
        } else {
          entry.target.classList.remove('in-view-glow');
        }
      });
    },
    { threshold: 0.5, rootMargin: '-10% 0px -30% 0px' }
  );

  titles.forEach((t) => observer.observe(t));
}

/**
 * Staggered Cascade Animation for Skill Category Pills
 */
function initSkillPillCascade() {
  const categories = document.querySelectorAll('.skill-cat-card');
  if (!categories.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pills = entry.target.querySelectorAll('.skill-pill');
          pills.forEach((pill, index) => {
            pill.style.animationDelay = `${index * 60}ms`;
          });
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Initially hide pills until cascade triggers
  categories.forEach((cat) => {
    const pills = cat.querySelectorAll('.skill-pill');
    pills.forEach((pill) => {
      pill.style.opacity = '0';
    });
    observer.observe(cat);
  });
}

/**
 * Luminous Top Scroll Progress Bar
 */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  const updateProgress = () => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const pct = (window.scrollY / total) * 100;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Smooth Atmospheric Ambient Cursor Spotlight Aura
 */
function initAmbientCursorGlow() {
  const glow = document.getElementById('cursor-ambient-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      glow.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    isVisible = false;
  });

  function followCursor() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(followCursor);
  }
  requestAnimationFrame(followCursor);
}

/**
 * Dynamic Role Cycler with Cyber-Decoder Scramble Transition
 */
function initTypewriterRole() {
  const el = document.getElementById('typewriter-role');
  if (!el) return;

  let roles = [];
  try {
    roles = JSON.parse(el.getAttribute('data-roles') || '[]');
  } catch (e) {
    roles = [el.textContent.trim()];
  }
  if (!roles.length) return;

  let roleIndex = 0;
  let isTransitioning = false;
  const chars = '!<>-_\\/[]{}—=+*^?#_0101';

  function scrambleTo(newRole) {
    if (isTransitioning) return;
    isTransitioning = true;
    let iteration = 0;

    const interval = setInterval(() => {
      el.textContent = newRole
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration += 1 / 2;

      if (iteration >= newRole.length) {
        clearInterval(interval);
        el.textContent = newRole;
        isTransitioning = false;
      }
    }, 28);
  }

  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    scrambleTo(roles[roleIndex]);
  }, 3800);
}

/**
 * Hover Scramble — Disabled (replaced with smoother text glow effect)
 */
function initHoverScramble() {
  // Removed: scramble effect harmed text legibility on hover
}

/**
 * High-Performance Cosmic Neural Particle Canvas
 */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let animationFrameId;
  let particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const maxDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 160
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  });

  // Cosmic Click Fireworks: Spawns glowing sparks
  let sparks = [];
  window.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, textarea, .resume-modal-container')) return;
    const sparkColors = ['#22d3ee', '#818cf8', '#c084fc', '#f43f5e', '#34d399', '#f59e0b'];
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.8 + 1.2;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.035 + 0.02,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        radius: Math.random() * 2.2 + 1
      });
    }
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 0.8;
      // Palette: Cyan, Violet, Slate
      const colors = ['#06b6d4', '#8b5cf6', '#38bdf8', '#c084fc', '#64748b'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.baseAlpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0) this.x = width;
      else if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      else if (this.y > height) this.y = 0;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.baseAlpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const lineAlpha = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#8b5cf6';
          ctx.globalAlpha = lineAlpha;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw radiant laser filaments to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dmx = particles[i].x - mouse.x;
        const dmy = particles[i].y - mouse.y;
        const mouseDist = Math.hypot(dmx, dmy);
        if (mouseDist < 130) {
          const mAlpha = (1 - mouseDist / 130) * 0.38;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#22d3ee';
          ctx.globalAlpha = mAlpha;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // Update and draw click spark bursts
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.04;
      s.life -= s.decay;
      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, Math.max(0.5, s.radius * s.life), 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.max(0, s.life);
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Optimize performance: pause canvas loop when document is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });

  createParticles();
  render();
}

/**
 * Navbar Scroll Behavior & Mobile Drawer
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky blur on scroll
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    },
    { passive: true }
  );

  // Mobile menu toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggleBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu on link click
    links.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Active section spy via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach((l) => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${id}`) {
            l.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));
}

/**
 * High-Performance Scroll Reveal Engine (IntersectionObserver)
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target); // Trigger once
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/**
 * 3D Perspective Tilt & Cursor Spotlight Glow for Project Cards
 */
function initProjectCard3D() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial spotlight gradient
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none'; // Instant responsive tracking
    });
  });
}

/**
 * Universal Card Spotlight Glow Coordinates for All Glass Surfaces
 */
function initUniversalSpotlight() {
  const cards = document.querySelectorAll('.glass-card, .project-card, .hero-profile-card, .stat-item, .skill-cat-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Tactile Magnetic Pull on Buttons & Social Chips
 */
function initMagneticElements() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const elements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline-cyan, .social-chip, .back-to-top-btn, .project-btn');

  elements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.025)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px) scale(1)';
      el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });
}

/**
 * Animated Counter Engine for Numeric Stats
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          let current = 0;
          const duration = 1200;
          const intervalTime = 25;
          const steps = duration / intervalTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current);
            }
          }, intervalTime);

          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.25 }
  );

  counters.forEach((c) => observer.observe(c));
}

/**
 * Formspree Contact Form AJAX Handler with Micro-Interactions
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('formFeedback');
  if (!form || !toast) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();
    const submitBtn = form.querySelector('.btn-send');

    // Validation
    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        showToast('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        showToast(
          errorData.error || 'Oops! Something went wrong. Please try emailing directly.',
          'error'
        );
      }
    } catch (err) {
      showToast('Network error. Please check your connection or email me directly.', 'error');
    } finally {
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
    }
  });

  function showToast(msg, type) {
    toast.textContent = '';
    const icon = document.createElement('i');
    icon.className =
      type === 'success'
        ? 'fa-solid fa-circle-check'
        : 'fa-solid fa-triangle-exclamation';

    const textSpan = document.createElement('span');
    textSpan.textContent = msg;

    toast.appendChild(icon);
    toast.appendChild(textSpan);
    toast.className = `feedback-toast ${type}`;
    toast.style.display = 'flex';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 6000);
  }
}

/**
 * 1-Click Clipboard Copy for Quick Connect Channels
 */
function initClipboardCopy() {
  const copyItems = document.querySelectorAll('.copyable-channel');

  copyItems.forEach((item) => {
    item.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = item.getAttribute('data-copy');
      const hint = item.querySelector('.channel-copy-hint');

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        if (hint) {
          const originalHint = hint.innerHTML;
          hint.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981"></i> Copied!';
          setTimeout(() => {
            hint.innerHTML = originalHint;
          }, 2500);
        }
      } catch (err) {
        // Fallback or silently fail
        window.location.href = item.getAttribute('href');
      }
    });
  });
}

/**
 * Smooth Back-To-Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 3D Book Page Turning Scroll Engine
 * Fades in and lifts sections as user scrolls through.
 */
function initBookPageScroll() {
  const pages = document.querySelectorAll('.book-page');
  if (!pages.length) return;

  // Immediately show the hero section
  if (pages[0]) {
    pages[0].classList.add('page-turned');
  }

  const pageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('page-turned');
        }
      });
    },
    {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px -80px 0px'
    }
  );

  pages.forEach((page, index) => {
    if (index > 0) pageObserver.observe(page);
  });
}

/**
 * Interactive Resume Preview Modal
 */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('closeResumeModal');
  const iframe = document.getElementById('resumeIframe');

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    if (iframe && !iframe.getAttribute('src')) {
      iframe.setAttribute('src', 'resume.pdf');
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
