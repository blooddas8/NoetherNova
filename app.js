/* app.js — Noether Nova | Mentoría Académica */

// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  hamburger.children[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.children[1].style.opacity   = open ? '0' : '1';
  hamburger.children[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.children[0].style.transform = '';
  hamburger.children[1].style.opacity   = '1';
  hamburger.children[2].style.transform = '';
}));

// ── Intersection Observer (fade-up)
let delayIndex = 0;
let delayTimer;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.style.transitionDelay = `${delayIndex * 100}ms`;
      e.target.classList.add('visible'); 
      observer.unobserve(e.target); 
      
      delayIndex++;
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => { delayIndex = 0; }, 150);
    } 
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

// ── Premium 3D Tilt Effect
document.querySelectorAll('.dif-card, .step-card, .bloque-card, .inst-img-wrapper').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.transition = 'none';
    card.style.zIndex = '10';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.zIndex = '1';
    
    setTimeout(() => { card.style.transition = ''; }, 600);
  });
});

// ── Magnetic Buttons
document.querySelectorAll('.btn-primary, .btn-ghost, .btn-wa').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── WhatsApp form
const form = document.getElementById('reservarForm');
if (form) {
  const dateInput = document.getElementById('fecha');
  dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre   = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const nivel    = document.getElementById('nivel').value;
    const servicio = document.getElementById('servicio').value;
    const fecha    = document.getElementById('fecha').value;
    const hora     = document.getElementById('hora').value;
    if (!nombre || !telefono || !nivel || !servicio || !fecha || !hora) return;

    const fechaFmt = new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const msg = encodeURIComponent(
      `¡Hola Noether Nova! 🎓\n\n` +
      `Quiero agendar mi sesión de diagnóstico GRATIS:\n\n` +
      `👤 Nombre: ${nombre}\n` +
      `📚 Nivel: ${nivel}\n` +
      `🔬 Área: ${servicio}\n` +
      `📅 Fecha: ${fechaFmt}\n` +
      `🕐 Hora: ${hora}\n\n` +
      `¡Espero su confirmación! 😊`
    );
    window.open(`https://wa.me/525598765432?text=${msg}`, '_blank');
  });
}

// ── Animated stat counters
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateStat(e.target); statObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.stat strong').forEach(s => statObs.observe(s));

function animateStat(el) {
  const text = el.textContent;
  const num  = parseFloat(text.replace(/[^\d.]/g, ''));
  if (isNaN(num)) return;
  const prefix = text.match(/^[^\d]*/)?.[0] || '';
  const suffix = text.slice((prefix + String(num)).length);
  const isFloat = text.includes('.');
  const duration = 1400;
  const startTime = performance.now();
  const step = now => {
    const p = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + (isFloat ? (ease * num).toFixed(1) : Math.floor(ease * num).toLocaleString('es-MX')) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── Starry Background Canvas
const canvas = document.getElementById('starsCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  function initStars() {
    stars = [];
    const numStars = Math.floor((width * height) / 3000); // Density of stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random(),
        fadeDir: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw subtle nebula clouds
    const gradient = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.6);
    gradient.addColorStop(0, 'rgba(42, 68, 148, 0.05)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      // Update opacity for twinkling effect
      star.opacity += 0.01 * star.fadeDir;
      if (star.opacity <= 0.1) {
        star.opacity = 0.1;
        star.fadeDir = 1;
      } else if (star.opacity >= 1) {
        star.opacity = 1;
        star.fadeDir = -1;
      }

      // Move star upwards slowly
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.globalAlpha = star.opacity;
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => {
    resize();
    initStars();
  });

  resize();
  initStars();
  drawStars();
}

// ── Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`panel-${tabId}`).classList.add('active');
  });
});
