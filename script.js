document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME TOGGLE ================= */
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  if (toggle) {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      body.classList.add("light");
      toggle.textContent = "🌞";
    } else {
      toggle.textContent = "🌙";
    }

    // Toggle theme
    toggle.addEventListener("click", () => {
      body.classList.toggle("light");

      const isLight = body.classList.contains("light");
      toggle.textContent = isLight ? "🌞" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  /* ================= NAVBAR SCROLL ================= */
  const nav = document.querySelector(".navbar");

  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  /* ================= TYPING EFFECT ================= */
  const words = [
  "Backend Developer",
  "Python Engineer",
  "GenAI Enthusiast",
  "Problem Solver"
];

const typingEl = document.getElementById("typing");

if (typingEl) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => (isDeleting = true), 1200); // pause after typing
      }
    } else {
      // Deleting
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 90);
  }

  typeEffect();
}


  /* ================= HERO PARALLAX ================= */
  const heroVisual = document.querySelector(".hero-visual");
  const heroImg = document.querySelector(".hero-img");

  if (heroVisual && heroImg) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroImg.style.transform = `
        translate(${x * 14}px, ${y * 14}px)
        translateY(-10px)
        scale(1.03)
      `;
    });

    heroVisual.addEventListener("mouseleave", () => {
      heroImg.style.transform = "translateY(0) scale(1)";
    });
  }

});

function scrollProjects(direction) {
  const container = document.getElementById("projectsContainer");
  const scrollAmount = 320;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}


