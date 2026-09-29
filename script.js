/* ==========================================
   PORTFOLIO JAVASCRIPT — Nishanth S Naik
========================================== */

// ---- Typewriter Effect ----
const phrases = [
  'Full-Stack Developer',
  'MERN Specialist',
  'UI/UX Enthusiast',
  'AI/ML Developer',
  'Problem Solver'
];

let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWrite() {
  if (!typewriterEl) return;
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typewriterEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
  } else {
    typewriterEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIdx === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeWrite, delay);
}
setTimeout(typeWrite, 800);


// ---- Navbar scroll behavior ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Add scrolled class
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight
  let current = 'home';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


// ---- Hamburger / Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

// Close menu on link click
navLinksMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});


// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


// ---- Scroll Indicator click ----
const scrollIndicator = document.getElementById('scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
}


// ---- Smooth scroll for all # links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ---- Contact Form ----
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
const btnSendText = document.getElementById('btn-send-text');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      formNote.textContent = '⚠️ Please fill in all fields.';
      formNote.className = 'form-note error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.textContent = '⚠️ Please enter a valid email address.';
      formNote.className = 'form-note error';
      return;
    }

    // Simulate sending (would be a real API call in production)
    btnSendText.textContent = 'Sending…';
    formNote.textContent = '';

    setTimeout(() => {
      btnSendText.textContent = 'Send Message';
      form.reset();
      formNote.textContent = '✅ Message sent! I\'ll get back to you soon.';
      formNote.className = 'form-note success';
      setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 5000);
    }, 1200);
  });
}


// ---- Particle / Sparkle effect on hero ----
(function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  function makeParticle() {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 6;

    Object.assign(p.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      background: `hsl(${Math.random() > 0.5 ? 270 : 190}, 80%, 70%)`,
      borderRadius: '50%',
      left: x + '%',
      bottom: '-10px',
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      animation: `particleRise ${duration}s ${delay}s ease-in infinite`
    });
    hero.appendChild(p);
  }

  // Add particle keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleRise {
      0%   { transform: translateY(0) scale(0); opacity: 0; }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.2; }
      100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < 22; i++) makeParticle();
})();


// ---- Skill tags hover glow ----
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.boxShadow = '0 0 14px rgba(139,92,246,0.3)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.boxShadow = '';
  });
});


// ---- Number counter animation for stats ----
function animateCounter(el, target, decimals = 0, suffix = '') {
  const start = 0;
  const duration = 1500;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * ease;
    el.textContent = decimals > 0
      ? current.toFixed(decimals) + suffix
      : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(el => {
        const raw = el.textContent.trim();
        if (raw === '9.12') animateCounter(el, 9.12, 2);
        else if (raw === '2+') { animateCounter(el, 2, 0, '+'); }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


// ---- Add subtle parallax to orbs ----
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
  if (orb2) orb2.style.transform = `translate(${-x}px, ${-y}px)`;
}, { passive: true });
