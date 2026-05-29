const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const grid = document.querySelector('#grid');

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
}