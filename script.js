// ═══ PARTICLE SYSTEM ═══
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: 0, y: 0 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '37, 99, 235' : '6, 182, 212';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    const dx = mouse.x - this.x, dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      this.x -= dx * 0.005;
      this.y -= dy * 0.005;
      this.opacity = Math.min(this.opacity + 0.02, 0.8);
    }
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ═══ NAVBAR SCROLL ═══
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ MOBILE MENU ═══
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ═══ SCROLL REVEAL ═══
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// ═══ IDE CODE TYPING ═══
const codeLines = [
  { text: '<span class="comment">// expon.config.ts | Sistema Operacional Inteligente</span>' },
  { text: '<span class="keyword">import</span> { <span class="type">ExponEngine</span>, <span class="type">AIAgent</span> } <span class="keyword">from</span> <span class="string">"@expon/core"</span>' },
  { text: '<span class="keyword">import</span> { <span class="type">WhatsApp</span>, <span class="type">Analytics</span>, <span class="type">CRM</span> } <span class="keyword">from</span> <span class="string">"@expon/integrations"</span>' },
  { text: '' },
  { text: '<span class="keyword">const</span> <span class="variable">client</span> = <span class="keyword">await</span> <span class="type">ExponEngine</span>.<span class="function">initialize</span>({' },
  { text: '  <span class="property">name</span>: <span class="string">"Seu Negócio"</span>,' },
  { text: '  <span class="property">segment</span>: <span class="string">"growth"</span>,' },
  { text: '  <span class="property">modules</span>: [<span class="type">WhatsApp</span>, <span class="type">Analytics</span>, <span class="type">CRM</span>],' },
  { text: '  <span class="property">ai</span>: {' },
  { text: '    <span class="property">contextual</span>: <span class="number">true</span>,' },
  { text: '    <span class="property">learningRate</span>: <span class="string">"continuous"</span>,' },
  { text: '    <span class="property">knowledgeBase</span>: <span class="string">"auto-generated"</span>' },
  { text: '  }' },
  { text: '})' },
  { text: '' },
  { text: '<span class="comment">// Automação de atendimento com IA contextualizada</span>' },
  { text: '<span class="keyword">const</span> <span class="variable">agent</span> = <span class="keyword">new</span> <span class="type">AIAgent</span>({' },
  { text: '  <span class="property">persona</span>: <span class="variable">client</span>.<span class="property">brand</span>.<span class="property">voice</span>,' },
  { text: '  <span class="property">knowledge</span>: <span class="variable">client</span>.<span class="property">context</span>.<span class="function">accumulated</span>(),' },
  { text: '  <span class="property">channels</span>: [<span class="string">"whatsapp"</span>, <span class="string">"instagram"</span>, <span class="string">"web"</span>]' },
  { text: '})' },
  { text: '' },
  { text: '<span class="comment">// Lead qualificado automaticamente → CRM → Follow-up</span>' },
  { text: '<span class="variable">agent</span>.<span class="function">on</span>(<span class="string">"lead.qualified"</span>, <span class="keyword">async</span> (<span class="variable">lead</span>) <span class="operator">=></span> {' },
  { text: '  <span class="keyword">await</span> <span class="variable">client</span>.<span class="property">crm</span>.<span class="function">addLead</span>(<span class="variable">lead</span>)' },
  { text: '  <span class="keyword">await</span> <span class="variable">client</span>.<span class="property">whatsapp</span>.<span class="function">sendTemplate</span>(<span class="string">"welcome"</span>, <span class="variable">lead</span>)' },
  { text: '  <span class="variable">client</span>.<span class="property">analytics</span>.<span class="function">track</span>(<span class="string">"conversion"</span>, { <span class="property">source</span>: <span class="variable">lead</span>.<span class="property">origin</span> })' },
  { text: '})' },
  { text: '' },
  { text: '<span class="type">console</span>.<span class="function">log</span>(<span class="string">"\u2713 Sistema Expon ativo. Crescimento em andamento."</span>)' },
];

const codeContainer = document.getElementById('ide-code-content');
const gutterContainer = document.getElementById('ide-gutter');
let currentLine = 0;

function typeNextLine() {
  if (currentLine >= codeLines.length) {
    codeContainer.innerHTML += '<span class="ide-cursor"></span>';
    return;
  }
  const line = codeLines[currentLine];
  const lineEl = document.createElement('div');
  lineEl.innerHTML = line.text || '&nbsp;';
  lineEl.style.opacity = '0';
  lineEl.style.transform = 'translateX(-5px)';
  codeContainer.appendChild(lineEl);

  const gutterLine = document.createElement('div');
  gutterLine.textContent = currentLine + 1;
  gutterContainer.appendChild(gutterLine);

  requestAnimationFrame(() => {
    lineEl.style.transition = 'all 0.3s ease';
    lineEl.style.opacity = '1';
    lineEl.style.transform = 'translateX(0)';
  });

  currentLine++;
  const delay = line.text === '' ? 80 : Math.random() * 60 + 40;
  setTimeout(typeNextLine, delay);
}

// Start typing when IDE section is visible
const ideSection = document.querySelector('.ide-section');
let ideStarted = false;
const ideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !ideStarted) {
      ideStarted = true;
      setTimeout(typeNextLine, 500);
      ideObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
if (ideSection) ideObserver.observe(ideSection);

// ═══ COUNTER ANIMATION ═══
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = prefix + Math.round(current) + suffix;
    }, 20);
  });
}

const statsSection = document.querySelector('.stats-bar');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// ═══ METRIC BARS ANIMATION ═══
const metricBars = document.querySelectorAll('.metric-fill');
const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
metricBars.forEach(bar => metricsObserver.observe(bar));

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
    }
  });
});
