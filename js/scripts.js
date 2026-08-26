const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const grid = document.querySelector('#grid');

const browserLanguage = (navigator.language || navigator.languages?.[0] || 'pt-BR').toLowerCase();
const shouldUseEnglish = browserLanguage.startsWith('en');
const isPortugueseBrazil = !shouldUseEnglish;

const translations = {
  'nav-about': { en: 'About', pt: 'Sobre' },
  'nav-experience': { en: 'Experience', pt: 'Experiência' },
  'nav-projects': { en: 'Projects', pt: 'Projetos' },
  'github-btn': { en: 'Visit GitHub', pt: 'Visitar GitHub' },
  'about-hi': { en: "Hi, I'm", pt: 'Olá, eu sou' },
  'role': { en: 'Front-End Developer', pt: 'Desenvolvedor Front-End' },
  'cv-btn': { en: 'Download CV', pt: 'Baixar CV' },
  'contact-btn': { en: 'Contact', pt: 'Contato' },
  'exp-web': { en: 'Web Development', pt: 'Desenvolvimento Web' },
  'exp-graphic': { en: 'Graphic Design', pt: 'Design Gráfico' },
  'exp-uiux': { en: 'UI/UX Design', pt: 'UI/UX Design' },
  'exp-social': { en: 'Social Media Manager', pt: 'Gestão de Mídias Sociais' },
  'projects-title': { en: 'Recent Projects', pt: 'Projetos Recentes' },
  'footer-about': { en: 'About', pt: 'Sobre' },
  'footer-experience': { en: 'Experience', pt: 'Experiência' },
  'footer-projects': { en: 'Projects', pt: 'Projetos' },
  'footer-copy': { en: '© All rights reserved | Fábio Gutemberg', pt: '© Todos os direitos reservados | Fábio Gutemberg' }
};

function applyLanguage() {
  const lang = shouldUseEnglish ? 'en-US' : 'pt-BR';
  document.documentElement.lang = lang;

  Object.entries(translations).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = shouldUseEnglish ? value.en : value.pt;
    }
  });

  document.title = shouldUseEnglish
    ? 'Fábio Gutemberg | Front-end Dev'
    : 'Fábio Gutemberg | Desenvolvedor Front-end';
}

applyLanguage();

const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchOrMobile = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 820px)').matches;

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

if (!isReducedMotion && !isTouchOrMobile && grid) {
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 50;
  });

  function animateGrid() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    grid.style.setProperty('--mouseX', `${currentX}px`);
    grid.style.setProperty('--mouseY', `${currentY}px`);

    requestAnimationFrame(animateGrid);
  }

  animateGrid();
}

menuIcon.onclick = () => {
  navLinks.classList.toggle('active');
  // toggle open class for animation and swap icon between bars and x
  if (menuIcon.classList.contains('open')) {
    menuIcon.classList.remove('open');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  } else {
    menuIcon.classList.add('open');
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
  }
}

// Theme toggle: persist in localStorage and respect prefers-color-scheme
const themeToggle = document.getElementById('theme-toggle');
const rootEl = document.documentElement;

function applyTheme(isDark) {
  if (isDark) {
    rootEl.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    rootEl.classList.remove('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
}

// initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme === 'dark');
} else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = rootEl.classList.contains('dark-mode');
    applyTheme(!isDark);
  });
}