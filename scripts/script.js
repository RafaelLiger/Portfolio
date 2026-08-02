const botao = document.getElementById('botao-tema');
const body = document.body;
const themeIcon = botao.querySelector('i');

const savedTheme = localStorage.getItem('tema');
aplicarTema(savedTheme === 'escuro');

function aplicarTema(isEscuro) {
  body.classList.toggle('escuro', isEscuro);
  themeIcon.className = isEscuro ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
}

botao.addEventListener('click', () => {
  const isEscuro = body.classList.toggle('escuro');
  aplicarTema(isEscuro);
  localStorage.setItem('tema', isEscuro ? 'escuro' : 'claro');
});

const navLinks = document.querySelectorAll('#menu .link');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) {
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 16;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

const phrases = ['Data Analyst', 'Power BI Developer', 'Business Intelligence', 'SQL Analyst'];
const typingLine = document.getElementById('typing-line');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function digitar() {
  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    typingLine.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(digitar, 1400);
      return;
    }
  } else {
    typingLine.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(digitar, deleting ? 60 : 100);
}

digitar();

if (window.AOS) {
  AOS.init({
    duration: 700,
    once: true,
    offset: 70
  });
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16
});

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});