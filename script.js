document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME TOGGLE ================= */
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  if (toggle) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      body.classList.add("light");
    }

    toggle.addEventListener("click", () => {
      body.classList.toggle("light");

      const isLight = body.classList.contains("light");
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
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
          setTimeout(() => (isDeleting = true), 1200);
        }
      } else {
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


/* ================= PROJECT SCROLL ================= */
function scrollProjects(direction) {
  const container = document.getElementById("projectsScroll");

  if (!container) return;

  container.scrollBy({
    left: direction * 320,
    behavior: "smooth"
  });
}
function showRole(event, org, role) {
    // 1. Get the specific card being interacted with
    const card = document.getElementById(`${org}-card`);
    
    // 2. Map of roles to their durations
    const durations = {
        'chair': '2025 – Present',
        'vice': '2024 – 2025',
        'publicity': '2023 – 2024',
        'media': '2023 – 2024',
        'member': '2022 – 2023'
    };

    // 3. Deactivate all tabs IN THIS CARD ONLY
    const tabs = card.querySelectorAll('.role-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // 4. Activate the clicked tab
    event.currentTarget.classList.add('active');

    // 5. Hide all description lists IN THIS CARD ONLY
    const lists = card.querySelectorAll('.experience-details');
    lists.forEach(list => {
        list.style.display = 'none';
    });

    // 6. Show the selected list and update duration
    const targetList = document.getElementById(`${org}-${role}-content`);
    const durationLabel = document.getElementById(`${org}-duration`);
    
    if (targetList) targetList.style.display = 'block';
    if (durationLabel && durations[role]) {
        durationLabel.innerText = durations[role];
    }
}
const menuBtn = document.getElementById('menuToggle');
const navContent = document.getElementById('navContent');

if (menuBtn && navContent) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navContent.classList.toggle('active');
  });

  // Close when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navContent.classList.remove('active');
    });
  });
}