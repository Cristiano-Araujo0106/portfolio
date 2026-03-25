const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const navLinks = document.querySelectorAll(".nav-link");
const reveals = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section");
const backToTop = document.getElementById("backToTop");
const year = document.getElementById("year");
const typingText = document.getElementById("typing-text");

/* =========================
   ANO AUTOMÁTICO NO FOOTER
========================= */
year.textContent = new Date().getFullYear();

/* =========================
   MENU MOBILE
========================= */
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");

  const expanded = menu.classList.contains("active");
  menuToggle.setAttribute("aria-expanded", expanded);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================
   HEADER AO ROLAR
========================= */
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

/* =========================
   REVEAL AO ROLAR
========================= */
function revealOnScroll() {
  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

/* =========================
   MENU ATIVO POR SEÇÃO
========================= */
function updateActiveMenu() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */
function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================
   EFEITO DIGITANDO
========================= */
const phrases = [
  "Desenvolvedor Web em formação",
  "Criando sites modernos e responsivos",
  "Evoluindo com HTML, CSS e JavaScript"
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.substring(0, letterIndex);

  typingText.textContent = currentText;

  if (!isDeleting) {
    letterIndex++;

    if (letterIndex > currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    letterIndex--;

    if (letterIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      letterIndex = 0;
    }
  }

  setTimeout(typeEffect, isDeleting ? 40 : 75);
}

/* =========================
   EVENTOS GERAIS
========================= */
window.addEventListener("scroll", () => {
  handleHeaderScroll();
  revealOnScroll();
  updateActiveMenu();
  handleBackToTop();
});

window.addEventListener("load", () => {
  handleHeaderScroll();
  revealOnScroll();
  updateActiveMenu();
  handleBackToTop();
  typeEffect();
});
