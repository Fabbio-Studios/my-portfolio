const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const grid = document.querySelector('#grid');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 50;
});

function animateGrid() {
  currentX += (mouseX - currentX) * 0.05;
  currentY += (mouseY - currentY) * 0.05;

  if (grid) {
    grid.style.setProperty('--mouseX', `${currentX}px`);
    grid.style.setProperty('--mouseY', `${currentY}px`);
  }

  requestAnimationFrame(animateGrid);
}

animateGrid();

menuIcon.onclick = () => {
  navLinks.classList.toggle('active');
}