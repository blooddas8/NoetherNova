/* app.js — Noether Nova | Mentoría Académica */

// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  hamburger.children[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.children[1].style.opacity = open ? '0' : '1';
  hamburger.children[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.children[0].style.transform = '';
  hamburger.children[1].style.opacity = '1';
  hamburger.children[2].style.transform = '';
}));

// ── Intersection Observer (fade-up)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

// ── WhatsApp form
const form = document.getElementById('reservarForm');
if (form) {
  const dateInput = document.getElementById('fecha');
  dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const nivel = document.getElementById('nivel').value;
    const servicio = document.getElementById('servicio').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
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
  const num = parseFloat(text.replace(/[^\d.]/g, ''));
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
  let bgGradient;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    bgGradient = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.6);
    bgGradient.addColorStop(0, 'rgba(42, 68, 148, 0.05)');
    bgGradient.addColorStop(1, 'transparent');
  }

  function initStars() {
    stars = [];
    const numStars = Math.min(Math.floor((width * height) / 3000), 200); // Limit stars on mobile
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

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      star.opacity += 0.01 * star.fadeDir;
      if (star.opacity <= 0.1) {
        star.opacity = 0.1;
        star.fadeDir = 1;
      } else if (star.opacity >= 1) {
        star.opacity = 1;
        star.fadeDir = -1;
      }

      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }

      ctx.globalAlpha = star.opacity;
      ctx.fillRect(star.x, star.y, Math.max(1, star.size), Math.max(1, star.size));
    });
    ctx.globalAlpha = 1;

    requestAnimationFrame(drawStars);
  }

  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    // Avoid rebuilding canvas on mobile scroll (where only height changes due to URL bar)
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      resize();
      initStars();
    } else {
      height = canvas.height = window.innerHeight;
      bgGradient = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.6);
      bgGradient.addColorStop(0, 'rgba(42, 68, 148, 0.05)');
      bgGradient.addColorStop(1, 'transparent');
    }
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



//---------------------------------------//
// CARRUSEL IMÁGENES
//---------------------------------------//

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");


let currentIndex = 0;
const totalSlides = slides.length;


function showSlide(index) {

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });


  slides[index].classList.add("active");
  dots[index].classList.add("active");

}



function nextSlide() {

  currentIndex++;

  if (currentIndex >= totalSlides) {

    currentIndex = 0;

  }

  showSlide(currentIndex);

}



function prevSlide() {

  currentIndex--;

  if (currentIndex < 0) {

    currentIndex = totalSlides - 1;

  }

  showSlide(currentIndex);

}


// BOTONES

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);


// PUNTITOS

dots.forEach((dot, index) => {

  dot.addEventListener("click", () => {

    currentIndex = index;

    showSlide(currentIndex);

  });

});


// AUTOPLAY

setInterval(() => {

  nextSlide();

}, 4000);
