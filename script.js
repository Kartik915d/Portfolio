document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME TOGGLE ================= */
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  if (toggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") body.classList.add("light");

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

  /* ================= MOBILE MENU ================= */
  const menuBtn = document.getElementById("menuToggle");
  const navContent = document.getElementById("navContent");

  if (menuBtn && navContent) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navContent.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navContent.classList.remove("active");
      });
    });
  }

  /* ================= MEMORY LANE — SCROLL LINE + SPY ================= */
  /*
    Two things happen here:
    1. The ::after pseudo-element on .memorylane-entries grows its
       height from 0% → 100% as you scroll through the section.
       This creates the "line drawing itself down" effect.
    2. Each entry's dot gets .ml-active when it enters the viewport,
       making it glow. The left year nav also highlights accordingly.
  */

  const entriesContainer = document.querySelector(".memorylane-entries");
  const mlEntries        = document.querySelectorAll(".ml-entry");
  const mlYearLinks      = document.querySelectorAll(".ml-year-link");

  if (entriesContainer && mlEntries.length > 0) {

    /* ---- 1. SCROLL-DRIVEN LINE ---- */
    function updateLine() {
      const rect        = entriesContainer.getBoundingClientRect();
      const windowH     = window.innerHeight;
      const totalHeight = entriesContainer.offsetHeight;

      // How far the top of the section has traveled past the top of viewport
      const scrolled = Math.max(0, windowH * 0.4 - rect.top);
      const progress = Math.min(1, scrolled / totalHeight);
      const pct      = (progress * 100).toFixed(2);

      // Drive the CSS ::after height via a custom property
      entriesContainer.style.setProperty("--line-progress", pct + "%");
    }

    // We can't directly set ::after height via JS, so use a CSS variable.
    // The ::after in CSS will read --line-progress.
    window.addEventListener("scroll", updateLine, { passive: true });
    updateLine(); // run once on load

    /* ---- 2. DOT GLOW + YEAR NAV SCROLL SPY ---- */
    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Glow this entry's dot
            mlEntries.forEach(e => e.classList.remove("ml-active"));
            entry.target.classList.add("ml-active");

            // Highlight matching year in nav
            const id = entry.target.id;
            mlYearLinks.forEach(link => {
              link.classList.toggle("active", link.dataset.target === id);
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
      }
    );

    mlEntries.forEach(entry => dotObserver.observe(entry));

    /* ---- 3. CLICK YEAR → SMOOTH SCROLL ---- */
    mlYearLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
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


/* ================= LEGACY ROLE TABS (SAFE TO KEEP) ================= */
function showRole(event, org, role) {
  const card = document.getElementById(`${org}-card`);
  if (!card) return;

  const durations = {
    'chair': '2025 – Present',
    'vice': '2024 – 2025',
    'publicity': '2023 – 2024',
    'media': '2023 – 2024',
    'member': '2022 – 2023'
  };

  const tabs = card.querySelectorAll('.role-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const lists = card.querySelectorAll('.experience-details');
  lists.forEach(list => list.style.display = 'none');

  const targetList = document.getElementById(`${org}-${role}-content`);
  const durationLabel = document.getElementById(`${org}-duration`);

  if (targetList) targetList.style.display = 'block';
  if (durationLabel && durations[role]) {
    durationLabel.innerText = durations[role];
  }
}